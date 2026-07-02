import{B as q,r as j,a as ne,o as l,c as y,w as p,b as d,m as a,d as r,e as c,n as F,f as V,g as m,h as te,T as W,Y as se,I as oe,v as re,D as ae,S as ie,i as g,t as w,j as le,u as de,k as ue,l as ce,F as h,p as A,q as v,s as I,x as pe}from"./index-BIqUsxCO.js";import{s as Y,R as me,f as E,a as Q,b as ge,c as J,d as fe,O as ye,C as be,x,e as he}from"./index-BvAmfAC7.js";import{s as R}from"./index-Dy_MTOne.js";import{s as ve}from"./index-KVyqv-cF.js";var we=`
    .p-message {
        display: grid;
        grid-template-rows: 1fr;
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content-wrapper {
        min-height: 0;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }

    .p-message-enter-active {
        animation: p-animate-message-enter 0.3s ease-out forwards;
        overflow: hidden;
    }

    .p-message-leave-active {
        animation: p-animate-message-leave 0.15s ease-in forwards;
        overflow: hidden;
    }

    @keyframes p-animate-message-enter {
        from {
            opacity: 0;
            grid-template-rows: 0fr;
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-message-leave {
        from {
            opacity: 1;
            grid-template-rows: 1fr;
        }
        to {
            opacity: 0;
            margin: 0;
            grid-template-rows: 0fr;
        }
    }
`,ke={root:function(n){var t=n.props;return["p-message p-component p-message-"+t.severity,{"p-message-outlined":t.variant==="outlined","p-message-simple":t.variant==="simple","p-message-sm":t.size==="small","p-message-lg":t.size==="large"}]},contentWrapper:"p-message-content-wrapper",content:"p-message-content",icon:"p-message-icon",text:"p-message-text",closeButton:"p-message-close-button",closeIcon:"p-message-close-icon"},Ce=q.extend({name:"message",style:we,classes:ke}),Se={name:"BaseMessage",extends:ve,props:{severity:{type:String,default:"info"},closable:{type:Boolean,default:!1},life:{type:Number,default:null},icon:{type:String,default:void 0},closeIcon:{type:String,default:void 0},closeButtonProps:{type:null,default:null},size:{type:String,default:null},variant:{type:String,default:null}},style:Ce,provide:function(){return{$pcMessage:this,$parentInstance:this}}};function P(e){"@babel/helpers - typeof";return P=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},P(e)}function U(e,n,t){return(n=Ie(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Ie(e){var n=Pe(e,"string");return P(n)=="symbol"?n:n+""}function Pe(e,n){if(P(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var s=t.call(e,n);if(P(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var X={name:"Message",extends:Se,inheritAttrs:!1,emits:["close","life-end"],timeout:null,data:function(){return{visible:!0}},mounted:function(){var n=this;this.life&&setTimeout(function(){n.visible=!1,n.$emit("life-end")},this.life)},methods:{close:function(n){this.visible=!1,this.$emit("close",n)}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0},dataP:function(){return E(U(U({outlined:this.variant==="outlined",simple:this.variant==="simple"},this.severity,this.severity),this.size,this.size))}},directives:{ripple:me},components:{TimesIcon:Y}};function $(e){"@babel/helpers - typeof";return $=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},$(e)}function H(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);n&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),t.push.apply(t,s)}return t}function N(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?H(Object(t),!0).forEach(function(s){$e(e,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):H(Object(t)).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))})}return e}function $e(e,n,t){return(n=ze(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function ze(e){var n=Te(e,"string");return $(n)=="symbol"?n:n+""}function Te(e,n){if($(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var s=t.call(e,n);if($(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var Le=["data-p"],Oe=["data-p"],je=["data-p"],Ee=["aria-label","data-p"],Ae=["data-p"];function xe(e,n,t,s,i,o){var f=j("TimesIcon"),k=ne("ripple");return l(),y(W,a({name:"p-message",appear:""},e.ptmi("transition")),{default:p(function(){return[i.visible?(l(),d("div",a({key:0,class:e.cx("root"),role:"alert","aria-live":"assertive","aria-atomic":"true","data-p":o.dataP},e.ptm("root")),[r("div",a({class:e.cx("contentWrapper")},e.ptm("contentWrapper")),[e.$slots.container?c(e.$slots,"container",{key:0,closeCallback:o.close}):(l(),d("div",a({key:1,class:e.cx("content"),"data-p":o.dataP},e.ptm("content")),[c(e.$slots,"icon",{class:F(e.cx("icon"))},function(){return[(l(),y(V(e.icon?"span":null),a({class:[e.cx("icon"),e.icon],"data-p":o.dataP},e.ptm("icon")),null,16,["class","data-p"]))]}),e.$slots.default?(l(),d("div",a({key:0,class:e.cx("text"),"data-p":o.dataP},e.ptm("text")),[c(e.$slots,"default")],16,je)):m("",!0),e.closable?te((l(),d("button",a({key:1,class:e.cx("closeButton"),"aria-label":o.closeAriaLabel,type:"button",onClick:n[0]||(n[0]=function(C){return o.close(C)}),"data-p":o.dataP},N(N({},e.closeButtonProps),e.ptm("closeButton"))),[c(e.$slots,"closeicon",{},function(){return[e.closeIcon?(l(),d("i",a({key:0,class:[e.cx("closeIcon"),e.closeIcon],"data-p":o.dataP},e.ptm("closeIcon")),null,16,Ae)):(l(),y(f,a({key:1,class:[e.cx("closeIcon"),e.closeIcon],"data-p":o.dataP},e.ptm("closeIcon")),null,16,["class","data-p"]))]})],16,Ee)),[[k]]):m("",!0)],16,Oe))],16)],16,Le)):m("",!0)]}),_:3},16)}X.render=xe;var G={name:"EyeIcon",extends:Q};function Me(e){return Re(e)||De(e)||Be(e)||Ve()}function Ve(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Be(e,n){if(e){if(typeof e=="string")return B(e,n);var t={}.toString.call(e).slice(8,-1);return t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set"?Array.from(e):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?B(e,n):void 0}}function De(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Re(e){if(Array.isArray(e))return B(e)}function B(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,s=Array(n);t<n;t++)s[t]=e[t];return s}function Ue(e,n,t,s,i,o){return l(),d("svg",a({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),Me(n[0]||(n[0]=[r("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0.0535499 7.25213C0.208567 7.59162 2.40413 12.4 7 12.4C11.5959 12.4 13.7914 7.59162 13.9465 7.25213C13.9487 7.2471 13.9506 7.24304 13.952 7.24001C13.9837 7.16396 14 7.08239 14 7.00001C14 6.91762 13.9837 6.83605 13.952 6.76001C13.9506 6.75697 13.9487 6.75292 13.9465 6.74788C13.7914 6.4084 11.5959 1.60001 7 1.60001C2.40413 1.60001 0.208567 6.40839 0.0535499 6.74788C0.0512519 6.75292 0.0494023 6.75697 0.048 6.76001C0.0163137 6.83605 0 6.91762 0 7.00001C0 7.08239 0.0163137 7.16396 0.048 7.24001C0.0494023 7.24304 0.0512519 7.2471 0.0535499 7.25213ZM7 11.2C3.664 11.2 1.736 7.92001 1.264 7.00001C1.736 6.08001 3.664 2.80001 7 2.80001C10.336 2.80001 12.264 6.08001 12.736 7.00001C12.264 7.92001 10.336 11.2 7 11.2ZM5.55551 9.16182C5.98308 9.44751 6.48576 9.6 7 9.6C7.68891 9.59789 8.349 9.32328 8.83614 8.83614C9.32328 8.349 9.59789 7.68891 9.59999 7C9.59999 6.48576 9.44751 5.98308 9.16182 5.55551C8.87612 5.12794 8.47006 4.7947 7.99497 4.59791C7.51988 4.40112 6.99711 4.34963 6.49276 4.44995C5.98841 4.55027 5.52513 4.7979 5.16152 5.16152C4.7979 5.52513 4.55027 5.98841 4.44995 6.49276C4.34963 6.99711 4.40112 7.51988 4.59791 7.99497C4.7947 8.47006 5.12794 8.87612 5.55551 9.16182ZM6.2222 5.83594C6.45243 5.6821 6.7231 5.6 7 5.6C7.37065 5.6021 7.72553 5.75027 7.98762 6.01237C8.24972 6.27446 8.39789 6.62934 8.4 7C8.4 7.27689 8.31789 7.54756 8.16405 7.77779C8.01022 8.00802 7.79157 8.18746 7.53575 8.29343C7.27994 8.39939 6.99844 8.42711 6.72687 8.37309C6.4553 8.31908 6.20584 8.18574 6.01005 7.98994C5.81425 7.79415 5.68091 7.54469 5.6269 7.27312C5.57288 7.00155 5.6006 6.72006 5.70656 6.46424C5.81253 6.20842 5.99197 5.98977 6.2222 5.83594Z",fill:"currentColor"},null,-1)])),16)}G.render=Ue;var _={name:"EyeSlashIcon",extends:Q};function He(e){return qe(e)||Ze(e)||Ke(e)||Ne()}function Ne(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ke(e,n){if(e){if(typeof e=="string")return D(e,n);var t={}.toString.call(e).slice(8,-1);return t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set"?Array.from(e):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?D(e,n):void 0}}function Ze(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function qe(e){if(Array.isArray(e))return D(e)}function D(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,s=Array(n);t<n;t++)s[t]=e[t];return s}function Fe(e,n,t,s,i,o){return l(),d("svg",a({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),He(n[0]||(n[0]=[r("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M13.9414 6.74792C13.9437 6.75295 13.9455 6.757 13.9469 6.76003C13.982 6.8394 14.0001 6.9252 14.0001 7.01195C14.0001 7.0987 13.982 7.1845 13.9469 7.26386C13.6004 8.00059 13.1711 8.69549 12.6674 9.33515C12.6115 9.4071 12.54 9.46538 12.4582 9.50556C12.3765 9.54574 12.2866 9.56678 12.1955 9.56707C12.0834 9.56671 11.9737 9.53496 11.8788 9.47541C11.7838 9.41586 11.7074 9.3309 11.6583 9.23015C11.6092 9.12941 11.5893 9.01691 11.6008 8.90543C11.6124 8.79394 11.6549 8.68793 11.7237 8.5994C12.1065 8.09726 12.4437 7.56199 12.7313 6.99995C12.2595 6.08027 10.3402 2.8014 6.99732 2.8014C6.63723 2.80218 6.27816 2.83969 5.92569 2.91336C5.77666 2.93304 5.62568 2.89606 5.50263 2.80972C5.37958 2.72337 5.29344 2.59398 5.26125 2.44714C5.22907 2.30031 5.2532 2.14674 5.32885 2.01685C5.40451 1.88696 5.52618 1.79021 5.66978 1.74576C6.10574 1.64961 6.55089 1.60134 6.99732 1.60181C11.5916 1.60181 13.7864 6.40856 13.9414 6.74792ZM2.20333 1.61685C2.35871 1.61411 2.5091 1.67179 2.6228 1.77774L12.2195 11.3744C12.3318 11.4869 12.3949 11.6393 12.3949 11.7983C12.3949 11.9572 12.3318 12.1097 12.2195 12.2221C12.107 12.3345 11.9546 12.3976 11.7956 12.3976C11.6367 12.3976 11.4842 12.3345 11.3718 12.2221L10.5081 11.3584C9.46549 12.0426 8.24432 12.4042 6.99729 12.3981C2.403 12.3981 0.208197 7.59135 0.0532336 7.25198C0.0509364 7.24694 0.0490875 7.2429 0.0476856 7.23986C0.0162332 7.16518 3.05176e-05 7.08497 3.05176e-05 7.00394C3.05176e-05 6.92291 0.0162332 6.8427 0.0476856 6.76802C0.631261 5.47831 1.46902 4.31959 2.51084 3.36119L1.77509 2.62545C1.66914 2.51175 1.61146 2.36136 1.61421 2.20597C1.61695 2.05059 1.6799 1.90233 1.78979 1.79244C1.89968 1.68254 2.04794 1.6196 2.20333 1.61685ZM7.45314 8.35147L5.68574 6.57609V6.5361C5.5872 6.78938 5.56498 7.06597 5.62183 7.33173C5.67868 7.59749 5.8121 7.84078 6.00563 8.03158C6.19567 8.21043 6.43052 8.33458 6.68533 8.39089C6.94014 8.44721 7.20543 8.43359 7.45314 8.35147ZM1.26327 6.99994C1.7351 7.91163 3.64645 11.1985 6.99729 11.1985C7.9267 11.2048 8.8408 10.9618 9.64438 10.4947L8.35682 9.20718C7.86027 9.51441 7.27449 9.64491 6.69448 9.57752C6.11446 9.51014 5.57421 9.24881 5.16131 8.83592C4.74842 8.42303 4.4871 7.88277 4.41971 7.30276C4.35232 6.72274 4.48282 6.13697 4.79005 5.64041L3.35855 4.2089C2.4954 5.00336 1.78523 5.94935 1.26327 6.99994Z",fill:"currentColor"},null,-1)])),16)}_.render=Fe;var We=`
    .p-password {
        display: inline-flex;
        position: relative;
    }

    .p-password .p-password-overlay {
        min-width: 100%;
    }

    .p-password-meter {
        height: dt('password.meter.height');
        background: dt('password.meter.background');
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-label {
        height: 100%;
        width: 0;
        transition: width 1s ease-in-out;
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-weak {
        background: dt('password.strength.weak.background');
    }

    .p-password-meter-medium {
        background: dt('password.strength.medium.background');
    }

    .p-password-meter-strong {
        background: dt('password.strength.strong.background');
    }

    .p-password-fluid {
        display: flex;
    }

    .p-password-fluid .p-password-input {
        width: 100%;
    }

    .p-password-input::-ms-reveal,
    .p-password-input::-ms-clear {
        display: none;
    }

    .p-password-overlay {
        padding: dt('password.overlay.padding');
        background: dt('password.overlay.background');
        color: dt('password.overlay.color');
        border: 1px solid dt('password.overlay.border.color');
        box-shadow: dt('password.overlay.shadow');
        border-radius: dt('password.overlay.border.radius');
    }

    .p-password-content {
        display: flex;
        flex-direction: column;
        gap: dt('password.content.gap');
    }

    .p-password-toggle-mask-icon {
        inset-inline-end: dt('form.field.padding.x');
        color: dt('password.icon.color');
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * calc(dt('icon.size') / 2));
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-password-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon):has(.p-password-toggle-mask-icon)  .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

`,Ye={root:function(n){var t=n.props;return{position:t.appendTo==="self"?"relative":void 0}}},Qe={root:function(n){var t=n.instance;return["p-password p-component p-inputwrapper",{"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":t.focused,"p-password-fluid":t.$fluid}]},pcInputText:"p-password-input",maskIcon:"p-password-toggle-mask-icon p-password-mask-icon",unmaskIcon:"p-password-toggle-mask-icon p-password-unmask-icon",clearIcon:"p-password-clear-icon",overlay:"p-password-overlay p-component",content:"p-password-content",meter:"p-password-meter",meterLabel:function(n){var t=n.instance;return"p-password-meter-label ".concat(t.meter?"p-password-meter-"+t.meter.strength:"")},meterText:"p-password-meter-text"},Je=q.extend({name:"password",style:We,classes:Qe,inlineStyles:Ye}),Xe={name:"BasePassword",extends:fe,props:{promptLabel:{type:String,default:null},mediumRegex:{type:[String,RegExp],default:"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"},strongRegex:{type:[String,RegExp],default:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"},weakLabel:{type:String,default:null},mediumLabel:{type:String,default:null},strongLabel:{type:String,default:null},feedback:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},toggleMask:{type:Boolean,default:!1},hideIcon:{type:String,default:void 0},maskIcon:{type:String,default:void 0},showIcon:{type:String,default:void 0},unmaskIcon:{type:String,default:void 0},showClear:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},panelId:{type:String,default:null},panelClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},panelProps:{type:null,default:null},overlayId:{type:String,default:null},overlayClass:{type:[String,Object],default:null},overlayStyle:{type:Object,default:null},overlayProps:{type:null,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},autofocus:{type:Boolean,default:null}},style:Je,provide:function(){return{$pcPassword:this,$parentInstance:this}}};function z(e){"@babel/helpers - typeof";return z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},z(e)}function K(e,n,t){return(n=Ge(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Ge(e){var n=_e(e,"string");return z(n)=="symbol"?n:n+""}function _e(e,n){if(z(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var s=t.call(e,n);if(z(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var ee={name:"Password",extends:Xe,inheritAttrs:!1,emits:["change","focus","blur","invalid"],inject:{$pcFluid:{default:null}},data:function(){return{overlayVisible:!1,meter:null,infoText:null,focused:!1,unmasked:!1}},mediumCheckRegExp:null,strongCheckRegExp:null,resizeListener:null,scrollHandler:null,overlay:null,mounted:function(){this.infoText=this.promptText,this.mediumCheckRegExp=new RegExp(this.mediumRegex),this.strongCheckRegExp=new RegExp(this.strongRegex)},beforeUnmount:function(){this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.overlay&&(x.clear(this.overlay),this.overlay=null)},methods:{onOverlayEnter:function(n){x.set("overlay",n,this.$primevue.config.zIndex.overlay),ie(n,{position:"absolute",top:"0"}),this.alignOverlay(),this.bindScrollListener(),this.bindResizeListener(),this.$attrSelector&&n.setAttribute(this.$attrSelector,"")},onOverlayLeave:function(){this.unbindScrollListener(),this.unbindResizeListener(),this.overlay=null},onOverlayAfterLeave:function(n){x.clear(n)},alignOverlay:function(){this.appendTo==="self"?oe(this.overlay,this.$refs.input.$el):(this.overlay.style.minWidth=re(this.$refs.input.$el)+"px",ae(this.overlay,this.$refs.input.$el))},testStrength:function(n){var t=0;return this.strongCheckRegExp.test(n)?t=3:this.mediumCheckRegExp.test(n)?t=2:n.length&&(t=1),t},onInput:function(n){this.writeValue(n.target.value,n),this.$emit("change",n)},onFocus:function(n){this.focused=!0,this.feedback&&(this.setPasswordMeter(this.d_value),this.overlayVisible=!0),this.$emit("focus",n)},onBlur:function(n){this.focused=!1,this.feedback&&(this.overlayVisible=!1),this.$emit("blur",n)},onKeyUp:function(n){if(this.feedback){var t=n.target.value,s=this.checkPasswordStrength(t),i=s.meter,o=s.label;if(this.meter=i,this.infoText=o,n.code==="Escape"){this.overlayVisible&&(this.overlayVisible=!1);return}this.overlayVisible||(this.overlayVisible=!0)}},setPasswordMeter:function(){if(!this.d_value){this.meter=null,this.infoText=this.promptText;return}var n=this.checkPasswordStrength(this.d_value),t=n.meter,s=n.label;this.meter=t,this.infoText=s,this.overlayVisible||(this.overlayVisible=!0)},checkPasswordStrength:function(n){var t=null,s=null;switch(this.testStrength(n)){case 1:t=this.weakText,s={strength:"weak",width:"33.33%"};break;case 2:t=this.mediumText,s={strength:"medium",width:"66.66%"};break;case 3:t=this.strongText,s={strength:"strong",width:"100%"};break;default:t=this.promptText,s=null;break}return{label:t,meter:s}},onInvalid:function(n){this.$emit("invalid",n)},bindScrollListener:function(){var n=this;this.scrollHandler||(this.scrollHandler=new be(this.$refs.input.$el,function(){n.overlayVisible&&(n.overlayVisible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var n=this;this.resizeListener||(this.resizeListener=function(){n.overlayVisible&&!se()&&(n.overlayVisible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},overlayRef:function(n){this.overlay=n},onMaskToggle:function(){this.unmasked=!this.unmasked},onClearClick:function(n){this.writeValue(null,{})},onOverlayClick:function(n){ye.emit("overlay-click",{originalEvent:n,target:this.$el})}},computed:{inputType:function(){return this.unmasked?"text":"password"},weakText:function(){return this.weakLabel||this.$primevue.config.locale.weak},mediumText:function(){return this.mediumLabel||this.$primevue.config.locale.medium},strongText:function(){return this.strongLabel||this.$primevue.config.locale.strong},promptText:function(){return this.promptLabel||this.$primevue.config.locale.passwordPrompt},isClearIconVisible:function(){return this.showClear&&this.$filled&&!this.disabled},overlayUniqueId:function(){return this.$id+"_overlay"},containerDataP:function(){return E({fluid:this.$fluid})},meterDataP:function(){var n,t;return E(K({},(n=this.meter)===null||n===void 0?void 0:n.strength,(t=this.meter)===null||t===void 0?void 0:t.strength))},overlayDataP:function(){return E(K({},"portal-"+this.appendTo,"portal-"+this.appendTo))}},components:{InputText:J,Portal:ge,EyeSlashIcon:_,EyeIcon:G,TimesIcon:Y}};function T(e){"@babel/helpers - typeof";return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},T(e)}function Z(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);n&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),t.push.apply(t,s)}return t}function M(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?Z(Object(t),!0).forEach(function(s){en(e,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Z(Object(t)).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))})}return e}function en(e,n,t){return(n=nn(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function nn(e){var n=tn(e,"string");return T(n)=="symbol"?n:n+""}function tn(e,n){if(T(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var s=t.call(e,n);if(T(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var sn=["data-p"],on=["id","data-p"],rn=["data-p"];function an(e,n,t,s,i,o){var f=j("InputText"),k=j("TimesIcon"),C=j("Portal");return l(),d("div",a({class:e.cx("root"),style:e.sx("root"),"data-p":o.containerDataP},e.ptmi("root")),[g(f,a({ref:"input",id:e.inputId,type:o.inputType,class:[e.cx("pcInputText"),e.inputClass],style:e.inputStyle,defaultValue:e.d_value,name:e.$formName,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-expanded":i.overlayVisible,"aria-controls":i.overlayVisible?e.overlayProps&&e.overlayProps.id||e.overlayId||e.panelProps&&e.panelProps.id||e.panelId||o.overlayUniqueId:void 0,"aria-haspopup":e.feedback,placeholder:e.placeholder,required:e.required,fluid:e.fluid,disabled:e.disabled,variant:e.variant,invalid:e.invalid,size:e.size,autofocus:e.autofocus,onInput:o.onInput,onFocus:o.onFocus,onBlur:o.onBlur,onKeyup:o.onKeyUp,onInvalid:o.onInvalid},e.inputProps,{"data-p-has-e-icon":e.toggleMask,pt:e.ptm("pcInputText"),unstyled:e.unstyled}),null,16,["id","type","class","style","defaultValue","name","aria-labelledby","aria-label","aria-expanded","aria-controls","aria-haspopup","placeholder","required","fluid","disabled","variant","invalid","size","autofocus","onInput","onFocus","onBlur","onKeyup","onInvalid","data-p-has-e-icon","pt","unstyled"]),e.toggleMask&&i.unmasked?c(e.$slots,e.$slots.maskicon?"maskicon":"hideicon",a({key:0,toggleCallback:o.onMaskToggle,class:[e.cx("maskIcon"),e.maskIcon]},e.ptm("maskIcon")),function(){return[(l(),y(V(e.maskIcon?"i":"EyeSlashIcon"),a({class:[e.cx("maskIcon"),e.maskIcon],onClick:o.onMaskToggle},e.ptm("maskIcon")),null,16,["class","onClick"]))]}):m("",!0),e.toggleMask&&!i.unmasked?c(e.$slots,e.$slots.unmaskicon?"unmaskicon":"showicon",a({key:1,toggleCallback:o.onMaskToggle,class:[e.cx("unmaskIcon")]},e.ptm("unmaskIcon")),function(){return[(l(),y(V(e.unmaskIcon?"i":"EyeIcon"),a({class:[e.cx("unmaskIcon"),e.unmaskIcon],onClick:o.onMaskToggle},e.ptm("unmaskIcon")),null,16,["class","onClick"]))]}):m("",!0),o.isClearIconVisible?c(e.$slots,"clearicon",a({key:2,class:e.cx("clearIcon"),clearCallback:o.onClearClick},e.ptm("clearIcon")),function(){return[g(k,a({class:[e.cx("clearIcon")],onClick:o.onClearClick},e.ptm("clearIcon")),null,16,["class","onClick"])]}):m("",!0),r("span",a({class:"p-hidden-accessible","aria-live":"polite"},e.ptm("hiddenAccesible"),{"data-p-hidden-accessible":!0}),w(i.infoText),17),g(C,{appendTo:e.appendTo},{default:p(function(){return[g(W,a({name:"p-anchored-overlay",onEnter:o.onOverlayEnter,onLeave:o.onOverlayLeave,onAfterLeave:o.onOverlayAfterLeave},e.ptm("transition")),{default:p(function(){return[i.overlayVisible?(l(),d("div",a({key:0,ref:o.overlayRef,id:e.overlayId||e.panelId||o.overlayUniqueId,class:[e.cx("overlay"),e.panelClass,e.overlayClass],style:[e.overlayStyle,e.panelStyle],onClick:n[0]||(n[0]=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}),"data-p":o.overlayDataP,role:"dialog","aria-live":"polite"},M(M(M({},e.panelProps),e.overlayProps),e.ptm("overlay"))),[c(e.$slots,"header"),c(e.$slots,"content",{},function(){return[r("div",a({class:e.cx("content")},e.ptm("content")),[r("div",a({class:e.cx("meter")},e.ptm("meter")),[r("div",a({class:e.cx("meterLabel"),style:{width:i.meter?i.meter.width:""},"data-p":o.meterDataP},e.ptm("meterLabel")),null,16,rn)],16),r("div",a({class:e.cx("meterText")},e.ptm("meterText")),w(i.infoText),17)],16)]}),c(e.$slots,"footer")],16,on)):m("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])],16,sn)}ee.render=an;const ln={style:{"min-height":"100vh",display:"flex","align-items":"center","justify-content":"center",background:"linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",padding:"2rem"}},dn={style:{width:"100%","max-width":"480px"}},un={class:"card-grid"},cn={style:{display:"flex","align-items":"center",gap:"0.5rem"}},pn={style:{"font-size":"0.8rem",color:"var(--p-surface-500)"}},mn={style:{display:"flex","flex-direction":"column",gap:"1rem"}},gn={key:0},wn=le({__name:"LoginPage",setup(e){const n=de(),t=I(""),s=I(""),i=I(""),o=I([]),f=I(!1);ue(async()=>{if(n.isDev)try{const{data:L}=await ce.get("/dev/users");o.value=L}catch{}});async function k(){if(!(!t.value||!s.value)){f.value=!0,i.value="";try{await n.login(t.value,s.value)}catch{i.value="Invalid email or password"}finally{f.value=!1}}}async function C(L){await n.devLogin(L)}return(L,u)=>(l(),d("div",ln,[r("div",dn,[u[7]||(u[7]=r("div",{style:{"text-align":"center","margin-bottom":"2rem",color:"white"}},[r("i",{class:"pi pi-cog",style:{"font-size":"2.5rem","margin-bottom":"0.5rem"}}),r("h1",{style:{"font-size":"1.75rem","font-weight":"700"}},"Maint CMMS"),r("p",{style:{opacity:"0.8"}},"Computerized Maintenance Management System")],-1)),o.value.length>0?(l(),d(h,{key:0},[u[3]||(u[3]=r("h3",{style:{color:"white","margin-bottom":"1rem","text-align":"center"}},"Quick Login (Dev)",-1)),r("div",un,[(l(!0),d(h,null,A(o.value,b=>(l(),d(h,{key:b.tenantId},[(l(!0),d(h,null,A(b.roles,S=>(l(),d(h,{key:S.role},[(l(!0),d(h,null,A(S.users,O=>(l(),y(v(R),{key:O.id,class:"quick-login-card",onClick:fn=>C(O.id)},{title:p(()=>[r("div",cn,[u[2]||(u[2]=r("i",{class:"pi pi-user",style:{"font-size":"1.25rem"}},null,-1)),r("span",null,w(O.name),1)])]),content:p(()=>[r("p",pn,w(O.email),1),r("span",{class:F("p-tag p-tag-"+(S.role==="ADMIN"?"danger":S.role==="TECHNICIAN"?"info":"warn")),style:{"font-size":"0.75rem",padding:"0.15rem 0.5rem","border-radius":"4px"}},w(S.role),3)]),_:2},1032,["onClick"]))),128))],64))),128))],64))),128))])],64)):(l(),y(v(R),{key:1},{title:p(()=>[...u[4]||(u[4]=[r("h3",{style:{"text-align":"center"}},"Sign In",-1)])]),content:p(()=>[r("div",mn,[i.value?(l(),d("div",gn,[g(v(X),{severity:"error"},{default:p(()=>[pe(w(i.value),1)]),_:1})])):m("",!0),r("div",null,[u[5]||(u[5]=r("label",{style:{display:"block","margin-bottom":"0.25rem","font-size":"0.875rem"}},"Email",-1)),g(v(J),{modelValue:t.value,"onUpdate:modelValue":u[0]||(u[0]=b=>t.value=b),type:"email",placeholder:"Enter your email",style:{width:"100%"}},null,8,["modelValue"])]),r("div",null,[u[6]||(u[6]=r("label",{style:{display:"block","margin-bottom":"0.25rem","font-size":"0.875rem"}},"Password",-1)),g(v(ee),{modelValue:s.value,"onUpdate:modelValue":u[1]||(u[1]=b=>s.value=b),feedback:!1,placeholder:"Enter your password",style:{width:"100%"}},null,8,["modelValue"])]),g(v(he),{label:"Sign In",icon:"pi pi-sign-in",onClick:k,loading:f.value,style:{width:"100%"}},null,8,["loading"])])]),_:1}))])]))}});export{wn as default};
