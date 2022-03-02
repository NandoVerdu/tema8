var app=function(){"use strict";function e(){}const t=e=>e;function n(e){return e()}function o(){return Object.create(null)}function a(e){e.forEach(n)}function r(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(t,...n){if(null==t)return e;const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function l(e){let t;return i(e,(e=>t=e))(),t}function u(e,t,n){e.$$.on_destroy.push(i(t,n))}function c(e,t,n=t){return e.set(n),t}const d="undefined"!=typeof window;let h=d?()=>window.performance.now():()=>Date.now(),f=d?e=>requestAnimationFrame(e):e;const m=new Set;function p(e){m.forEach((t=>{t.c(e)||(m.delete(t),t.f())})),0!==m.size&&f(p)}function g(e){let t;return 0===m.size&&f(p),{promise:new Promise((n=>{m.add(t={c:e,f:n})})),abort(){m.delete(t)}}}function y(e,t){e.appendChild(t)}function w(e,t,n){e.insertBefore(t,n||null)}function b(e){e.parentNode.removeChild(e)}function v(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function $(e){return document.createElement(e)}function M(e){return document.createTextNode(e)}function q(){return M(" ")}function k(){return M("")}function _(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function x(e){return function(t){return t.preventDefault(),e.call(this,t)}}function C(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function W(e){return""===e?null:+e}function A(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function R(e,t){e.value=null==t?"":t}function T(e,t,n,o){e.style.setProperty(t,n,o?"important":"")}const S=new Set;let H,E=0;function B(e,t,n,o,a,r,s,i=0){const l=16.666/o;let u="{\n";for(let e=0;e<=1;e+=l){const o=t+(n-t)*r(e);u+=100*e+`%{${s(o,1-o)}}\n`}const c=u+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(c)}_${i}`,h=e.ownerDocument;S.add(h);const f=h.__svelte_stylesheet||(h.__svelte_stylesheet=h.head.appendChild($("style")).sheet),m=h.__svelte_rules||(h.__svelte_rules={});m[d]||(m[d]=!0,f.insertRule(`@keyframes ${d} ${c}`,f.cssRules.length));const p=e.style.animation||"";return e.style.animation=`${p?p+", ":""}${d} ${o}ms linear ${a}ms 1 both`,E+=1,d}function I(e,t){const n=(e.style.animation||"").split(", "),o=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),a=n.length-o.length;a&&(e.style.animation=o.join(", "),E-=a,E||f((()=>{E||(S.forEach((e=>{const t=e.__svelte_stylesheet;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.__svelte_rules={}})),S.clear())})))}function P(e){H=e}function O(e){(function(){if(!H)throw new Error("Function called outside component initialization");return H})().$$.on_mount.push(e)}const L=[],J=[],D=[],F=[],N=Promise.resolve();let z=!1;function G(e){D.push(e)}let K=!1;const j=new Set;function V(){if(!K){K=!0;do{for(let e=0;e<L.length;e+=1){const t=L[e];P(t),Q(t.$$)}for(P(null),L.length=0;J.length;)J.pop()();for(let e=0;e<D.length;e+=1){const t=D[e];j.has(t)||(j.add(t),t())}D.length=0}while(L.length);for(;F.length;)F.pop()();z=!1,K=!1,j.clear()}}function Q(e){if(null!==e.fragment){e.update(),a(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(G)}}let Y;function Z(){return Y||(Y=Promise.resolve(),Y.then((()=>{Y=null}))),Y}function U(e,t,n){e.dispatchEvent(function(e,t){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,t),n}(`${t?"intro":"outro"}${n}`))}const X=new Set;let ee;function te(){ee={r:0,c:[],p:ee}}function ne(){ee.r||a(ee.c),ee=ee.p}function oe(e,t){e&&e.i&&(X.delete(e),e.i(t))}function ae(e,t,n,o){if(e&&e.o){if(X.has(e))return;X.add(e),ee.c.push((()=>{X.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}const re={duration:0};function se(n,o,a){let s,i,l=o(n,a),u=!1,c=0;function d(){s&&I(n,s)}function f(){const{delay:o=0,duration:a=300,easing:r=t,tick:f=e,css:m}=l||re;m&&(s=B(n,0,1,a,o,r,m,c++)),f(0,1);const p=h()+o,y=p+a;i&&i.abort(),u=!0,G((()=>U(n,!0,"start"))),i=g((e=>{if(u){if(e>=y)return f(1,0),U(n,!0,"end"),d(),u=!1;if(e>=p){const t=r((e-p)/a);f(t,1-t)}}return u}))}let m=!1;return{start(){m||(I(n),r(l)?(l=l(),Z().then(f)):f())},invalidate(){m=!1},end(){u&&(d(),u=!1)}}}function ie(n,o,s){let i,l=o(n,s),u=!0;const c=ee;function d(){const{delay:o=0,duration:r=300,easing:s=t,tick:d=e,css:f}=l||re;f&&(i=B(n,1,0,r,o,s,f));const m=h()+o,p=m+r;G((()=>U(n,!1,"start"))),g((e=>{if(u){if(e>=p)return d(0,1),U(n,!1,"end"),--c.r||a(c.c),!1;if(e>=m){const t=s((e-m)/r);d(1-t,t)}}return u}))}return c.r+=1,r(l)?Z().then((()=>{l=l(),d()})):d(),{end(e){e&&l.tick&&l.tick(1,0),u&&(i&&I(n,i),u=!1)}}}function le(e){e&&e.c()}function ue(e,t,o){const{fragment:s,on_mount:i,on_destroy:l,after_update:u}=e.$$;s&&s.m(t,o),G((()=>{const t=i.map(n).filter(r);l?l.push(...t):a(t),e.$$.on_mount=[]})),u.forEach(G)}function ce(e,t){const n=e.$$;null!==n.fragment&&(a(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function de(e,t){-1===e.$$.dirty[0]&&(L.push(e),z||(z=!0,N.then(V)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function he(t,n,r,s,i,l,u=[-1]){const c=H;P(t);const d=n.props||{},h=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:i,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:o(),dirty:u,skip_bound:!1};let f=!1;if(h.ctx=r?r(t,d,((e,n,...o)=>{const a=o.length?o[0]:n;return h.ctx&&i(h.ctx[e],h.ctx[e]=a)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](a),f&&de(t,e)),n})):[],h.update(),f=!0,a(h.before_update),h.fragment=!!s&&s(h.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);h.fragment&&h.fragment.l(e),e.forEach(b)}else h.fragment&&h.fragment.c();n.intro&&oe(t.$$.fragment),ue(t,n.target,n.anchor),V()}P(c)}class fe{$destroy(){ce(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const me=[];function pe(e,t){return{subscribe:ge(e,t).subscribe}}function ge(t,n=e){let o;const a=[];function r(e){if(s(t,e)&&(t=e,o)){const e=!me.length;for(let e=0;e<a.length;e+=1){const n=a[e];n[1](),me.push(n,t)}if(e){for(let e=0;e<me.length;e+=2)me[e][0](me[e+1]);me.length=0}}}return{set:r,update:function(e){r(e(t))},subscribe:function(s,i=e){const l=[s,i];return a.push(l),1===a.length&&(o=n(r)||e),s(t),()=>{const e=a.indexOf(l);-1!==e&&a.splice(e,1),0===a.length&&(o(),o=null)}}}}function ye(t,n,o){const s=!Array.isArray(t),l=s?[t]:t,u=n.length<2;return pe(o,(t=>{let o=!1;const c=[];let d=0,h=e;const f=()=>{if(d)return;h();const o=n(s?c[0]:c,t);u?t(o):h=r(o)?o:e},m=l.map(((e,t)=>i(e,(e=>{c[t]=e,d&=~(1<<t),o&&f()}),(()=>{d|=1<<t}))));return o=!0,f(),function(){a(m),h()}}))}const we=e=>Math.floor(Math.random()*e),be=e=>{if("boolean"==typeof e){if(!0===e)return"True";if(!1===e)return"False"}return e},ve=e=>e>=90?"#008568":e>=80?"#0074C8":e>=70?"#d17216":"#d11616",$e=(e,t)=>{let n=((e,t)=>{let n=[];for(;n.length<e;){let e=we(t);n.includes(e)||n.push(e)}return n})(t,e.length),o=[];return n.forEach((t=>{let n={};n.question=e[t].q,n.followup=e[t].followup;let a=[...e[t].a];n.correctAnswer=e[t].a[0],n.answers=(e=>{for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e})(a),o.push(n)})),o},Me="Tema 7: La distribución",qe=[{q:"What is Magnum's middle name?",a:["Sullivan","Thomas","Stone"]},{q:"What brand of car did Magnum usually drive?",a:["Ferrari","Aston Martin","Jaguar"],followup:"To be specific, it was a Ferrari 308 GTS."},{q:"What are the names of Higgins' dogs?",a:["Zeus and Apollo","Jupiter and Mars","Hercules and Achilles"]},{q:"How many seasons of Magnum P.I. are there?",a:[8,7,9],followup:"There were only 13 episodes in the 8th season."},{q:"In what year did Tom Selleck win an Emmy for Magnum?",a:["1984","1983","1985"],followup:"John Hillerman also won an Emmy years later for his portrayal of Higgins."},{q:"What was the name of TC's helicopter business?",a:["Island Hoppers","Hawaiian Touring","Island Tours"]},{q:"What does TC stand for?",a:["Theodore Calvin","Thomas Crane","Timothy Calvin"]},{q:"What is the nickname of Rick's crime boss father figure?",a:["Icepick","Iceman","Ibold"],followup:"His real name is Francis Hofstetler."},{q:"What was the name of Magnum's wife?",a:["Michelle","Marilyn","Maggie"]},{q:"What is the name of Magnum's daughter?",a:["Lily","Rose","April"],followup:"Magnum didn't know he had a daughter until she was five."},{q:"Which branch of the military did Magnum serve in?",a:["Navy","Army","Marines"]},{q:"What is Magnum's favorite baseball team?",a:["Detroit Tigers","New York Yankees","Boston Red Sox "]},{q:"Who's estate does Higgins manage?",a:["Robin Masters","Robert Ludlum","Robin MacDonald"]},{q:"What is the estate's nickname where Magnum lives?",a:["Robin's Nest","Paradise","Robin's Refuge"]},{q:'In the pilot episode, Rick owned a club called "Rick\'s Place".',a:[!0,!1],followup:"Rick's character was originally patterned after Humphrey Bogart's character in Casablanca."},{q:"What is Higgins' middle name?",a:["Quayle","Quigley","Jonathan"],followup:"His full name was Jonathan Quayle Higgins III."},{q:"Frank Sinatra guest-starred in Season 7.",a:[!0,!1]},{q:"Rick managed the King Kahakai club.",a:[!1,!0],followup:"Rick managed the King Kamehameha Club."},{q:"Magnum could be found drinking which beers?",a:["Old Dusseldorf and Coops","Coors and Old Style","Old Dusseldorf and Miller Genuine Draft"]},{q:"Which actor portrayed TC on the show?",a:["Roger E. Mosley","Larry Manetti","Roger Stone"]},{q:"Which actor portrayed Rick on the show?",a:["Larry Manetti","Roger E. Mosley","Jeff Mackay"]},{q:"Carol Burnett guest starred on the show twice.",a:[!0,!1],followup:"Carol Burnett appeared in Seasons 4 and 8."},{q:"Magnum P.I. aired on which network?",a:["CBS","NBC","ABC"]},{q:"What is Rick's given first name?",a:["Orville","Richard","Orson"]},{q:"Who primarily voiced Robin Masters in the show?",a:["Orson Welles","John Hillerman","Gregory Peck"]},{q:"Magnum appeared in an episode of 'Murder, She Wrote'.",a:[!0,!1],followup:"Angela Lansbury also appeared in an episode of Magnum P.I.."},{q:"What rank did Higgins earn in the British Army?",a:["Sergeant Major","Lieutenant","Corporal"]},{q:"Magnum served in which war?",a:["Vietnam","Korean War","Cold War"],followup:"Magnum P.I. was one of the first shows to include positive portrayals of Vietnam veterans."},{q:"Which assistant district attorney frequently worked with Magnum?",a:["Carol Baldwin","Maggie Poole","Luther Gillis"]},{q:"Which of the following are bartenders mentioned in the show?",a:["Moki and Keoki","Yoshi and Keoki","Mac and Buck"]},{q:"Tom Selleck appeared in all 162 episodes of Magnum",a:[!0,!1]},{q:"What movie did Tom Selleck famously turn down because of his Magnum contract?",a:["Indiana Jones","Blade Runner","The Shining"],followup:'This casting was spoofed in a Season 8 episode entitled, "Legend of the Lost Art".'},{q:"What brand of gun did Magnum carry?",a:["Colt","Smith and Wesson","Beretta"],followup:"Magnum carried a Colt 45 ACP."},{q:"What breed of dog were Higgins' dogs?",a:["Doberman","Rottweiler","Bulldog"]},{q:"What TV show reunited Tom Selleck, Larry Manetti, and Roger Mosley in the 2000s?",a:["Las Vegas","Friends","Jesse Stone"]},{q:"How many episodes did Robin Masters speak in?",a:[6,7,8]},{q:"What is the name of the pattern of the Hawaiian shirt made famous by Magnum?",a:["Jungle Bird","Aloha Jungle","Paradise Found"]},{q:"Which of these props was not donated to the Smithsonian?",a:["Ferrari license plate","Hawaiian shirt","Detroit Tigers hat "],followup:"An Hawaiian shirt, baseball cap, and the team ring were donated in 2002."},{q:"The team ring is what two colors?",a:["Gold and Black","Silver and Gold","Black and Silver "]},{q:"How many of Higgins' half-brothers were seen on the show?",a:[3,1,2],followup:"Each was played by John Hillerman."},{q:"What island is Robin Masters' estate located on?",a:["Oahu","Hawaii","Maui"]},{q:"Which of these recurring characters was seen in more episodes?",a:["Agatha Chumley","Lieutenant Tanaka","Doc Ibold"],followup:"Agatha Chumley can be seen in 32 episodes."},{q:"Which of these minor recurring characters was seen in more episodes?",a:["Icepick","Buck Greene","Maggie Poole"]},{q:"How many episodes does Magnum's mother appear in?",a:[5,4,3]},{q:"The series finale aired on what date?",a:["May 8, 1988","April 8, 1987","May 1, 1989"]},{q:"In what state was Magnum raised in?",a:["Virginia","Michigan","Ohio"]},{q:"What university did Magnum attend?",a:["Naval Academy","West Point","Air Force Academy"]},{q:"The events in the Ironman Triathlon that Magnum competed in are out of order.",a:[!0,!1],followup:"The correct order is Swim, Bike, and then Run."},{q:"What position did Magnum play on his college football team?",a:["Quarterback","Cornerback","Wide Receiver"]},{q:"Magnum appeared on the show without a mustache.",a:[!1,!0]}],ke=pe(qe.length),_e=ge(10),xe=ge(!1),Ce=ge(0),We=ge(!1),Ae=pe(qe),Re=pe(Me),Te=ye(xe,((e,t)=>{e&&t($e(l(Ae),l(_e)))}),[]),Se=ge(0),He=ye([Se,Te],(([e,t])=>((e,t)=>{let n=0;return"number"==typeof e&&"number"==typeof t&&(n=Math.round(e/t*100)),n})(e,t.length)),0),Ee=ge([]),Be=()=>{Se.set(0),xe.set(!1),Ce.set(0),We.set(!1),Ee.set([])};function Ie(e){const t=e-1;return t*t*t+1}function Pe(e,{delay:t=0,duration:n=400,easing:o=Ie,x:a=0,y:r=0,opacity:s=0}){const i=getComputedStyle(e),l=+i.opacity,u="none"===i.transform?"":i.transform,c=l*(1-s);return{delay:t,duration:n,easing:o,css:(e,t)=>`\n\t\t\ttransform: ${u} translate(${(1-e)*a}px, ${(1-e)*r}px);\n\t\t\topacity: ${l-c*t}`}}function Oe(e,t,n){const o=e.slice();return o[10]=t[n],o[12]=n,o}function Le(e,t,n){const o=e.slice();return o[7]=t[n],o[9]=n,o}function Je(e){let t,n,o,a,r,s,i,l,u,c,d,h,f=e[7].question+"",m=e[7].answers,p=[];for(let t=0;t<m.length;t+=1)p[t]=De(Oe(e,m,t));function g(e,t){return e[2]<e[1].length-1?Ne:Fe}let k=g(e),W=k(e);return{c(){t=$("form"),n=$("fieldset"),o=$("legend"),a=M(f),r=q();for(let e=0;e<p.length;e+=1)p[e].c();s=q(),W.c(),i=q(),C(o,"class","svelte-ous5hl"),C(n,"class","svelte-ous5hl")},m(l,u){w(l,t,u),y(t,n),y(n,o),y(o,a),y(n,r);for(let e=0;e<p.length;e+=1)p[e].m(n,null);y(t,s),W.m(t,null),y(t,i),c=!0,d||(h=_(t,"submit",x(e[3])),d=!0)},p(e,o){if((!c||2&o)&&f!==(f=e[7].question+"")&&A(a,f),3&o){let t;for(m=e[7].answers,t=0;t<m.length;t+=1){const a=Oe(e,m,t);p[t]?p[t].p(a,o):(p[t]=De(a),p[t].c(),p[t].m(n,null))}for(;t<p.length;t+=1)p[t].d(1);p.length=m.length}k!==(k=g(e))&&(W.d(1),W=k(e),W&&(W.c(),W.m(t,i)))},i(e){c||(G((()=>{u&&u.end(1),l||(l=se(t,Pe,{x:200,duration:500,delay:500})),l.start()})),c=!0)},o(e){l&&l.invalidate(),u=ie(t,Pe,{x:-200,duration:500}),c=!1},d(e){e&&b(t),v(p,e),W.d(),e&&u&&u.end(),d=!1,h()}}}function De(e){let t,n,o,a,r,s,i,l,u,c,d,h,f,m=be(e[10])+"";return{c(){t=$("label"),n=$("input"),s=q(),i=M(m),l=q(),u=$("span"),c=q(),n.required=!0,C(n,"type","radio"),C(n,"id",o="answer"+e[12]),n.__value=a=e[10],n.value=n.__value,C(n,"name",r="question"+e[9]),C(n,"class","svelte-ous5hl"),e[5][0].push(n),C(u,"class","radio svelte-ous5hl"),C(t,"for",d="answer"+e[12]),C(t,"class","svelte-ous5hl")},m(o,a){w(o,t,a),y(t,n),n.checked=n.__value===e[0],y(t,s),y(t,i),y(t,l),y(t,u),y(t,c),h||(f=_(n,"change",e[4]),h=!0)},p(e,t){2&t&&a!==(a=e[10])&&(n.__value=a,n.value=n.__value),1&t&&(n.checked=n.__value===e[0]),2&t&&m!==(m=be(e[10])+"")&&A(i,m)},d(o){o&&b(t),e[5][0].splice(e[5][0].indexOf(n),1),h=!1,f()}}}function Fe(e){let t;return{c(){t=$("button"),t.textContent="Ok",C(t,"type","submit")},m(e,n){w(e,t,n)},d(e){e&&b(t)}}}function Ne(e){let t;return{c(){t=$("button"),t.textContent="Siguiente",C(t,"type","submit")},m(e,n){w(e,t,n)},d(e){e&&b(t)}}}function ze(e){let t,n,o=e[2]===e[9]&&Je(e);return{c(){o&&o.c(),t=k()},m(e,a){o&&o.m(e,a),w(e,t,a),n=!0},p(e,n){e[2]===e[9]?o?(o.p(e,n),4&n&&oe(o,1)):(o=Je(e),o.c(),oe(o,1),o.m(t.parentNode,t)):o&&(te(),ae(o,1,1,(()=>{o=null})),ne())},i(e){n||(oe(o),n=!0)},o(e){ae(o),n=!1},d(e){o&&o.d(e),e&&b(t)}}}function Ge(e){let t,n,o=e[1],a=[];for(let t=0;t<o.length;t+=1)a[t]=ze(Le(e,o,t));const r=e=>ae(a[e],1,1,(()=>{a[e]=null}));return{c(){for(let e=0;e<a.length;e+=1)a[e].c();t=k()},m(e,o){for(let t=0;t<a.length;t+=1)a[t].m(e,o);w(e,t,o),n=!0},p(e,[n]){if(15&n){let s;for(o=e[1],s=0;s<o.length;s+=1){const r=Le(e,o,s);a[s]?(a[s].p(r,n),oe(a[s],1)):(a[s]=ze(r),a[s].c(),oe(a[s],1),a[s].m(t.parentNode,t))}for(te(),s=o.length;s<a.length;s+=1)r(s);ne()}},i(e){if(!n){for(let e=0;e<o.length;e+=1)oe(a[e]);n=!0}},o(e){a=a.filter(Boolean);for(let e=0;e<a.length;e+=1)ae(a[e]);n=!1},d(e){v(a,e),e&&b(t)}}}function Ke(e,t,n){let o,a,r,s;u(e,Te,(e=>n(1,o=e))),u(e,Ce,(e=>n(2,a=e))),u(e,Ee,(e=>n(6,r=e)));return[s,o,a,()=>{o[a].correctAnswer===s?(Se.update((e=>e+1)),c(Ee,r=[...r,{correct:!0,chosenAnswer:s}],r)):c(Ee,r=[...r,{correct:!1,chosenAnswer:s}],r),n(0,s=""),a<o.length-1?Ce.update((e=>e+1)):(xe.set(!1),We.set(!0))},function(){s=this.__value,n(0,s)},[[]]]}class je extends fe{constructor(e){super(),he(this,e,Ke,Ge,s,{})}}function Ve(e){let t,n,o,r,s,i,l,u,c,d,h,f,m,p,g,v;return{c(){t=$("div"),n=$("h1"),o=M(e[0]),r=M("!"),s=q(),i=$("form"),l=$("label"),u=M("Cuántas preguntas?\r\n            "),c=$("input"),d=q(),h=$("button"),h.textContent="Empezar",C(n,"class","svelte-1n5xzdl"),C(c,"type","number"),C(c,"max",e[1]),C(c,"min","1"),c.required=!0,C(c,"class","svelte-1n5xzdl"),C(l,"class","svelte-1n5xzdl"),C(h,"type","submit")},m(a,f){w(a,t,f),y(t,n),y(n,o),y(n,r),y(t,s),y(t,i),y(i,l),y(l,u),y(l,c),R(c,e[2]),y(i,d),y(i,h),p=!0,g||(v=[_(c,"input",e[4]),_(i,"submit",x(e[3]))],g=!0)},p(e,[t]){(!p||1&t)&&A(o,e[0]),(!p||2&t)&&C(c,"max",e[1]),4&t&&W(c.value)!==e[2]&&R(c,e[2])},i(e){p||(G((()=>{m&&m.end(1),f||(f=se(t,Pe,{x:200,duration:500,delay:500})),f.start()})),p=!0)},o(e){f&&f.invalidate(),m=ie(t,Pe,{x:-200,duration:500}),p=!1},d(e){e&&b(t),e&&m&&m.end(),g=!1,a(v)}}}function Qe(e,t,n){let o,a,r;u(e,Re,(e=>n(0,o=e))),u(e,ke,(e=>n(1,a=e))),u(e,_e,(e=>n(2,r=e)));return[o,a,r,()=>{xe.set(!0)},function(){r=W(this.value),_e.set(r)}]}class Ye extends fe{constructor(e){super(),he(this,e,Qe,Ve,s,{})}}function Ze(e,t,n){const o=e.slice();return o[4]=t[n],o[6]=n,o}function Ue(e){let t,n=e[2],o=[];for(let t=0;t<n.length;t+=1)o[t]=ot(Ze(e,n,t));return{c(){t=$("ul");for(let e=0;e<o.length;e+=1)o[e].c();C(t,"class","svelte-1beyh99")},m(e,n){w(e,t,n);for(let e=0;e<o.length;e+=1)o[e].m(t,null)},p(e,a){if(6&a){let r;for(n=e[2],r=0;r<n.length;r+=1){const s=Ze(e,n,r);o[r]?o[r].p(s,a):(o[r]=ot(s),o[r].c(),o[r].m(t,null))}for(;r<o.length;r+=1)o[r].d(1);o.length=n.length}},d(e){e&&b(t),v(o,e)}}}function Xe(e){let t;return{c(){t=$("span"),t.textContent="0",C(t,"class","icon wrong svelte-1beyh99")},m(e,n){w(e,t,n)},d(e){e&&b(t)}}}function et(e){let t;return{c(){t=$("span"),t.textContent="+1",C(t,"class","icon correct svelte-1beyh99")},m(e,n){w(e,t,n)},d(e){e&&b(t)}}}function tt(e){let t,n,o,a=be(e[1][e[6]].chosenAnswer)+"";return{c(){t=$("p"),n=M("Tu respuesta:\r\n                "),o=M(a),C(t,"class","svelte-1beyh99")},m(e,a){w(e,t,a),y(t,n),y(t,o)},p(e,t){2&t&&a!==(a=be(e[1][e[6]].chosenAnswer)+"")&&A(o,a)},d(e){e&&b(t)}}}function nt(e){let t,n,o=e[4].followup+"";return{c(){t=$("p"),n=M(o),C(t,"class","followup svelte-1beyh99")},m(e,o){w(e,t,o),y(t,n)},p(e,t){4&t&&o!==(o=e[4].followup+"")&&A(n,o)},d(e){e&&b(t)}}}function ot(e){let t,n,o,a,r,s,i,l,u,c,d,h,f=e[4].question+"",m=be(e[4].correctAnswer)+"";function p(e,t){return e[1][e[6]].correct?et:Xe}let g=p(e),v=g(e),k=!e[1][e[6]].correct&&tt(e),_=e[4].followup&&nt(e);return{c(){t=$("li"),n=$("div"),v.c(),o=q(),a=$("div"),r=$("p"),s=M(f),i=q(),l=$("p"),u=M(m),c=q(),k&&k.c(),d=q(),_&&_.c(),h=q(),C(n,"class","svelte-1beyh99"),C(r,"class","svelte-1beyh99"),C(l,"class","svelte-1beyh99"),C(a,"class","svelte-1beyh99"),C(t,"class","svelte-1beyh99")},m(e,f){w(e,t,f),y(t,n),v.m(n,null),y(t,o),y(t,a),y(a,r),y(r,s),y(a,i),y(a,l),y(l,u),y(a,c),k&&k.m(a,null),y(a,d),_&&_.m(a,null),y(t,h)},p(e,t){g!==(g=p(e))&&(v.d(1),v=g(e),v&&(v.c(),v.m(n,null))),4&t&&f!==(f=e[4].question+"")&&A(s,f),4&t&&m!==(m=be(e[4].correctAnswer)+"")&&A(u,m),e[1][e[6]].correct?k&&(k.d(1),k=null):k?k.p(e,t):(k=tt(e),k.c(),k.m(a,d)),e[4].followup?_?_.p(e,t):(_=nt(e),_.c(),_.m(a,null)):_&&(_.d(1),_=null)},d(e){e&&b(t),v.d(),k&&k.d(),_&&_.d()}}}function at(e){let t,n,o,a,r,s,i,l,u,c,d,h,f,m,p,g,v,k,x,W=null!=e[1]&&0!=e[1].length&&Ue(e);return{c(){t=$("div"),n=$("h1"),n.textContent="Resultados",o=q(),a=$("div"),r=$("p"),s=M("Puntuación : "),i=M(e[0]),l=M("%"),u=q(),c=$("div"),d=$("div"),h=q(),W&&W.c(),f=q(),m=$("button"),m.textContent="Intenta de nuevo",C(n,"class","svelte-1beyh99"),C(r,"class","final-score svelte-1beyh99"),C(d,"class","score-bar svelte-1beyh99"),T(d,"width",e[0]+"%"),T(d,"background",ve(e[0])),C(c,"class","score-scale svelte-1beyh99"),C(m,"type","button")},m(e,p){w(e,t,p),y(t,n),y(t,o),y(t,a),y(a,r),y(r,s),y(r,i),y(r,l),y(a,u),y(a,c),y(c,d),y(t,h),W&&W.m(t,null),y(t,f),y(t,m),v=!0,k||(x=_(m,"click",Be),k=!0)},p(e,[n]){(!v||1&n)&&A(i,e[0]),(!v||1&n)&&T(d,"width",e[0]+"%"),(!v||1&n)&&T(d,"background",ve(e[0])),null!=e[1]&&0!=e[1].length?W?W.p(e,n):(W=Ue(e),W.c(),W.m(t,f)):W&&(W.d(1),W=null)},i(e){v||(G((()=>{g&&g.end(1),p||(p=se(t,Pe,{y:200,duration:500,delay:500})),p.start()})),v=!0)},o(e){p&&p.invalidate(),g=ie(t,Pe,{y:-200,duration:500}),v=!1},d(e){e&&b(t),W&&W.d(),e&&g&&g.end(),k=!1,x()}}}function rt(e,t,n){let o,a,r;u(e,He,(e=>n(3,o=e))),u(e,Ee,(e=>n(1,a=e))),u(e,Te,(e=>n(2,r=e)));let s=0;return O((async()=>{n(0,s=o)})),[s,a,r]}class st extends fe{constructor(e){super(),he(this,e,rt,at,s,{})}}function it(e){let t,n;return t=new Ye({}),{c(){le(t.$$.fragment)},m(e,o){ue(t,e,o),n=!0},i(e){n||(oe(t.$$.fragment,e),n=!0)},o(e){ae(t.$$.fragment,e),n=!1},d(e){ce(t,e)}}}function lt(e){let t,n;return t=new st({}),{c(){le(t.$$.fragment)},m(e,o){ue(t,e,o),n=!0},i(e){n||(oe(t.$$.fragment,e),n=!0)},o(e){ae(t.$$.fragment,e),n=!1},d(e){ce(t,e)}}}function ut(e){let t,n;return t=new je({}),{c(){le(t.$$.fragment)},m(e,o){ue(t,e,o),n=!0},i(e){n||(oe(t.$$.fragment,e),n=!0)},o(e){ae(t.$$.fragment,e),n=!1},d(e){ce(t,e)}}}function ct(e){let t,n,o,a;const r=[ut,lt,it],s=[];function i(e,t){return e[0]?0:e[1]?1:2}return n=i(e),o=s[n]=r[n](e),{c(){t=$("main"),o.c(),C(t,"class","svelte-1o1ab46")},m(e,o){w(e,t,o),s[n].m(t,null),a=!0},p(e,[a]){let l=n;n=i(e),n!==l&&(te(),ae(s[l],1,1,(()=>{s[l]=null})),ne(),o=s[n],o||(o=s[n]=r[n](e),o.c()),oe(o,1),o.m(t,null))},i(e){a||(oe(o),a=!0)},o(e){ae(o),a=!1},d(e){e&&b(t),s[n].d()}}}function dt(e,t,n){let o,a;return u(e,xe,(e=>n(0,o=e))),u(e,We,(e=>n(1,a=e))),[o,a]}return new class extends fe{constructor(e){super(),he(this,e,dt,ct,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
