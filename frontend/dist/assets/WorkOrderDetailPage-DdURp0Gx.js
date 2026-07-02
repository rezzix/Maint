import{B as y,o as p,b as h,e as g,m as b,d as o,R as P,C as X,E as B,G as Y,K as T,v as tt,V as K,a as F,h as x,c as C,f as A,g as L,H,J as et,Q as k,w as c,n as W,F as _,L as at,j as nt,k as rt,l as E,i as d,q as l,t as f,y as st,z as it,s as S,x as v}from"./index-BIqUsxCO.js";import{s as R}from"./index-Dy_MTOne.js";import{s as D}from"./index-9_xVR79h.js";import{a as ot,R as j,f as U,e as lt}from"./index-BvAmfAC7.js";import{b as ut,s as dt,a as w}from"./index-qwqAC3Sw.js";import{s as $}from"./index-KVyqv-cF.js";import"./index-Bx68vClb.js";var ct=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,bt={root:function(t){var a=t.props;return["p-tabs p-component",{"p-tabs-scrollable":a.scrollable}]}},pt=y.extend({name:"tabs",style:ct,classes:bt}),vt={name:"BaseTabs",extends:$,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:pt,provide:function(){return{$pcTabs:this,$parentInstance:this}}},M={name:"Tabs",extends:vt,inheritAttrs:!1,emits:["update:value"],data:function(){return{d_value:this.value}},watch:{value:function(t){this.d_value=t}},methods:{updateValue:function(t){this.d_value!==t&&(this.d_value=t,this.$emit("update:value",t))},isVertical:function(){return this.orientation==="vertical"}}};function ft(e,t,a,n,i,r){return p(),h("div",b({class:e.cx("root")},e.ptmi("root")),[g(e.$slots,"default")],16)}M.render=ft;var q={name:"ChevronLeftIcon",extends:ot};function ht(e){return $t(e)||yt(e)||mt(e)||gt()}function gt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function mt(e,t){if(e){if(typeof e=="string")return I(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?I(e,t):void 0}}function yt(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function $t(e){if(Array.isArray(e))return I(e)}function I(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,n=Array(t);a<t;a++)n[a]=e[a];return n}function Tt(e,t,a,n,i,r){return p(),h("svg",b({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),ht(t[0]||(t[0]=[o("path",{d:"M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",fill:"currentColor"},null,-1)])),16)}q.render=Tt;var kt={root:"p-tablist",content:"p-tablist-content p-tablist-viewport",tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},wt=y.extend({name:"tablist",classes:kt}),Bt={name:"BaseTabList",extends:$,props:{},style:wt,provide:function(){return{$pcTabList:this,$parentInstance:this}}},G={name:"TabList",extends:Bt,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,inkBarObserver:void 0,watch:{showNavigators:function(t){t?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar(),this.bindInkBarObserver()}}},mounted:function(){var t=this;setTimeout(function(){t.updateInkBar(),t.bindInkBarObserver()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver(),this.unbindInkBarObserver()},methods:{onScroll:function(t){this.showNavigators&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,a=this.getVisibleButtonWidths(),n=P(t)-a,i=Math.abs(t.scrollLeft),r=n*.8,u=i-r,s=Math.max(u,0);t.scrollLeft=K(t)?-1*s:s},onNextButtonClick:function(){var t=this.$refs.content,a=this.getVisibleButtonWidths(),n=P(t)-a,i=Math.abs(t.scrollLeft),r=n*.8,u=i+r,s=t.scrollWidth-n,m=Math.min(u,s);t.scrollLeft=K(t)?-1*m:m},bindResizeObserver:function(){var t=this;this.resizeObserver=new ResizeObserver(function(){return t.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var t;(t=this.resizeObserver)===null||t===void 0||t.unobserve(this.$refs.list),this.resizeObserver=void 0},bindInkBarObserver:function(){var t=this;this.unbindInkBarObserver();var a=this.$refs.content,n=B(a,'[data-pc-name="tab"][data-p-active="true"]');n&&(this.inkBarObserver=new ResizeObserver(function(){return t.updateInkBar()}),this.inkBarObserver.observe(n))},unbindInkBarObserver:function(){var t;(t=this.inkBarObserver)===null||t===void 0||t.disconnect(),this.inkBarObserver=void 0},updateInkBar:function(){var t=this.$refs,a=t.content,n=t.inkbar,i=t.tabs;if(n){var r=B(a,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(n.style.height=Y(r)+"px",n.style.top=T(r).top-T(i).top+"px"):(n.style.width=tt(r)+"px",n.style.left=T(r).left-T(i).left+"px")}},updateButtonState:function(){var t=this.$refs,a=t.list,n=t.content,i=n.scrollTop,r=n.scrollWidth,u=n.scrollHeight,s=n.offsetWidth,m=n.offsetHeight,V=Math.abs(n.scrollLeft),z=[P(n),X(n)],Q=z[0],Z=z[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=i!==0,this.isNextButtonEnabled=a.offsetHeight>=m&&parseInt(i)!==u-Z):(this.isPrevButtonEnabled=V!==0,this.isNextButtonEnabled=a.offsetWidth>=s&&parseInt(V)!==r-Q)},getVisibleButtonWidths:function(){var t=this.$refs,a=t.prevButton,n=t.nextButton,i=0;return this.showNavigators&&(i=((a==null?void 0:a.offsetWidth)||0)+((n==null?void 0:n.offsetWidth)||0)),i}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return U({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:q,ChevronRightIcon:ut},directives:{ripple:j}},xt=["data-p"],Ct=["aria-label","tabindex"],At=["data-p"],Lt=["aria-orientation"],Pt=["aria-label","tabindex"];function St(e,t,a,n,i,r){var u=F("ripple");return p(),h("div",b({ref:"list",class:e.cx("root"),"data-p":r.dataP},e.ptmi("root")),[r.showNavigators&&i.isPrevButtonEnabled?x((p(),h("button",b({key:0,ref:"prevButton",type:"button",class:e.cx("prevButton"),"aria-label":r.prevButtonAriaLabel,tabindex:r.$pcTabs.tabindex,onClick:t[0]||(t[0]=function(){return r.onPrevButtonClick&&r.onPrevButtonClick.apply(r,arguments)})},e.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(p(),C(A(r.templates.previcon||"ChevronLeftIcon"),b({"aria-hidden":"true"},e.ptm("prevIcon")),null,16))],16,Ct)),[[u]]):L("",!0),o("div",b({ref:"content",class:e.cx("content"),onScroll:t[1]||(t[1]=function(){return r.onScroll&&r.onScroll.apply(r,arguments)}),"data-p":r.dataP},e.ptm("content")),[o("div",b({ref:"tabs",class:e.cx("tabList"),role:"tablist","aria-orientation":r.$pcTabs.orientation||"horizontal"},e.ptm("tabList")),[g(e.$slots,"default"),o("span",b({ref:"inkbar",class:e.cx("activeBar"),role:"presentation","aria-hidden":"true"},e.ptm("activeBar")),null,16)],16,Lt)],16,At),r.showNavigators&&i.isNextButtonEnabled?x((p(),h("button",b({key:1,ref:"nextButton",type:"button",class:e.cx("nextButton"),"aria-label":r.nextButtonAriaLabel,tabindex:r.$pcTabs.tabindex,onClick:t[2]||(t[2]=function(){return r.onNextButtonClick&&r.onNextButtonClick.apply(r,arguments)})},e.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(p(),C(A(r.templates.nexticon||"ChevronRightIcon"),b({"aria-hidden":"true"},e.ptm("nextIcon")),null,16))],16,Pt)),[[u]]):L("",!0)],16,xt)}G.render=St;var It={root:function(t){var a=t.instance,n=t.props;return["p-tab",{"p-tab-active":a.active,"p-disabled":n.disabled}]}},Nt=y.extend({name:"tab",classes:It}),Ot={name:"BaseTab",extends:$,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:Nt,provide:function(){return{$pcTab:this,$parentInstance:this}}},N={name:"Tab",extends:Ot,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowRightKey:function(t){var a=this.findNextTab(t.currentTarget);a?this.changeFocusedTab(t,a):this.onHomeKey(t),t.preventDefault()},onArrowLeftKey:function(t){var a=this.findPrevTab(t.currentTarget);a?this.changeFocusedTab(t,a):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var a=this.findFirstTab();this.changeFocusedTab(t,a),t.preventDefault()},onEndKey:function(t){var a=this.findLastTab();this.changeFocusedTab(t,a),t.preventDefault()},onPageDownKey:function(t){this.scrollInView(this.findLastTab()),t.preventDefault()},onPageUpKey:function(t){this.scrollInView(this.findFirstTab()),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue()},findNextTab:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?t:t.nextElementSibling;return n?k(n,"data-p-disabled")||k(n,"data-pc-section")==="activebar"?this.findNextTab(n):B(n,'[data-pc-name="tab"]'):null},findPrevTab:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?t:t.previousElementSibling;return n?k(n,"data-p-disabled")||k(n,"data-pc-section")==="activebar"?this.findPrevTab(n):B(n,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(t,a){et(a),this.scrollInView(a)},scrollInView:function(t){var a;t==null||(a=t.scrollIntoView)===null||a===void 0||a.call(t,{block:"nearest"})}},computed:{active:function(){var t;return H((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tab_").concat(this.value)},ariaControls:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tabpanel_").concat(this.value)},attrs:function(){return b(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return U({active:this.active})}},directives:{ripple:j}};function Vt(e,t,a,n,i,r){var u=F("ripple");return e.asChild?g(e.$slots,"default",{key:1,dataP:r.dataP,class:W(e.cx("root")),active:r.active,a11yAttrs:r.a11yAttrs,onClick:r.onClick}):x((p(),C(A(e.as),b({key:0,class:e.cx("root"),"data-p":r.dataP,onClick:r.onClick},r.attrs),{default:c(function(){return[g(e.$slots,"default")]}),_:3},16,["class","data-p","onClick"])),[[u]])}N.render=Vt;var zt={root:"p-tabpanels"},Kt=y.extend({name:"tabpanels",classes:zt}),_t={name:"BaseTabPanels",extends:$,props:{},style:Kt,provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},J={name:"TabPanels",extends:_t,inheritAttrs:!1};function Et(e,t,a,n,i,r){return p(),h("div",b({class:e.cx("root"),role:"presentation"},e.ptmi("root")),[g(e.$slots,"default")],16)}J.render=Et;var Rt={root:function(t){var a=t.instance;return["p-tabpanel",{"p-tabpanel-active":a.active}]}},Dt=y.extend({name:"tabpanel",classes:Rt}),Ft={name:"BaseTabPanel",extends:$,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:Dt,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},O={name:"TabPanel",extends:Ft,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var t;return H((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tab_").concat(this.value)},attrs:function(){return b(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var t;return{id:this.id,tabindex:(t=this.$pcTabs)===null||t===void 0?void 0:t.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function Ht(e,t,a,n,i,r){var u,s;return r.$pcTabs?(p(),h(_,{key:1},[e.asChild?g(e.$slots,"default",{key:1,class:W(e.cx("root")),active:r.active,a11yAttrs:r.a11yAttrs}):(p(),h(_,{key:0},[!((u=r.$pcTabs)!==null&&u!==void 0&&u.lazy)||r.active?x((p(),C(A(e.as),b({key:0,class:e.cx("root")},r.attrs),{default:c(function(){return[g(e.$slots,"default")]}),_:3},16,["class"])),[[at,(s=r.$pcTabs)!==null&&s!==void 0&&s.lazy?!0:r.active]]):L("",!0)],64))],64)):g(e.$slots,"default",{key:0})}O.render=Ht;const Wt={key:0},jt={class:"page-header"},Ut={style:{display:"flex","align-items":"center",gap:"0.75rem"}},Mt={style:{display:"grid","grid-template-columns":"1fr 1fr",gap:"1rem","margin-bottom":"1.5rem"}},te=nt({__name:"WorkOrderDetailPage",setup(e){const t=st(),a=it(),n=S({}),i=S([]),r=S(!0);return rt(async()=>{try{const{data:u}=await E.get(`/v1/work-orders/${t.params.id}`);n.value=u;const{data:s}=await E.get(`/v1/work-orders/${t.params.id}/tasks`);i.value=s}finally{r.value=!1}}),(u,s)=>r.value?L("",!0):(p(),h("div",Wt,[o("div",jt,[o("div",Ut,[d(l(lt),{icon:"pi pi-arrow-left",text:"",rounded:"",onClick:s[0]||(s[0]=m=>l(a).push("/app/work-orders"))}),o("h1",null,f(n.value.woNumber||"Loading..."),1),d(l(D),{value:n.value.status},null,8,["value"])])]),o("div",Mt,[d(l(R),null,{title:c(()=>[...s[1]||(s[1]=[v("Details",-1)])]),content:c(()=>[o("p",null,[s[2]||(s[2]=o("strong",null,"Title:",-1)),v(" "+f(n.value.title),1)]),o("p",null,[s[3]||(s[3]=o("strong",null,"Type:",-1)),v(" "+f(n.value.type),1)]),o("p",null,[s[4]||(s[4]=o("strong",null,"Priority:",-1)),v(" "+f(n.value.priority),1)]),o("p",null,[s[5]||(s[5]=o("strong",null,"Target Date:",-1)),v(" "+f(n.value.targetDate),1)])]),_:1}),d(l(R),null,{title:c(()=>[...s[6]||(s[6]=[v("Assignment",-1)])]),content:c(()=>[o("p",null,[s[7]||(s[7]=o("strong",null,"Status:",-1)),v(" "+f(n.value.status),1)]),o("p",null,[s[8]||(s[8]=o("strong",null,"Estimated Hours:",-1)),v(" "+f(n.value.estimatedHours),1)]),o("p",null,[s[9]||(s[9]=o("strong",null,"Actual Hours:",-1)),v(" "+f(n.value.actualHours),1)])]),_:1})]),d(l(M),{value:"0"},{default:c(()=>[d(l(G),null,{default:c(()=>[d(l(N),{value:"0"},{default:c(()=>[...s[10]||(s[10]=[v("Tasks",-1)])]),_:1}),d(l(N),{value:"1"},{default:c(()=>[...s[11]||(s[11]=[v("Description",-1)])]),_:1})]),_:1}),d(l(J),null,{default:c(()=>[d(l(O),{value:"0"},{default:c(()=>[d(l(dt),{value:i.value},{default:c(()=>[d(l(w),{field:"sequence",header:"#",style:{width:"60px"}}),d(l(w),{field:"description",header:"Task"}),d(l(w),{field:"status",header:"Status"},{body:c(({data:m})=>[d(l(D),{value:m.status},null,8,["value"])]),_:1}),d(l(w),{field:"estimatedHours",header:"Est. Hours"})]),_:1},8,["value"])]),_:1}),d(l(O),{value:"1"},{default:c(()=>[o("p",null,f(n.value.description||"No description provided."),1)]),_:1})]),_:1})]),_:1})]))}});export{te as default};
