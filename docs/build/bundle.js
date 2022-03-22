var app=function(){"use strict";function e(){}const a=e=>e;function n(e){return e()}function t(){return Object.create(null)}function o(e){e.forEach(n)}function i(e){return"function"==typeof e}function s(e,a){return e!=e?a==a:e!==a||e&&"object"==typeof e||"function"==typeof e}function r(a,...n){if(null==a)return e;const t=a.subscribe(...n);return t.unsubscribe?()=>t.unsubscribe():t}function c(e){let a;return r(e,(e=>a=e))(),a}function l(e,a,n){e.$$.on_destroy.push(r(a,n))}function u(e,a,n=a){return e.set(n),a}const d="undefined"!=typeof window;let m=d?()=>window.performance.now():()=>Date.now(),p=d?e=>requestAnimationFrame(e):e;const f=new Set;function b(e){f.forEach((a=>{a.c(e)||(f.delete(a),a.f())})),0!==f.size&&p(b)}function g(e){let a;return 0===f.size&&p(b),{promise:new Promise((n=>{f.add(a={c:e,f:n})})),abort(){f.delete(a)}}}function v(e,a){e.appendChild(a)}function h(e,a,n){e.insertBefore(a,n||null)}function y(e){e.parentNode.removeChild(e)}function q(e,a){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(a)}function $(e){return document.createElement(e)}function P(e){return document.createTextNode(e)}function _(){return P(" ")}function j(){return P("")}function x(e,a,n,t){return e.addEventListener(a,n,t),()=>e.removeEventListener(a,n,t)}function w(e){return function(a){return a.preventDefault(),e.call(this,a)}}function E(e,a,n){null==n?e.removeAttribute(a):e.getAttribute(a)!==n&&e.setAttribute(a,n)}function k(e){return""===e?null:+e}function z(e,a){a=""+a,e.wholeText!==a&&(e.data=a)}function C(e,a){e.value=null==a?"":a}function A(e,a,n,t){e.style.setProperty(a,n,t?"important":"")}const S=new Set;let M,L=0;function R(e,a,n,t,o,i,s,r=0){const c=16.666/t;let l="{\n";for(let e=0;e<=1;e+=c){const t=a+(n-a)*i(e);l+=100*e+`%{${s(t,1-t)}}\n`}const u=l+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(e){let a=5381,n=e.length;for(;n--;)a=(a<<5)-a^e.charCodeAt(n);return a>>>0}(u)}_${r}`,m=e.ownerDocument;S.add(m);const p=m.__svelte_stylesheet||(m.__svelte_stylesheet=m.head.appendChild($("style")).sheet),f=m.__svelte_rules||(m.__svelte_rules={});f[d]||(f[d]=!0,p.insertRule(`@keyframes ${d} ${u}`,p.cssRules.length));const b=e.style.animation||"";return e.style.animation=`${b?b+", ":""}${d} ${t}ms linear ${o}ms 1 both`,L+=1,d}function V(e,a){const n=(e.style.animation||"").split(", "),t=n.filter(a?e=>e.indexOf(a)<0:e=>-1===e.indexOf("__svelte")),o=n.length-t.length;o&&(e.style.animation=t.join(", "),L-=o,L||p((()=>{L||(S.forEach((e=>{const a=e.__svelte_stylesheet;let n=a.cssRules.length;for(;n--;)a.deleteRule(n);e.__svelte_rules={}})),S.clear())})))}function O(e){M=e}function D(e){(function(){if(!M)throw new Error("Function called outside component initialization");return M})().$$.on_mount.push(e)}const F=[],T=[],N=[],U=[],B=Promise.resolve();let I=!1;function H(e){N.push(e)}let X=!1;const Z=new Set;function G(){if(!X){X=!0;do{for(let e=0;e<F.length;e+=1){const a=F[e];O(a),J(a.$$)}for(O(null),F.length=0;T.length;)T.pop()();for(let e=0;e<N.length;e+=1){const a=N[e];Z.has(a)||(Z.add(a),a())}N.length=0}while(F.length);for(;U.length;)U.pop()();I=!1,X=!1,Z.clear()}}function J(e){if(null!==e.fragment){e.update(),o(e.before_update);const a=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,a),e.after_update.forEach(H)}}let K;function Q(){return K||(K=Promise.resolve(),K.then((()=>{K=null}))),K}function W(e,a,n){e.dispatchEvent(function(e,a){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,a),n}(`${a?"intro":"outro"}${n}`))}const Y=new Set;let ee;function ae(){ee={r:0,c:[],p:ee}}function ne(){ee.r||o(ee.c),ee=ee.p}function te(e,a){e&&e.i&&(Y.delete(e),e.i(a))}function oe(e,a,n,t){if(e&&e.o){if(Y.has(e))return;Y.add(e),ee.c.push((()=>{Y.delete(e),t&&(n&&e.d(1),t())})),e.o(a)}}const ie={duration:0};function se(n,t,o){let s,r,c=t(n,o),l=!1,u=0;function d(){s&&V(n,s)}function p(){const{delay:t=0,duration:o=300,easing:i=a,tick:p=e,css:f}=c||ie;f&&(s=R(n,0,1,o,t,i,f,u++)),p(0,1);const b=m()+t,v=b+o;r&&r.abort(),l=!0,H((()=>W(n,!0,"start"))),r=g((e=>{if(l){if(e>=v)return p(1,0),W(n,!0,"end"),d(),l=!1;if(e>=b){const a=i((e-b)/o);p(a,1-a)}}return l}))}let f=!1;return{start(){f||(V(n),i(c)?(c=c(),Q().then(p)):p())},invalidate(){f=!1},end(){l&&(d(),l=!1)}}}function re(n,t,s){let r,c=t(n,s),l=!0;const u=ee;function d(){const{delay:t=0,duration:i=300,easing:s=a,tick:d=e,css:p}=c||ie;p&&(r=R(n,1,0,i,t,s,p));const f=m()+t,b=f+i;H((()=>W(n,!1,"start"))),g((e=>{if(l){if(e>=b)return d(0,1),W(n,!1,"end"),--u.r||o(u.c),!1;if(e>=f){const a=s((e-f)/i);d(1-a,a)}}return l}))}return u.r+=1,i(c)?Q().then((()=>{c=c(),d()})):d(),{end(e){e&&c.tick&&c.tick(1,0),l&&(r&&V(n,r),l=!1)}}}function ce(e){e&&e.c()}function le(e,a,t){const{fragment:s,on_mount:r,on_destroy:c,after_update:l}=e.$$;s&&s.m(a,t),H((()=>{const a=r.map(n).filter(i);c?c.push(...a):o(a),e.$$.on_mount=[]})),l.forEach(H)}function ue(e,a){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(a),n.on_destroy=n.fragment=null,n.ctx=[])}function de(e,a){-1===e.$$.dirty[0]&&(F.push(e),I||(I=!0,B.then(G)),e.$$.dirty.fill(0)),e.$$.dirty[a/31|0]|=1<<a%31}function me(a,n,i,s,r,c,l=[-1]){const u=M;O(a);const d=n.props||{},m=a.$$={fragment:null,ctx:null,props:c,update:e,not_equal:r,bound:t(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:t(),dirty:l,skip_bound:!1};let p=!1;if(m.ctx=i?i(a,d,((e,n,...t)=>{const o=t.length?t[0]:n;return m.ctx&&r(m.ctx[e],m.ctx[e]=o)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](o),p&&de(a,e)),n})):[],m.update(),p=!0,o(m.before_update),m.fragment=!!s&&s(m.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);m.fragment&&m.fragment.l(e),e.forEach(y)}else m.fragment&&m.fragment.c();n.intro&&te(a.$$.fragment),le(a,n.target,n.anchor),G()}O(u)}class pe{$destroy(){ue(this,1),this.$destroy=e}$on(e,a){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(a),()=>{const e=n.indexOf(a);-1!==e&&n.splice(e,1)}}$set(e){var a;this.$$set&&(a=e,0!==Object.keys(a).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const fe=[];function be(e,a){return{subscribe:ge(e,a).subscribe}}function ge(a,n=e){let t;const o=[];function i(e){if(s(a,e)&&(a=e,t)){const e=!fe.length;for(let e=0;e<o.length;e+=1){const n=o[e];n[1](),fe.push(n,a)}if(e){for(let e=0;e<fe.length;e+=2)fe[e][0](fe[e+1]);fe.length=0}}}return{set:i,update:function(e){i(e(a))},subscribe:function(s,r=e){const c=[s,r];return o.push(c),1===o.length&&(t=n(i)||e),s(a),()=>{const e=o.indexOf(c);-1!==e&&o.splice(e,1),0===o.length&&(t(),t=null)}}}}function ve(a,n,t){const s=!Array.isArray(a),c=s?[a]:a,l=n.length<2;return be(t,(a=>{let t=!1;const u=[];let d=0,m=e;const p=()=>{if(d)return;m();const t=n(s?u[0]:u,a);l?a(t):m=i(t)?t:e},f=c.map(((e,a)=>r(e,(e=>{u[a]=e,d&=~(1<<a),t&&p()}),(()=>{d|=1<<a}))));return t=!0,p(),function(){o(f),m()}}))}const he=e=>Math.floor(Math.random()*e),ye=e=>{if("boolean"==typeof e){if(!0===e)return"True";if(!1===e)return"False"}return e},qe=e=>e>=90?"#008568":e>=80?"#0074C8":e>=70?"#d17216":"#d11616",$e=(e,a)=>{let n=((e,a)=>{let n=[];for(;n.length<e;){let e=he(a);n.includes(e)||n.push(e)}return n})(a,e.length),t=[];return n.forEach((a=>{let n={};n.question=e[a].q,n.followup=e[a].followup;let o=[...e[a].a];n.correctAnswer=e[a].a[0],n.answers=(e=>{for(let a=e.length-1;a>0;a--){let n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e})(o),t.push(n)})),t},Pe="Tema 8: La Política de Comunicación",_e=[{q:"El plan de comunicación es la materialización de la variable del marketing comunicación y",a:["Las otras dos son verdaderas","Determina los objetivos de comunicación de la empresa, selecciona el público objetivo, establece las acciones que se llevarán a cabo y las herramientas que se utilizarán","Define un calendario o cronograma, presupuesta cada una de las acciones y las herramientas necesarias y controla y hace un seguimiento del plan de comunicación"]},{q:"El mix de comunicación esta formado por",a:["Publicidad, Relaciones públicas, Promoción de ventas, Venta personal y Marketing directo","Publicidad, Propaganda y Fidelización","Emisor, Receptor, mensaje, canal y código"]},{q:"Herramienta impersonal de comunicación que utiliza medios masivos para hacer llegar los mensajes a un conjunto numeroso de personas con el fin de influir en la compra o la aceptación del producto",a:["Publicidad","Relaciones públicas","Promoción de ventas","Venta personal","Marketing directo"]},{q:"Acciones comunicativas destinadas a crear una imagen positiva de la empresa o de sus productos",a:["Relaciones públicas","Publicidad","Promoción de ventas","Venta personal","Marketing directo"]},{q:"Incentivos materiales o económicos que emplea la empresa para estimular la compra a corto plazo.",a:["Promoción de ventas","Relaciones públicas","Publicidad","Venta personal","Marketing directo"]},{q:"Labor llevada a cabo por el personal de ventas para informar o persuadir a la clientela con el fin de que adquiera un determinado producto. Es un método directo de comunicación, permite asesoramiento, orientación y resolución de dudas",a:["Venta personal","Promoción de ventas","Relaciones públicas","Publicidad","Marketing directo"]},{q:"Forma de comunicación interactiva mediante uno o más medios de comunicación masivos en la que se busca la respuesta inmediata del cliente potencial.",a:["Marketing directo","Venta personal","Promoción de ventas","Relaciones públicas","Publicidad"]},{q:"Las empresa deben utilizar las diferentes herramientas del marketing de manera aislada ya que si se utilizan de manera combinada el resultado puede no ser el óptimo",a:["Falso","Verdadero"]},{q:"Cuando decimos que la publicidad es una herramienta de comunicación unilateral nos referimos a que",a:["El mensaje sale únicamente del anunciante sin permitir la respuesta del público","Se dirige a un conjunto global de individuos anónimos","Se destina a un público muy amplio a través de medios de comunicación masivos"]},{q:"Cuando decimos que la publicidad es una herramienta de comunicación impersonal nos referimos a que",a:["Se dirige a un conjunto global de individuos anónimos","El mensaje sale únicamente del anunciante sin permitir la respuesta del público","Se destina a un público muy amplio a través de medios de comunicación masivos; no obstante, el grupo al que se dirige reune unas características concretas con las que identificar el producto"]},{q:"Cuando decimos que la publicidad es una herramienta de comunicación masiva nos referimos a que",a:["Se destina a un público muy amplio a través de medios de comunicación masivos","Se dirige a un conjunto global de individuos anónimos","El mensaje sale únicamente del anunciante sin permitir la respuesta del público"]},{q:"Una publicidad blanda",a:["Se centra más en generar el recuerdo de la marca. Dedica poco tiempo a destacar las bondades del producto o la propuesta de venta","El mensaje dominante se centra en fomentar la compra del producto, destacando sus características y sus beneficios. Se usa un imperativo de compra (Compre ahora)"]},{q:"Una publicidad dura",a:["El mensaje dominante se centra en fomentar la compra del producto, destacando sus características y sus beneficios. Se usa un imperativo de compra (Compre ahora)","Se centra más en generar el recuerdo de la marca. Dedica poco tiempo a destacar las bondades del producto o la propuesta de venta"]},{q:"En un mensaje publicitario se destaca el eslogan, que es",a:["una frase corta que resume la intención del anuncio y que busca captar la atención y generar recuerdo","el instrumento físico a través del cual fluye el mensaje","la interpretación que hace el receptor de los símbolos que usa el emisor en la codificación"]},{q:"Un mensaje publicitario, para que sea efectivo",a:["debe convencer al público objetivo","debe ser igual que el de la competencia","debe ser farragoso y difícil de entender "]},{q:"Marca la afirmación incorrecta",a:["La publicidad en televisión y la publicidad en una página de internet son soportes de alcance masivo","La publicidad en televisión tiene un elevado coste","La publicidad en internet es de bajo coste","La publicidad en televisión e internet combinan imagen, sonido y movimiento"]},{q:"La publicidad en vallas, mobiliario urbano, marquesinas de autobuses, transporte público y lonas publicitarias son",a:["Publicidad exterior","Publicidad en el lugar de venta","Prensa"]},{q:"Soportes como expositores, carteles, magafonía y proyecciones audiovisuales pertenecen a",a:["Publicidad en el lugar de venta","Prensa","Publicidad exterior"]},{q:"El único formato de publicidad en televisión es el anuncio televisivo",a:["Falso. También existe la telepromoción o el publirreportaje","Verdadero. La telepromoción y el publirreportaje no se considera anuncio televisivo"]},{q:"Una campaña publicitaria es",a:["el conjunto de acciones que lleva a cabo una empresa para alcanzar los objetivos publicitarios establecidos","el anuncio publicitario, es decir, el mensaje","un anuncio televisivo"]},{q:"En una campaña publicitaria, la determinación de los objetivos",a:["establece qué se pretende conseguir","trata de elegir el público objetivo","establece la idea básica que va a guiar la campaña"]},{q:"La estrategia creativa es ",a:["la fase de la campaña publicitaria que esboza la idea básica del mensaje publicitario. Su finalidad es captar la atención del público objetivo y transmitir una imagen positiva","la selección de medios, los soportes y los formatos más adecuados para alcanzar los objetivos de la campaña. Se concreta en un documento llamado plan de medios."]},{q:"La estrategia de medios es ",a:["la selección de medios, los soportes y los formatos más adecuados para alcanzar los objetivos de la campaña. Se concreta en un documento llamado plan de medios.","la fase de la campaña publicitaria que esboza la idea básica del mensaje publicitario. Su finalidad es captar la atención del público objetivo y transmitir una imagen positiva"]},{q:"De la estrategia creativa se encarga",a:["las agencias de publicidad","las centrales de medios","las empresas anunciadoras"]},{q:"Compran lotes de espacios publicitarios en los medios y los revenden a las agencias de publicidad o directamente a los anunciantes",a:["Centrales de medios","Empresas anunciadoras","Agencias de publicidad"]},{q:"Orientan sobre la estrategia de medios (medios, soportes y formatos más adecuados)",a:["Centrales de medios","Empresas anunciadoras","Agencias de publicidad"]},{q:"En la fase de fijación del presupuesto, los recursos financieros que hay que invertir en publicidad se determinan mediante el método -todo lo que se pueda-",a:["Falso. Existen otros métodos","Verdadero. Es el único método que asegura el éxito de la campaña publicitaria"]},{q:"En cuanto al control de la campaña publicitaria, el pretest",a:["es un estudio de mercado, realizado antes de lanzar la campaña. Consiste en mostrar a un conjunto de individuos la campaña elaborada y comprobar que se entiende el mensaje y que no genera reacciones negativas","es un estudio de mercado, realizado durante o a la finalización de la campaña. Trata de averiguar cuántas personas han estado en contacto con la campaña y cómo ser ha interpretado el mensaje"]},{q:"En cuanto al control de la campaña publicitaria, el pretest",a:["es un estudio de mercado, realizado durante o a la finalización de la campaña. Trata de averiguar cuántas personas han estado en contacto con la campaña y cómo ser ha interpretado el mensaje","es un estudio de mercado, realizado antes de lanzar la campaña. Consiste en mostrar a un conjunto de individuos la campaña elaborada y comprobar que se entiende el mensaje y que no genera reacciones negativas"]},{q:"El briefing es el documento que ",a:["la empresa anunciante facilita a la agencia de publicidad y que contiene los objetivos de la campaña publicitaria e información sobre la empresa, el producto y el público objetivo","la agencia de publicidad facilita a la empresa anunciante y que contiene los objetivos de la campaña publicitaria e información sobre la empresa, el producto y el público objetivo","la empresa anunciante facilita a la central de medios y que contiene los objetivos de la campaña publicitaria e información sobre la empresa, el producto y el público objetivo"]},{q:"Publicidad que trata de actuar sobre el destinatario sin que este sea consciente, utilizando técnicas de estímulos que el público percibe sin darse cuenta",a:["Publicidad subliminal","Publicidad engañosa","Publicidad desleal"]},{q:"Publicidad que incluye información falsa o que puede conducir a error a sus destinatarios y ocasionarles un perjuicio económico",a:["Publicidad engañosa","Publicidad subliminal","Publicidad desleal"]},{q:"Publicidad que perjudica a otras empresas, principalmemte competidoras",a:["Publicidad desleal","Publicidad subliminal","Publicidad engañosa"]},{q:"Las herramientas de relaciones públicas no son",a:["Banners","Patrocinios y mecenazgos","Acontecimientos o eventos","Noticias","Publicaciones"]},{q:"Persiguen la credibilidad y la confianza del público objetivo y crear una actitud positiva hacia la empresa y sus productos",a:["Relaciones Públicas","Promoción de ventas","Venta personal","Marketing directo"]},{q:"Contempla un conjunto de actividades de corta duración destinadas a estimular la compra de un producto mediante incentivos económicos o materiales",a:["Promoción de ventas","Relaciones Públicas","Venta personal","Marketing directo"]},{q:"Es una forma de comunicación oral, cara a cara e interactiva que se basa en el desarrollo de relaciones con la clientela y permite recibir su respuesta inmediatamente",a:["Venta personal","Relaciones Públicas","Promoción de ventas","Marketing directo"]},{q:"Es un conjunto de técnicas que requiere información detallada de los clientes para ofrecer a cada cual aquello que le interesa ",a:["Marketing directo","Relaciones Públicas","Promoción de ventas","Venta personal"]},{q:"Los descuentos en el precio, el 2X1 y muestras gratuitas son herramientas propias de",a:["Promoción de ventas","Publicidad","Relaciones Públicas","Marketing directo"]},{q:"El apoyo económico de marcas como Adidas o Nike a los equipos de futbol es",a:["Patrocinio y publicidad","Patrocinio y promoción de ventas","Patrocinio y marketing directo"]},{q:"Regalar unos vales de 5 € para la próxima compra en Zalando es",a:["Promoción de ventas","Publicidad","Marketing directo"]},{q:"Las llamadas que recibimos de las compañías eléctricas para cambiar de comercializadora es",a:["Marketing directo","Publicidad","Promoción de ventas"]}],je=be(_e.length),xe=ge(10),we=ge(!1),Ee=ge(0),ke=ge(!1),ze=be(_e),Ce=be(Pe),Ae=ve(we,((e,a)=>{e&&a($e(c(ze),c(xe)))}),[]),Se=ge(0),Me=ve([Se,Ae],(([e,a])=>((e,a)=>{let n=0;return"number"==typeof e&&"number"==typeof a&&(n=Math.round(e/a*100)),n})(e,a.length)),0),Le=ge([]),Re=()=>{Se.set(0),we.set(!1),Ee.set(0),ke.set(!1),Le.set([])};function Ve(e){const a=e-1;return a*a*a+1}function Oe(e,{delay:a=0,duration:n=400,easing:t=Ve,x:o=0,y:i=0,opacity:s=0}){const r=getComputedStyle(e),c=+r.opacity,l="none"===r.transform?"":r.transform,u=c*(1-s);return{delay:a,duration:n,easing:t,css:(e,a)=>`\n\t\t\ttransform: ${l} translate(${(1-e)*o}px, ${(1-e)*i}px);\n\t\t\topacity: ${c-u*a}`}}function De(e,a,n){const t=e.slice();return t[10]=a[n],t[12]=n,t}function Fe(e,a,n){const t=e.slice();return t[7]=a[n],t[9]=n,t}function Te(e){let a,n,t,o,i,s,r,c,l,u,d,m,p=e[7].question+"",f=e[7].answers,b=[];for(let a=0;a<f.length;a+=1)b[a]=Ne(De(e,f,a));function g(e,a){return e[2]<e[1].length-1?Be:Ue}let j=g(e),k=j(e);return{c(){a=$("form"),n=$("fieldset"),t=$("legend"),o=P(p),i=_();for(let e=0;e<b.length;e+=1)b[e].c();s=_(),k.c(),r=_(),E(t,"class","svelte-ous5hl"),E(n,"class","svelte-ous5hl")},m(c,l){h(c,a,l),v(a,n),v(n,t),v(t,o),v(n,i);for(let e=0;e<b.length;e+=1)b[e].m(n,null);v(a,s),k.m(a,null),v(a,r),u=!0,d||(m=x(a,"submit",w(e[3])),d=!0)},p(e,t){if((!u||2&t)&&p!==(p=e[7].question+"")&&z(o,p),3&t){let a;for(f=e[7].answers,a=0;a<f.length;a+=1){const o=De(e,f,a);b[a]?b[a].p(o,t):(b[a]=Ne(o),b[a].c(),b[a].m(n,null))}for(;a<b.length;a+=1)b[a].d(1);b.length=f.length}j!==(j=g(e))&&(k.d(1),k=j(e),k&&(k.c(),k.m(a,r)))},i(e){u||(H((()=>{l&&l.end(1),c||(c=se(a,Oe,{x:200,duration:500,delay:500})),c.start()})),u=!0)},o(e){c&&c.invalidate(),l=re(a,Oe,{x:-200,duration:500}),u=!1},d(e){e&&y(a),q(b,e),k.d(),e&&l&&l.end(),d=!1,m()}}}function Ne(e){let a,n,t,o,i,s,r,c,l,u,d,m,p,f=ye(e[10])+"";return{c(){a=$("label"),n=$("input"),s=_(),r=P(f),c=_(),l=$("span"),u=_(),n.required=!0,E(n,"type","radio"),E(n,"id",t="answer"+e[12]),n.__value=o=e[10],n.value=n.__value,E(n,"name",i="question"+e[9]),E(n,"class","svelte-ous5hl"),e[5][0].push(n),E(l,"class","radio svelte-ous5hl"),E(a,"for",d="answer"+e[12]),E(a,"class","svelte-ous5hl")},m(t,o){h(t,a,o),v(a,n),n.checked=n.__value===e[0],v(a,s),v(a,r),v(a,c),v(a,l),v(a,u),m||(p=x(n,"change",e[4]),m=!0)},p(e,a){2&a&&o!==(o=e[10])&&(n.__value=o,n.value=n.__value),1&a&&(n.checked=n.__value===e[0]),2&a&&f!==(f=ye(e[10])+"")&&z(r,f)},d(t){t&&y(a),e[5][0].splice(e[5][0].indexOf(n),1),m=!1,p()}}}function Ue(e){let a;return{c(){a=$("button"),a.textContent="Ok",E(a,"type","submit")},m(e,n){h(e,a,n)},d(e){e&&y(a)}}}function Be(e){let a;return{c(){a=$("button"),a.textContent="Siguiente",E(a,"type","submit")},m(e,n){h(e,a,n)},d(e){e&&y(a)}}}function Ie(e){let a,n,t=e[2]===e[9]&&Te(e);return{c(){t&&t.c(),a=j()},m(e,o){t&&t.m(e,o),h(e,a,o),n=!0},p(e,n){e[2]===e[9]?t?(t.p(e,n),4&n&&te(t,1)):(t=Te(e),t.c(),te(t,1),t.m(a.parentNode,a)):t&&(ae(),oe(t,1,1,(()=>{t=null})),ne())},i(e){n||(te(t),n=!0)},o(e){oe(t),n=!1},d(e){t&&t.d(e),e&&y(a)}}}function He(e){let a,n,t=e[1],o=[];for(let a=0;a<t.length;a+=1)o[a]=Ie(Fe(e,t,a));const i=e=>oe(o[e],1,1,(()=>{o[e]=null}));return{c(){for(let e=0;e<o.length;e+=1)o[e].c();a=j()},m(e,t){for(let a=0;a<o.length;a+=1)o[a].m(e,t);h(e,a,t),n=!0},p(e,[n]){if(15&n){let s;for(t=e[1],s=0;s<t.length;s+=1){const i=Fe(e,t,s);o[s]?(o[s].p(i,n),te(o[s],1)):(o[s]=Ie(i),o[s].c(),te(o[s],1),o[s].m(a.parentNode,a))}for(ae(),s=t.length;s<o.length;s+=1)i(s);ne()}},i(e){if(!n){for(let e=0;e<t.length;e+=1)te(o[e]);n=!0}},o(e){o=o.filter(Boolean);for(let e=0;e<o.length;e+=1)oe(o[e]);n=!1},d(e){q(o,e),e&&y(a)}}}function Xe(e,a,n){let t,o,i,s;l(e,Ae,(e=>n(1,t=e))),l(e,Ee,(e=>n(2,o=e))),l(e,Le,(e=>n(6,i=e)));return[s,t,o,()=>{t[o].correctAnswer===s?(Se.update((e=>e+1)),u(Le,i=[...i,{correct:!0,chosenAnswer:s}],i)):u(Le,i=[...i,{correct:!1,chosenAnswer:s}],i),n(0,s=""),o<t.length-1?Ee.update((e=>e+1)):(we.set(!1),ke.set(!0))},function(){s=this.__value,n(0,s)},[[]]]}class Ze extends pe{constructor(e){super(),me(this,e,Xe,He,s,{})}}function Ge(e){let a,n,t,i,s,r,c,l,u,d,m,p,f,b,g;return{c(){a=$("div"),n=$("h1"),t=P(e[0]),i=_(),s=$("form"),r=$("label"),c=P("Elige el número de preguntas\n            "),l=$("input"),u=_(),d=$("button"),d.textContent="Listo!",E(n,"class","svelte-1n5xzdl"),E(l,"type","number"),E(l,"max",e[1]),E(l,"min","1"),l.required=!0,E(l,"class","svelte-1n5xzdl"),E(r,"class","svelte-1n5xzdl"),E(d,"type","submit")},m(o,m){h(o,a,m),v(a,n),v(n,t),v(a,i),v(a,s),v(s,r),v(r,c),v(r,l),C(l,e[2]),v(s,u),v(s,d),f=!0,b||(g=[x(l,"input",e[4]),x(s,"submit",w(e[3]))],b=!0)},p(e,[a]){(!f||1&a)&&z(t,e[0]),(!f||2&a)&&E(l,"max",e[1]),4&a&&k(l.value)!==e[2]&&C(l,e[2])},i(e){f||(H((()=>{p&&p.end(1),m||(m=se(a,Oe,{x:200,duration:500,delay:500})),m.start()})),f=!0)},o(e){m&&m.invalidate(),p=re(a,Oe,{x:-200,duration:500}),f=!1},d(e){e&&y(a),e&&p&&p.end(),b=!1,o(g)}}}function Je(e,a,n){let t,o,i;l(e,Ce,(e=>n(0,t=e))),l(e,je,(e=>n(1,o=e))),l(e,xe,(e=>n(2,i=e)));return[t,o,i,()=>{we.set(!0)},function(){i=k(this.value),xe.set(i)}]}class Ke extends pe{constructor(e){super(),me(this,e,Je,Ge,s,{})}}function Qe(e,a,n){const t=e.slice();return t[4]=a[n],t[6]=n,t}function We(e){let a,n=e[2],t=[];for(let a=0;a<n.length;a+=1)t[a]=ta(Qe(e,n,a));return{c(){a=$("ul");for(let e=0;e<t.length;e+=1)t[e].c();E(a,"class","svelte-1beyh99")},m(e,n){h(e,a,n);for(let e=0;e<t.length;e+=1)t[e].m(a,null)},p(e,o){if(6&o){let i;for(n=e[2],i=0;i<n.length;i+=1){const s=Qe(e,n,i);t[i]?t[i].p(s,o):(t[i]=ta(s),t[i].c(),t[i].m(a,null))}for(;i<t.length;i+=1)t[i].d(1);t.length=n.length}},d(e){e&&y(a),q(t,e)}}}function Ye(e){let a;return{c(){a=$("span"),a.textContent="0",E(a,"class","icon wrong svelte-1beyh99")},m(e,n){h(e,a,n)},d(e){e&&y(a)}}}function ea(e){let a;return{c(){a=$("span"),a.textContent="+1",E(a,"class","icon correct svelte-1beyh99")},m(e,n){h(e,a,n)},d(e){e&&y(a)}}}function aa(e){let a,n,t,o=ye(e[1][e[6]].chosenAnswer)+"";return{c(){a=$("p"),n=P("Tu respuesta:\n                "),t=P(o),E(a,"class","svelte-1beyh99")},m(e,o){h(e,a,o),v(a,n),v(a,t)},p(e,a){2&a&&o!==(o=ye(e[1][e[6]].chosenAnswer)+"")&&z(t,o)},d(e){e&&y(a)}}}function na(e){let a,n,t=e[4].followup+"";return{c(){a=$("p"),n=P(t),E(a,"class","followup svelte-1beyh99")},m(e,t){h(e,a,t),v(a,n)},p(e,a){4&a&&t!==(t=e[4].followup+"")&&z(n,t)},d(e){e&&y(a)}}}function ta(e){let a,n,t,o,i,s,r,c,l,u,d,m,p=e[4].question+"",f=ye(e[4].correctAnswer)+"";function b(e,a){return e[1][e[6]].correct?ea:Ye}let g=b(e),q=g(e),j=!e[1][e[6]].correct&&aa(e),x=e[4].followup&&na(e);return{c(){a=$("li"),n=$("div"),q.c(),t=_(),o=$("div"),i=$("p"),s=P(p),r=_(),c=$("p"),l=P(f),u=_(),j&&j.c(),d=_(),x&&x.c(),m=_(),E(n,"class","svelte-1beyh99"),E(i,"class","svelte-1beyh99"),E(c,"class","svelte-1beyh99"),E(o,"class","svelte-1beyh99"),E(a,"class","svelte-1beyh99")},m(e,p){h(e,a,p),v(a,n),q.m(n,null),v(a,t),v(a,o),v(o,i),v(i,s),v(o,r),v(o,c),v(c,l),v(o,u),j&&j.m(o,null),v(o,d),x&&x.m(o,null),v(a,m)},p(e,a){g!==(g=b(e))&&(q.d(1),q=g(e),q&&(q.c(),q.m(n,null))),4&a&&p!==(p=e[4].question+"")&&z(s,p),4&a&&f!==(f=ye(e[4].correctAnswer)+"")&&z(l,f),e[1][e[6]].correct?j&&(j.d(1),j=null):j?j.p(e,a):(j=aa(e),j.c(),j.m(o,d)),e[4].followup?x?x.p(e,a):(x=na(e),x.c(),x.m(o,null)):x&&(x.d(1),x=null)},d(e){e&&y(a),q.d(),j&&j.d(),x&&x.d()}}}function oa(e){let a,n,t,o,i,s,r,c,l,u,d,m,p,f,b,g,q,j,w,k=null!=e[1]&&0!=e[1].length&&We(e);return{c(){a=$("div"),n=$("h1"),n.textContent="Resultados",t=_(),o=$("div"),i=$("p"),s=P("Puntuación : "),r=P(e[0]),c=P("%"),l=_(),u=$("div"),d=$("div"),m=_(),k&&k.c(),p=_(),f=$("button"),f.textContent="Intenta de nuevo",E(n,"class","svelte-1beyh99"),E(i,"class","final-score svelte-1beyh99"),E(d,"class","score-bar svelte-1beyh99"),A(d,"width",e[0]+"%"),A(d,"background",qe(e[0])),E(u,"class","score-scale svelte-1beyh99"),E(f,"type","button")},m(e,b){h(e,a,b),v(a,n),v(a,t),v(a,o),v(o,i),v(i,s),v(i,r),v(i,c),v(o,l),v(o,u),v(u,d),v(a,m),k&&k.m(a,null),v(a,p),v(a,f),q=!0,j||(w=x(f,"click",Re),j=!0)},p(e,[n]){(!q||1&n)&&z(r,e[0]),(!q||1&n)&&A(d,"width",e[0]+"%"),(!q||1&n)&&A(d,"background",qe(e[0])),null!=e[1]&&0!=e[1].length?k?k.p(e,n):(k=We(e),k.c(),k.m(a,p)):k&&(k.d(1),k=null)},i(e){q||(H((()=>{g&&g.end(1),b||(b=se(a,Oe,{y:200,duration:500,delay:500})),b.start()})),q=!0)},o(e){b&&b.invalidate(),g=re(a,Oe,{y:-200,duration:500}),q=!1},d(e){e&&y(a),k&&k.d(),e&&g&&g.end(),j=!1,w()}}}function ia(e,a,n){let t,o,i;l(e,Me,(e=>n(3,t=e))),l(e,Le,(e=>n(1,o=e))),l(e,Ae,(e=>n(2,i=e)));let s=0;return D((async()=>{n(0,s=t)})),[s,o,i]}class sa extends pe{constructor(e){super(),me(this,e,ia,oa,s,{})}}function ra(e){let a,n;return a=new Ke({}),{c(){ce(a.$$.fragment)},m(e,t){le(a,e,t),n=!0},i(e){n||(te(a.$$.fragment,e),n=!0)},o(e){oe(a.$$.fragment,e),n=!1},d(e){ue(a,e)}}}function ca(e){let a,n;return a=new sa({}),{c(){ce(a.$$.fragment)},m(e,t){le(a,e,t),n=!0},i(e){n||(te(a.$$.fragment,e),n=!0)},o(e){oe(a.$$.fragment,e),n=!1},d(e){ue(a,e)}}}function la(e){let a,n;return a=new Ze({}),{c(){ce(a.$$.fragment)},m(e,t){le(a,e,t),n=!0},i(e){n||(te(a.$$.fragment,e),n=!0)},o(e){oe(a.$$.fragment,e),n=!1},d(e){ue(a,e)}}}function ua(e){let a,n,t,o;const i=[la,ca,ra],s=[];function r(e,a){return e[0]?0:e[1]?1:2}return n=r(e),t=s[n]=i[n](e),{c(){a=$("main"),t.c(),E(a,"class","svelte-yxrnxi")},m(e,t){h(e,a,t),s[n].m(a,null),o=!0},p(e,[o]){let c=n;n=r(e),n!==c&&(ae(),oe(s[c],1,1,(()=>{s[c]=null})),ne(),t=s[n],t||(t=s[n]=i[n](e),t.c()),te(t,1),t.m(a,null))},i(e){o||(te(t),o=!0)},o(e){oe(t),o=!1},d(e){e&&y(a),s[n].d()}}}function da(e,a,n){let t,o;return l(e,we,(e=>n(0,t=e))),l(e,ke,(e=>n(1,o=e))),[t,o]}return new class extends pe{constructor(e){super(),me(this,e,da,ua,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
