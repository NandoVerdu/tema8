
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.29.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const getRandomNumber = (max) => {
      return Math.floor(Math.random() * max);
    };

    const getArrayOfRandomNumbers = (desiredLength, max) => {
      let array = [];
      while (array.length < desiredLength) {
        let randomNumber = getRandomNumber(max);
        if (!array.includes(randomNumber)) {
          array.push(randomNumber);
        }
      }
      return array;
    };

    //Source: https://javascript.info/task/shuffle
    const shuffleAnswers = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    };

    const getDisplayValue = (value) => {
      if (typeof value === "boolean") {
        if (value === true) {
          return "True";
        } else if (value === false) {
          return "False";
        }
      }

      return value;
    };

    const getPercentageColor = (value) => {
      if (value >= 90) {
        return "#008568";
      } else if (value >= 80) {
        return "#0074C8";
      } else if (value >= 70) {
        return "#d17216";
      } else {
        return "#d11616";
      }
    };

    const getPercentage = (score, max) => {
      let percentage = 0;
      if (typeof score === "number" && typeof max === "number") {
        percentage = Math.round((score / max) * 100);
      }
      return percentage;
    };

    const generateQuiz = (quizQuestions, desiredLength) => {
        let indexes = getArrayOfRandomNumbers(
          desiredLength,
          quizQuestions.length
        );
        let quiz = [];

        indexes.forEach((index) => {
          let question = {};
          question.question = quizQuestions[index].q;
          question.followup = quizQuestions[index].followup;
          let copiedAnswers = [...quizQuestions[index].a];
          question.correctAnswer = quizQuestions[index].a[0];
          question.answers = shuffleAnswers(copiedAnswers);

          quiz.push(question);
        });

        return quiz;
    };

    const trivia = {
      title: "Tema 8: La Política de Comunicación",
      questions:
      [ {
        q: "El plan de comunicación es la materialización de la variable del marketing comunicación y",
        a: ["Las otras dos son verdaderas",
            "Determina los objetivos de comunicación de la empresa, selecciona el público objetivo, establece las acciones que se llevarán a cabo y las herramientas que se utilizarán", 
            "Define un calendario o cronograma, presupuesta cada una de las acciones y las herramientas necesarias y controla y hace un seguimiento del plan de comunicación"
            
        ],
    },
    {
      q: "El mix de comunicación esta formado por",
      a: [
            "Publicidad, Relaciones públicas, Promoción de ventas, Venta personal y Marketing directo",
            "Publicidad, Propaganda y Fidelización",
            "Emisor, Receptor, mensaje, canal y código"
        ]
    },

    { 
        q: "Herramienta impersonal de comunicación que utiliza medios masivos para hacer llegar los mensajes a un conjunto numeroso de personas con el fin de influir en la compra o la aceptación del producto",
        a: [
            "Publicidad",
            "Relaciones públicas",
            "Promoción de ventas",
            "Venta personal",
            "Marketing directo"
        ]
    },
    {
        q: "Acciones comunicativas destinadas a crear una imagen positiva de la empresa o de sus productos",
        a: [
          "Relaciones públicas",
          "Publicidad",
          "Promoción de ventas",
          "Venta personal",
          "Marketing directo"
        ],
    },
    {    q: "Incentivos materiales o económicos que emplea la empresa para estimular la compra a corto plazo.",
        a: [   
          "Promoción de ventas",
          "Relaciones públicas",
          "Publicidad",
          "Venta personal",
          "Marketing directo"
         ],
    },
    { 
        q: "Labor llevada a cabo por el personal de ventas para informar o persuadir a la clientela con el fin de que adquiera un determinado producto. Es un método directo de comunicación, permite asesoramiento, orientación y resolución de dudas",
        a: [ 
          "Venta personal",
          "Promoción de ventas",
          "Relaciones públicas",
          "Publicidad",
          "Marketing directo"
         ],    
    },
    {   q: "Forma de comunicación interactiva mediante uno o más medios de comunicación masivos en la que se busca la respuesta inmediata del cliente potencial.",
        a:[  
          "Marketing directo",
          "Venta personal",
        "Promoción de ventas",
        "Relaciones públicas",
        "Publicidad"
        ], 
    },
    {   q: "Las empresa deben utilizar las diferentes herramientas del marketing de manera aislada ya que si se utilizan de manera combinada el resultado puede no ser el óptimo",
        a:[  "Falso" ,"Verdadero"],    
    }, 
    //3.La publicidad
    { 
        q: "Cuando decimos que la publicidad es una herramienta de comunicación unilateral nos referimos a que",
        a: ["El mensaje sale únicamente del anunciante sin permitir la respuesta del público",
        "Se dirige a un conjunto global de individuos anónimos",
        "Se destina a un público muy amplio a través de medios de comunicación masivos" ],
        },

    { 
        q: "Cuando decimos que la publicidad es una herramienta de comunicación impersonal nos referimos a que",
        a: ["Se dirige a un conjunto global de individuos anónimos",
             "El mensaje sale únicamente del anunciante sin permitir la respuesta del público",
            "Se destina a un público muy amplio a través de medios de comunicación masivos; no obstante, el grupo al que se dirige reune unas características concretas con las que identificar el producto"
        ],
    },
    {   q: "Cuando decimos que la publicidad es una herramienta de comunicación masiva nos referimos a que",
    a: [
      "Se destina a un público muy amplio a través de medios de comunicación masivos",
      "Se dirige a un conjunto global de individuos anónimos",
         "El mensaje sale únicamente del anunciante sin permitir la respuesta del público",    
    ],  
    }
    ,

    {   q: "Una publicidad blanda",
        a: ["Se centra más en generar el recuerdo de la marca. Dedica poco tiempo a destacar las bondades del producto o la propuesta de venta",
           "El mensaje dominante se centra en fomentar la compra del producto, destacando sus características y sus beneficios. Se usa un imperativo de compra (Compre ahora)"
        ],      
    },
    {    q: "Una publicidad dura",
        a: [
            "El mensaje dominante se centra en fomentar la compra del producto, destacando sus características y sus beneficios. Se usa un imperativo de compra (Compre ahora)",
           "Se centra más en generar el recuerdo de la marca. Dedica poco tiempo a destacar las bondades del producto o la propuesta de venta" ],
    },

    { 
        q: "En un mensaje publicitario se destaca el eslogan, que es",
        a: [
            "una frase corta que resume la intención del anuncio y que busca captar la atención y generar recuerdo",
           "el instrumento físico a través del cual fluye el mensaje",
              "la interpretación que hace el receptor de los símbolos que usa el emisor en la codificación"
        ],      
    },

    { 
      q: "Un mensaje publicitario, para que sea efectivo",
      a: ["debe convencer al público objetivo",
          "debe ser igual que el de la competencia",
          "debe ser farragoso y difícil de entender "
      ],   
    },
    {   q: "Marca la afirmación incorrecta",
      a: [  "La publicidad en televisión y la publicidad en una página de internet son soportes de alcance masivo",
        "La publicidad en televisión tiene un elevado coste",
             "La publicidad en internet es de bajo coste",
             "La publicidad en televisión e internet combinan imagen, sonido y movimiento"
      ],
     },

    {q: "La publicidad en vallas, mobiliario urbano, marquesinas de autobuses, transporte público y lonas publicitarias son",
    a: ["Publicidad exterior", "Publicidad en el lugar de venta, Prensa"],
    },

    {q: "Soportes como expositores, carteles, magafonía y proyecciones audiovisuales pertenecen a",
    a: ["Publicidad en el lugar de venta", "Prensa","Publicidad exterior"],
    },

    {q:"El único formato de publicidad en televisión es el anuncio televisivo", 
    a: ["Falso. También existe la telepromoción o el publirreportaje","Verdadero. La telepromoción y el publirreportaje no se considera anuncio televisivo"],  
    },

    {q: "Una campaña publicitaria es",
    a: ["el conjunto de acciones que lleva a cabo una empresa para alcanzar los objetivos publicitarios establecidos","el anuncio publicitario, es decir, el mensaje","un anuncio televisivo"],
    },

    {q:"En una campaña publicitaria, la determinación de los objetivos",
    a:["establece qué se pretende conseguir","trata de elegir el público objetivo","establece la idea básica que va a guiar la campaña"],},

    {q:"La estrategia creativa es ",
    a:["la fase de la campaña publicitaria que esboza la idea básica del mensaje publicitario. Su finalidad es captar la atención del público objetivo y transmitir una imagen positiva",
    "la selección de medios, los soportes y los formatos más adecuados para alcanzar los objetivos de la campaña. Se concreta en un documento llamado plan de medios."],},

    {q:"La estrategia de medios es ",
    a:[
      "la selección de medios, los soportes y los formatos más adecuados para alcanzar los objetivos de la campaña. Se concreta en un documento llamado plan de medios.",
      "la fase de la campaña publicitaria que esboza la idea básica del mensaje publicitario. Su finalidad es captar la atención del público objetivo y transmitir una imagen positiva",
    ],},

    {q: "De la estrategia creativa se encarga",
    a: ["las agencias de publicidad",    
      "las centrales de medios",
      "las empresas anunciadoras"],
    },

    { 
      q: "Compran lotes de espacios publicitarios en los medios y los revenden a las agencias de publicidad o directamente a los anunciantes",
      a: ["Centrales de medios","Empresas anunciadoras","Agencias de publicidad" ],   
    },
    {
      q: "Orientan sobre la estrategia de medios (medios, soportes y formatos más adecuados)",
      a:["Centrales de medios","Empresas anunciadoras", "Agencias de publicidad" ], 
    },
       

    { 
      q: "En la fase de fijación del presupuesto, los recursos financieros que hay que invertir en publicidad se determinan mediante el método -todo lo que se pueda-",
      a: [    "Falso. Existen otros métodos",
             "Verdadero. Es el único método que asegura el éxito de la campaña publicitaria"
               ],    
    }
    ,
    { 
      q: "En cuanto al control de la campaña publicitaria, el pretest",
      a: ["es un estudio de mercado, realizado antes de lanzar la campaña. Consiste en mostrar a un conjunto de individuos la campaña elaborada y comprobar que se entiende el mensaje y que no genera reacciones negativas",
         "es un estudio de mercado, realizado durante o a la finalización de la campaña. Trata de averiguar cuántas personas han estado en contacto con la campaña y cómo ser ha interpretado el mensaje"
        ],  
    },

    { 
      q: "En cuanto al control de la campaña publicitaria, el pretest",
      a: [
          "es un estudio de mercado, realizado durante o a la finalización de la campaña. Trata de averiguar cuántas personas han estado en contacto con la campaña y cómo ser ha interpretado el mensaje",
            "es un estudio de mercado, realizado antes de lanzar la campaña. Consiste en mostrar a un conjunto de individuos la campaña elaborada y comprobar que se entiende el mensaje y que no genera reacciones negativas"
          ], 
    },

        {
          q: "El briefing es el documento que ",
          a: ["la empresa anunciante facilita a la agencia de publicidad y que contiene los objetivos de la campaña publicitaria e información sobre la empresa, el producto y el público objetivo", 
          "la agencia de publicidad facilita a la empresa anunciante y que contiene los objetivos de la campaña publicitaria e información sobre la empresa, el producto y el público objetivo", 
          "la empresa anunciante facilita a la central de medios y que contiene los objetivos de la campaña publicitaria e información sobre la empresa, el producto y el público objetivo"
        ],
        },

        {
          q: "Publicidad que trata de actuar sobre el destinatario sin que este sea consciente, utilizando técnicas de estímulos que el público percibe sin darse cuenta",
          a: [
            "Publicidad subliminal",
            "Publicidad engañosa",
            "Publicidad desleal"],
        },
        {
          q: "Publicidad que incluye información falsa o que puede conducir a error a sus destinatarios y ocasionarles un perjuicio económico",
          a: ["Publicidad engañosa", 
            "Publicidad subliminal",
          "Publicidad desleal"],
          
        },
        {
          q: "Publicidad que perjudica a otras empresas, principalmemte competidoras",
          a: ["Publicidad desleal",
            "Publicidad subliminal",
          "Publicidad engañosa",
          ],
          
        },
        {
          q: "Las herramientas de relaciones públicas no son",
          a: ["Banners","Patrocinios y mecenazgos","Acontecimientos o eventos",  "Noticias", "Publicaciones"],
         
        },
      
        {
          q: "Persiguen la credibilidad y la confianza del público objetivo y crear una actitud positiva hacia la empresa y sus productos",
          a: [ "Relaciones Públicas",
          "Promoción de ventas",
          "Venta personal",
            "Marketing directo"],
        },
        {
          q: "Contempla un conjunto de actividades de corta duración destinadas a estimular la compra de un producto mediante incentivos económicos o materiales",
          a: [
            "Promoción de ventas",
            "Relaciones Públicas",
          "Venta personal",
            "Marketing directo"],
        },
        {
          q: "Es una forma de comunicación oral, cara a cara e interactiva que se basa en el desarrollo de relaciones con la clientela y permite recibir su respuesta inmediatamente",
          a: ["Venta personal", 
            "Relaciones Públicas",
          "Promoción de ventas",
            "Marketing directo"],
        
        },
        {q: "Es un conjunto de técnicas que requiere información detallada de los clientes para ofrecer a cada cual aquello que le interesa ",
         a: [
          "Marketing directo", 
          "Relaciones Públicas",
         "Promoción de ventas",
         "Venta personal",
           ],
      }
        ,
        {q: "Los descuentos en el precio, el 2X1 y muestras gratuitas son herramientas propias de",
         a: ["Promoción de ventas","Publicidad","Relaciones Públicas","Marketing directo"],},

         {q:"El apoyo económico de marcas como Adidas o Nike a los equipos de futbol es",
         a:["Patrocinio y publicidad","Patrocinio y promoción de ventas","Patrocinio y marketing directo"],},

         {q: "Regalar unos vales de 5 € para la próxima compra en Zalando es",
          a: ["Promoción de ventas","Publicidad","Marketing directo"],
        },

          {q: "Las llamadas que recibimos de las compañías eléctricas para cambiar de comercializadora es",
            a:["Marketing directo","Publicidad","Promoción de ventas"]}, 

      
     ]

    };

    // Settings
    const maxNumberOfQuestions = readable(trivia.questions.length);
    const numberOfQuestions = writable(10);

    // App State
    const hasQuizBegun = writable(false);
    const currentQuestionIndex = writable(0);
    const isQuizDone = writable(false);

    // Data
    const triviaQuestions = readable(trivia.questions);
    const quizTitle = readable(trivia.title);
    const quiz = derived(hasQuizBegun, ($hasQuizBegun, set) => {
        if ($hasQuizBegun) {
            set(generateQuiz(get_store_value(triviaQuestions), get_store_value(numberOfQuestions)));
        }
    }, []);
    const score = writable(0);
    const scorePercentage = derived([score, quiz], ([$score, $quiz]) => {
        return getPercentage($score, $quiz.length);
    }, 0);
    const detailedScore = writable([]);
    const reset = () => {
        score.set(0);
        hasQuizBegun.set(false);
        currentQuestionIndex.set(0);
        isQuizDone.set(false);
        detailedScore.set([]);
    };

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    /* src/components/Quiz.svelte generated by Svelte v3.29.0 */
    const file = "src/components/Quiz.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	child_ctx[12] = i;
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (143:4) {#if $currentQuestionIndex === questionIndex}
    function create_if_block(ctx) {
    	let form;
    	let fieldset;
    	let legend;
    	let t0_value = /*question*/ ctx[7].question + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let form_intro;
    	let form_outro;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*question*/ ctx[7].answers;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	function select_block_type(ctx, dirty) {
    		if (/*$currentQuestionIndex*/ ctx[2] < /*$quiz*/ ctx[1].length - 1) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			form = element("form");
    			fieldset = element("fieldset");
    			legend = element("legend");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			if_block.c();
    			t3 = space();
    			attr_dev(legend, "class", "svelte-ous5hl");
    			add_location(legend, file, 148, 16, 3446);
    			attr_dev(fieldset, "class", "svelte-ous5hl");
    			add_location(fieldset, file, 147, 12, 3419);
    			add_location(form, file, 143, 8, 3244);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, fieldset);
    			append_dev(fieldset, legend);
    			append_dev(legend, t0);
    			append_dev(fieldset, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(fieldset, null);
    			}

    			append_dev(form, t2);
    			if_block.m(form, null);
    			append_dev(form, t3);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", prevent_default(/*onSubmit*/ ctx[3]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$quiz*/ 2) && t0_value !== (t0_value = /*question*/ ctx[7].question + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*getDisplayValue, $quiz, selectedAnswer*/ 3) {
    				each_value_1 = /*question*/ ctx[7].answers;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(fieldset, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(form, t3);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (form_outro) form_outro.end(1);
    				if (!form_intro) form_intro = create_in_transition(form, fly, { x: 200, duration: 500, delay: 500 });
    				form_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (form_intro) form_intro.invalidate();
    			form_outro = create_out_transition(form, fly, { x: -200, duration: 500 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			destroy_each(each_blocks, detaching);
    			if_block.d();
    			if (detaching && form_outro) form_outro.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(143:4) {#if $currentQuestionIndex === questionIndex}",
    		ctx
    	});

    	return block;
    }

    // (150:16) {#each question.answers as answer, answerIndex}
    function create_each_block_1(ctx) {
    	let label;
    	let input;
    	let input_id_value;
    	let input_value_value;
    	let input_name_value;
    	let t0;
    	let t1_value = getDisplayValue(/*answer*/ ctx[10]) + "";
    	let t1;
    	let t2;
    	let span;
    	let t3;
    	let label_for_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			span = element("span");
    			t3 = space();
    			input.required = true;
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "id", input_id_value = "answer" + /*answerIndex*/ ctx[12]);
    			input.__value = input_value_value = /*answer*/ ctx[10];
    			input.value = input.__value;
    			attr_dev(input, "name", input_name_value = "question" + /*questionIndex*/ ctx[9]);
    			attr_dev(input, "class", "svelte-ous5hl");
    			/*$$binding_groups*/ ctx[5][0].push(input);
    			add_location(input, file, 151, 24, 3625);
    			attr_dev(span, "class", "radio svelte-ous5hl");
    			add_location(span, file, 159, 24, 3998);
    			attr_dev(label, "for", label_for_value = "answer" + /*answerIndex*/ ctx[12]);
    			attr_dev(label, "class", "svelte-ous5hl");
    			add_location(label, file, 150, 20, 3567);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*selectedAnswer*/ ctx[0];
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);
    			append_dev(label, span);
    			append_dev(label, t3);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$quiz*/ 2 && input_value_value !== (input_value_value = /*answer*/ ctx[10])) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*selectedAnswer*/ 1) {
    				input.checked = input.__value === /*selectedAnswer*/ ctx[0];
    			}

    			if (dirty & /*$quiz*/ 2 && t1_value !== (t1_value = getDisplayValue(/*answer*/ ctx[10]) + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[5][0].splice(/*$$binding_groups*/ ctx[5][0].indexOf(input), 1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(150:16) {#each question.answers as answer, answerIndex}",
    		ctx
    	});

    	return block;
    }

    // (167:12) {:else}
    function create_else_block(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Ok";
    			attr_dev(button, "type", "submit");
    			add_location(button, file, 167, 16, 4251);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(167:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (165:12) {#if $currentQuestionIndex < $quiz.length - 1}
    function create_if_block_1(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Siguiente";
    			attr_dev(button, "type", "submit");
    			add_location(button, file, 165, 16, 4174);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(165:12) {#if $currentQuestionIndex < $quiz.length - 1}",
    		ctx
    	});

    	return block;
    }

    // (142:0) {#each $quiz as question, questionIndex}
    function create_each_block(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$currentQuestionIndex*/ ctx[2] === /*questionIndex*/ ctx[9] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*$currentQuestionIndex*/ ctx[2] === /*questionIndex*/ ctx[9]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$currentQuestionIndex*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(142:0) {#each $quiz as question, questionIndex}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*$quiz*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*onSubmit, $currentQuestionIndex, $quiz, getDisplayValue, selectedAnswer*/ 15) {
    				each_value = /*$quiz*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $quiz;
    	let $currentQuestionIndex;
    	let $detailedScore;
    	validate_store(quiz, "quiz");
    	component_subscribe($$self, quiz, $$value => $$invalidate(1, $quiz = $$value));
    	validate_store(currentQuestionIndex, "currentQuestionIndex");
    	component_subscribe($$self, currentQuestionIndex, $$value => $$invalidate(2, $currentQuestionIndex = $$value));
    	validate_store(detailedScore, "detailedScore");
    	component_subscribe($$self, detailedScore, $$value => $$invalidate(6, $detailedScore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Quiz", slots, []);
    	let selectedAnswer;

    	const onSubmit = () => {
    		let correctAnswer = $quiz[$currentQuestionIndex].correctAnswer;

    		if (correctAnswer === selectedAnswer) {
    			score.update(score => score + 1);

    			set_store_value(
    				detailedScore,
    				$detailedScore = [
    					...$detailedScore,
    					{
    						correct: true,
    						chosenAnswer: selectedAnswer
    					}
    				],
    				$detailedScore
    			);
    		} else {
    			set_store_value(
    				detailedScore,
    				$detailedScore = [
    					...$detailedScore,
    					{
    						correct: false,
    						chosenAnswer: selectedAnswer
    					}
    				],
    				$detailedScore
    			);
    		}

    		$$invalidate(0, selectedAnswer = "");

    		if ($currentQuestionIndex < $quiz.length - 1) {
    			currentQuestionIndex.update(currentQuestionIndex => currentQuestionIndex + 1);
    		} else {
    			hasQuizBegun.set(false);
    			isQuizDone.set(true);
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Quiz> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		selectedAnswer = this.__value;
    		$$invalidate(0, selectedAnswer);
    	}

    	$$self.$capture_state = () => ({
    		quiz,
    		detailedScore,
    		currentQuestionIndex,
    		score,
    		isQuizDone,
    		hasQuizBegun,
    		getDisplayValue,
    		fly,
    		selectedAnswer,
    		onSubmit,
    		$quiz,
    		$currentQuestionIndex,
    		$detailedScore
    	});

    	$$self.$inject_state = $$props => {
    		if ("selectedAnswer" in $$props) $$invalidate(0, selectedAnswer = $$props.selectedAnswer);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		selectedAnswer,
    		$quiz,
    		$currentQuestionIndex,
    		onSubmit,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class Quiz extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Quiz",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/components/Setup.svelte generated by Svelte v3.29.0 */
    const file$1 = "src/components/Setup.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let h1;
    	let t0;
    	let t1;
    	let form;
    	let label;
    	let t2;
    	let input;
    	let t3;
    	let button;
    	let div_intro;
    	let div_outro;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			t0 = text(/*$quizTitle*/ ctx[0]);
    			t1 = space();
    			form = element("form");
    			label = element("label");
    			t2 = text("Elige el número de preguntas\n            ");
    			input = element("input");
    			t3 = space();
    			button = element("button");
    			button.textContent = "Listo!";
    			attr_dev(h1, "class", "svelte-1n5xzdl");
    			add_location(h1, file$1, 36, 4, 721);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "max", /*$maxNumberOfQuestions*/ ctx[1]);
    			attr_dev(input, "min", "1");
    			input.required = true;
    			attr_dev(input, "class", "svelte-1n5xzdl");
    			add_location(input, file$1, 40, 12, 859);
    			attr_dev(label, "class", "svelte-1n5xzdl");
    			add_location(label, file$1, 38, 8, 798);
    			attr_dev(button, "type", "submit");
    			add_location(button, file$1, 47, 8, 1065);
    			add_location(form, file$1, 37, 4, 747);
    			add_location(div, file$1, 33, 0, 619);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(h1, t0);
    			append_dev(div, t1);
    			append_dev(div, form);
    			append_dev(form, label);
    			append_dev(label, t2);
    			append_dev(label, input);
    			set_input_value(input, /*$numberOfQuestions*/ ctx[2]);
    			append_dev(form, t3);
    			append_dev(form, button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[4]),
    					listen_dev(form, "submit", prevent_default(/*onSubmit*/ ctx[3]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*$quizTitle*/ 1) set_data_dev(t0, /*$quizTitle*/ ctx[0]);

    			if (!current || dirty & /*$maxNumberOfQuestions*/ 2) {
    				attr_dev(input, "max", /*$maxNumberOfQuestions*/ ctx[1]);
    			}

    			if (dirty & /*$numberOfQuestions*/ 4 && to_number(input.value) !== /*$numberOfQuestions*/ ctx[2]) {
    				set_input_value(input, /*$numberOfQuestions*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				if (!div_intro) div_intro = create_in_transition(div, fly, { x: 200, duration: 500, delay: 500 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { x: -200, duration: 500 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_outro) div_outro.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $quizTitle;
    	let $maxNumberOfQuestions;
    	let $numberOfQuestions;
    	validate_store(quizTitle, "quizTitle");
    	component_subscribe($$self, quizTitle, $$value => $$invalidate(0, $quizTitle = $$value));
    	validate_store(maxNumberOfQuestions, "maxNumberOfQuestions");
    	component_subscribe($$self, maxNumberOfQuestions, $$value => $$invalidate(1, $maxNumberOfQuestions = $$value));
    	validate_store(numberOfQuestions, "numberOfQuestions");
    	component_subscribe($$self, numberOfQuestions, $$value => $$invalidate(2, $numberOfQuestions = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Setup", slots, []);

    	const onSubmit = () => {
    		hasQuizBegun.set(true);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Setup> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		$numberOfQuestions = to_number(this.value);
    		numberOfQuestions.set($numberOfQuestions);
    	}

    	$$self.$capture_state = () => ({
    		maxNumberOfQuestions,
    		numberOfQuestions,
    		hasQuizBegun,
    		quizTitle,
    		fly,
    		onSubmit,
    		$quizTitle,
    		$maxNumberOfQuestions,
    		$numberOfQuestions
    	});

    	return [
    		$quizTitle,
    		$maxNumberOfQuestions,
    		$numberOfQuestions,
    		onSubmit,
    		input_input_handler
    	];
    }

    class Setup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Setup",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/components/Results.svelte generated by Svelte v3.29.0 */
    const file$2 = "src/components/Results.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (110:2) {#if $detailedScore != undefined && $detailedScore.length != 0}
    function create_if_block$1(ctx) {
    	let ul;
    	let each_value = /*$quiz*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "svelte-1beyh99");
    			add_location(ul, file$2, 110, 4, 2056);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$quiz, getDisplayValue, $detailedScore*/ 6) {
    				each_value = /*$quiz*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(110:2) {#if $detailedScore != undefined && $detailedScore.length != 0}",
    		ctx
    	});

    	return block;
    }

    // (117:12) {:else}
    function create_else_block$1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "0";
    			attr_dev(span, "class", "icon wrong svelte-1beyh99");
    			add_location(span, file$2, 116, 19, 2247);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(117:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (115:12) {#if $detailedScore[index].correct}
    function create_if_block_3(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "+1";
    			attr_dev(span, "class", "icon correct svelte-1beyh99");
    			add_location(span, file$2, 115, 14, 2191);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(115:12) {#if $detailedScore[index].correct}",
    		ctx
    	});

    	return block;
    }

    // (122:12) {#if !$detailedScore[index].correct}
    function create_if_block_2(ctx) {
    	let p;
    	let t0;
    	let t1_value = getDisplayValue(/*$detailedScore*/ ctx[1][/*index*/ ctx[6]].chosenAnswer) + "";
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Tu respuesta:\n                ");
    			t1 = text(t1_value);
    			attr_dev(p, "class", "svelte-1beyh99");
    			add_location(p, file$2, 122, 14, 2482);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$detailedScore*/ 2 && t1_value !== (t1_value = getDisplayValue(/*$detailedScore*/ ctx[1][/*index*/ ctx[6]].chosenAnswer) + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(122:12) {#if !$detailedScore[index].correct}",
    		ctx
    	});

    	return block;
    }

    // (128:12) {#if question.followup}
    function create_if_block_1$1(ctx) {
    	let p;
    	let t_value = /*question*/ ctx[4].followup + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "followup svelte-1beyh99");
    			add_location(p, file$2, 128, 14, 2673);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$quiz*/ 4 && t_value !== (t_value = /*question*/ ctx[4].followup + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(128:12) {#if question.followup}",
    		ctx
    	});

    	return block;
    }

    // (112:6) {#each $quiz as question, index}
    function create_each_block$1(ctx) {
    	let li;
    	let div0;
    	let t0;
    	let div1;
    	let p0;
    	let t1_value = /*question*/ ctx[4].question + "";
    	let t1;
    	let t2;
    	let p1;
    	let t3_value = getDisplayValue(/*question*/ ctx[4].correctAnswer) + "";
    	let t3;
    	let t4;
    	let t5;
    	let t6;

    	function select_block_type(ctx, dirty) {
    		if (/*$detailedScore*/ ctx[1][/*index*/ ctx[6]].correct) return create_if_block_3;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = !/*$detailedScore*/ ctx[1][/*index*/ ctx[6]].correct && create_if_block_2(ctx);
    	let if_block2 = /*question*/ ctx[4].followup && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			div0 = element("div");
    			if_block0.c();
    			t0 = space();
    			div1 = element("div");
    			p0 = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			if (if_block1) if_block1.c();
    			t5 = space();
    			if (if_block2) if_block2.c();
    			t6 = space();
    			attr_dev(div0, "class", "svelte-1beyh99");
    			add_location(div0, file$2, 113, 10, 2123);
    			attr_dev(p0, "class", "svelte-1beyh99");
    			add_location(p0, file$2, 119, 12, 2331);
    			attr_dev(p1, "class", "svelte-1beyh99");
    			add_location(p1, file$2, 120, 12, 2370);
    			attr_dev(div1, "class", "svelte-1beyh99");
    			add_location(div1, file$2, 118, 10, 2313);
    			attr_dev(li, "class", "svelte-1beyh99");
    			add_location(li, file$2, 112, 8, 2108);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div0);
    			if_block0.m(div0, null);
    			append_dev(li, t0);
    			append_dev(li, div1);
    			append_dev(div1, p0);
    			append_dev(p0, t1);
    			append_dev(div1, t2);
    			append_dev(div1, p1);
    			append_dev(p1, t3);
    			append_dev(div1, t4);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div1, t5);
    			if (if_block2) if_block2.m(div1, null);
    			append_dev(li, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, null);
    				}
    			}

    			if (dirty & /*$quiz*/ 4 && t1_value !== (t1_value = /*question*/ ctx[4].question + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*$quiz*/ 4 && t3_value !== (t3_value = getDisplayValue(/*question*/ ctx[4].correctAnswer) + "")) set_data_dev(t3, t3_value);

    			if (!/*$detailedScore*/ ctx[1][/*index*/ ctx[6]].correct) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					if_block1.m(div1, t5);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*question*/ ctx[4].followup) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_1$1(ctx);
    					if_block2.c();
    					if_block2.m(div1, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(112:6) {#each $quiz as question, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div3;
    	let h1;
    	let t1;
    	let div2;
    	let p;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let div1;
    	let div0;
    	let t6;
    	let t7;
    	let button;
    	let div3_intro;
    	let div3_outro;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*$detailedScore*/ ctx[1] != undefined && /*$detailedScore*/ ctx[1].length != 0 && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Resultados";
    			t1 = space();
    			div2 = element("div");
    			p = element("p");
    			t2 = text("Puntuación : ");
    			t3 = text(/*percentage*/ ctx[0]);
    			t4 = text("%");
    			t5 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t6 = space();
    			if (if_block) if_block.c();
    			t7 = space();
    			button = element("button");
    			button.textContent = "Intenta de nuevo";
    			attr_dev(h1, "class", "svelte-1beyh99");
    			add_location(h1, file$2, 98, 2, 1727);
    			attr_dev(p, "class", "final-score svelte-1beyh99");
    			add_location(p, file$2, 101, 4, 1760);
    			attr_dev(div0, "class", "score-bar svelte-1beyh99");
    			set_style(div0, "width", /*percentage*/ ctx[0] + "%");
    			set_style(div0, "background", getPercentageColor(/*percentage*/ ctx[0]));
    			add_location(div0, file$2, 103, 6, 1850);
    			attr_dev(div1, "class", "score-scale svelte-1beyh99");
    			add_location(div1, file$2, 102, 4, 1818);
    			add_location(div2, file$2, 100, 2, 1750);
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 136, 2, 2801);
    			add_location(div3, file$2, 95, 0, 1631);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h1);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, p);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div3, t6);
    			if (if_block) if_block.m(div3, null);
    			append_dev(div3, t7);
    			append_dev(div3, button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", reset, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*percentage*/ 1) set_data_dev(t3, /*percentage*/ ctx[0]);

    			if (!current || dirty & /*percentage*/ 1) {
    				set_style(div0, "width", /*percentage*/ ctx[0] + "%");
    			}

    			if (!current || dirty & /*percentage*/ 1) {
    				set_style(div0, "background", getPercentageColor(/*percentage*/ ctx[0]));
    			}

    			if (/*$detailedScore*/ ctx[1] != undefined && /*$detailedScore*/ ctx[1].length != 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div3, t7);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div3_outro) div3_outro.end(1);
    				if (!div3_intro) div3_intro = create_in_transition(div3, fly, { y: 200, duration: 500, delay: 500 });
    				div3_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div3_intro) div3_intro.invalidate();
    			div3_outro = create_out_transition(div3, fly, { y: -200, duration: 500 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
    			if (detaching && div3_outro) div3_outro.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $scorePercentage;
    	let $detailedScore;
    	let $quiz;
    	validate_store(scorePercentage, "scorePercentage");
    	component_subscribe($$self, scorePercentage, $$value => $$invalidate(3, $scorePercentage = $$value));
    	validate_store(detailedScore, "detailedScore");
    	component_subscribe($$self, detailedScore, $$value => $$invalidate(1, $detailedScore = $$value));
    	validate_store(quiz, "quiz");
    	component_subscribe($$self, quiz, $$value => $$invalidate(2, $quiz = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Results", slots, []);
    	let percentage = 0;

    	onMount(async () => {
    		$$invalidate(0, percentage = $scorePercentage); // To give the live update CSS effect
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Results> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		quiz,
    		detailedScore,
    		reset,
    		scorePercentage,
    		getDisplayValue,
    		getPercentageColor,
    		fly,
    		onMount,
    		percentage,
    		$scorePercentage,
    		$detailedScore,
    		$quiz
    	});

    	$$self.$inject_state = $$props => {
    		if ("percentage" in $$props) $$invalidate(0, percentage = $$props.percentage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [percentage, $detailedScore, $quiz];
    }

    class Results extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Results",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.29.0 */
    const file$3 = "src/App.svelte";

    // (57:1) {:else}
    function create_else_block$2(ctx) {
    	let setup;
    	let current;
    	setup = new Setup({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(setup.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(setup, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setup, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(57:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (55:23) 
    function create_if_block_1$2(ctx) {
    	let results;
    	let current;
    	results = new Results({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(results.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(results, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(results.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(results.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(results, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(55:23) ",
    		ctx
    	});

    	return block;
    }

    // (53:1) {#if $hasQuizBegun}
    function create_if_block$2(ctx) {
    	let quiz;
    	let current;
    	quiz = new Quiz({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(quiz.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(quiz, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(quiz.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(quiz.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(quiz, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(53:1) {#if $hasQuizBegun}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let main;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$2, create_if_block_1$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$hasQuizBegun*/ ctx[0]) return 0;
    		if (/*$isQuizDone*/ ctx[1]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			if_block.c();
    			attr_dev(main, "class", "svelte-yxrnxi");
    			add_location(main, file$3, 51, 0, 1117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(main, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $hasQuizBegun;
    	let $isQuizDone;
    	validate_store(hasQuizBegun, "hasQuizBegun");
    	component_subscribe($$self, hasQuizBegun, $$value => $$invalidate(0, $hasQuizBegun = $$value));
    	validate_store(isQuizDone, "isQuizDone");
    	component_subscribe($$self, isQuizDone, $$value => $$invalidate(1, $isQuizDone = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Quiz,
    		Setup,
    		Results,
    		hasQuizBegun,
    		isQuizDone,
    		$hasQuizBegun,
    		$isQuizDone
    	});

    	return [$hasQuizBegun, $isQuizDone];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
