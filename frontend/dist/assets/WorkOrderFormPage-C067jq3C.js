import{B as h,m as b,o as x,b as y,j as k,d as i,i as s,q as d,w,z as $,s as f,l as z}from"./index-BIqUsxCO.js";import{d as V,f as P,e as c,c as m}from"./index-BvAmfAC7.js";import{s as v}from"./index-Bx68vClb.js";import{s as S}from"./index-Dy_MTOne.js";import"./index-KVyqv-cF.js";var I=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`,T={root:function(e){var a=e.instance,n=e.props;return["p-textarea p-component",{"p-filled":a.$filled,"p-textarea-resizable ":n.autoResize,"p-textarea-sm p-inputfield-sm":n.size==="small","p-textarea-lg p-inputfield-lg":n.size==="large","p-invalid":a.$invalid,"p-variant-filled":a.$variant==="filled","p-textarea-fluid":a.$fluid}]}},B=h.extend({name:"textarea",style:I,classes:T}),R={name:"BaseTextarea",extends:V,props:{autoResize:Boolean},style:B,provide:function(){return{$pcTextarea:this,$parentInstance:this}}};function u(t){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(t)}function U(t,e,a){return(e=C(e))in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function C(t){var e=D(t,"string");return u(e)=="symbol"?e:e+""}function D(t,e){if(u(t)!="object"||!t)return t;var a=t[Symbol.toPrimitive];if(a!==void 0){var n=a.call(t,e);if(u(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var g={name:"Textarea",extends:R,inheritAttrs:!1,observer:null,mounted:function(){var e=this;this.autoResize&&(this.observer=new ResizeObserver(function(){requestAnimationFrame(function(){e.resize()})}),this.observer.observe(this.$el))},updated:function(){this.autoResize&&this.resize()},beforeUnmount:function(){this.observer&&this.observer.disconnect()},methods:{resize:function(){if(this.$el.offsetParent){var e=this.$el.style.height,a=parseInt(e)||0,n=this.$el.scrollHeight,p=!a||n>a,o=a&&n<a;o?(this.$el.style.height="auto",this.$el.style.height="".concat(this.$el.scrollHeight,"px")):p&&(this.$el.style.height="".concat(n,"px"))}},onInput:function(e){this.autoResize&&this.resize(),this.writeValue(e.target.value,e)}},computed:{attrs:function(){return b(this.ptmi("root",{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return P(U({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant==="filled"},this.size,this.size))}}},H=["value","name","disabled","aria-invalid","data-p"];function O(t,e,a,n,p,o){return x(),y("textarea",b({class:t.cx("root"),value:t.d_value,name:t.name,disabled:t.disabled,"aria-invalid":t.invalid||void 0,"data-p":o.dataP,onInput:e[0]||(e[0]=function(){return o.onInput&&o.onInput.apply(o,arguments)})},o.attrs),null,16,H)}g.render=O;const j={class:"page-header"},N={style:{display:"flex","flex-direction":"column",gap:"1rem","max-width":"600px"}},E={style:{display:"flex",gap:"1rem"}},F={style:{flex:"1"}},W={style:{flex:"1"}},L=k({__name:"WorkOrderFormPage",setup(t){const e=$(),a=f({title:"",description:"",type:"corrective",priority:"medium",assetId:null,siteId:null,targetDate:""}),n=f(!1);async function p(){n.value=!0;try{const{data:o}=await z.post("/v1/work-orders",a.value);e.push(`/app/work-orders/${o.id}`)}finally{n.value=!1}}return(o,r)=>(x(),y("div",null,[i("div",j,[r[6]||(r[6]=i("h1",null,"New Work Order",-1)),s(d(c),{label:"Cancel",text:"",onClick:r[0]||(r[0]=l=>d(e).back())})]),s(d(S),null,{content:w(()=>[i("div",N,[i("div",null,[r[7]||(r[7]=i("label",{style:{display:"block","margin-bottom":"0.25rem"}},"Title",-1)),s(d(m),{modelValue:a.value.title,"onUpdate:modelValue":r[1]||(r[1]=l=>a.value.title=l),style:{width:"100%"}},null,8,["modelValue"])]),i("div",null,[r[8]||(r[8]=i("label",{style:{display:"block","margin-bottom":"0.25rem"}},"Description",-1)),s(d(g),{modelValue:a.value.description,"onUpdate:modelValue":r[2]||(r[2]=l=>a.value.description=l),rows:"4",style:{width:"100%"}},null,8,["modelValue"])]),i("div",E,[i("div",F,[r[9]||(r[9]=i("label",{style:{display:"block","margin-bottom":"0.25rem"}},"Type",-1)),s(d(v),{modelValue:a.value.type,"onUpdate:modelValue":r[3]||(r[3]=l=>a.value.type=l),options:["corrective","preventive","predictive","emergency"],style:{width:"100%"}},null,8,["modelValue"])]),i("div",W,[r[10]||(r[10]=i("label",{style:{display:"block","margin-bottom":"0.25rem"}},"Priority",-1)),s(d(v),{modelValue:a.value.priority,"onUpdate:modelValue":r[4]||(r[4]=l=>a.value.priority=l),options:["low","medium","high","critical"],style:{width:"100%"}},null,8,["modelValue"])])]),i("div",null,[r[11]||(r[11]=i("label",{style:{display:"block","margin-bottom":"0.25rem"}},"Target Date",-1)),s(d(m),{modelValue:a.value.targetDate,"onUpdate:modelValue":r[5]||(r[5]=l=>a.value.targetDate=l),type:"date",style:{width:"100%"}},null,8,["modelValue"])]),s(d(c),{label:"Create Work Order",icon:"pi pi-check",onClick:p,loading:n.value,style:{width:"fit-content"}},null,8,["loading"])])]),_:1})]))}});export{L as default};
