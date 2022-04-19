const H=function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&t(p)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}};H();function L(o){return class g extends o{constructor(e,t){super(t,[e]);const a=e.utils,s=e.$,p=e.request,n=this;n.app=e;const d=a.extend({on:{}},e.params.keypad);n.params=a.extend(d,t);let u;if(n.params.containerEl&&(u=s(n.params.containerEl),u.length===0))return n;if(!n.params.buttons||n.params.buttons.length===0){const{dotCharacter:r,dotButton:i}=n.params;n.params.type==="numpad"?n.params.buttons=[{html:'<span class="keypad-button-number">1</span><span class="keypad-button-letters"></span>',value:1},{html:'<span class="keypad-button-number">2</span><span class="keypad-button-letters">ABC</span>',value:2},{html:'<span class="keypad-button-number">3</span><span class="keypad-button-letters">DEF</span>',value:3},{html:'<span class="keypad-button-number">4</span><span class="keypad-button-letters">GHI</span>',value:4},{html:'<span class="keypad-button-number">5</span><span class="keypad-button-letters">JKL</span>',value:5},{html:'<span class="keypad-button-number">6</span><span class="keypad-button-letters">MNO</span>',value:6},{html:'<span class="keypad-button-number">7</span><span class="keypad-button-letters">PQRS</span>',value:7},{html:'<span class="keypad-button-number">8</span><span class="keypad-button-letters">TUV</span>',value:8},{html:'<span class="keypad-button-number">9</span><span class="keypad-button-letters">WXYZ</span>',value:9},{html:i?`<span class="keypad-button-number">${r}</span>`:"",value:i?r:void 0,dark:!0,cssClass:i?"":"keypad-dummy-button"},{html:'<span class="keypad-button-number">0</span>',value:0},{html:'<i class="icon icon-keypad-delete"></i>',cssClass:"keypad-delete-button",dark:!0}]:t.type==="calculator"&&(n.params.buttons=[{html:'<span class="keypad-button-number">C</span>',value:"C",dark:!0},{html:'<span class="keypad-button-number">\xB1</span>',value:"\xB1",dark:!0},{html:'<span class="keypad-button-number">%</span>',value:"%",dark:!0},{html:'<span class="keypad-button-number">\xF7</span>',value:"\xF7",cssClass:"calc-operator-button"},{html:'<span class="keypad-button-number">7</span>',value:7},{html:'<span class="keypad-button-number">8</span>',value:8},{html:'<span class="keypad-button-number">9</span>',value:9},{html:'<span class="keypad-button-number">\xD7</span>',value:"\xD7",cssClass:"calc-operator-button"},{html:'<span class="keypad-button-number">4</span>',value:4},{html:'<span class="keypad-button-number">5</span>',value:5},{html:'<span class="keypad-button-number">6</span>',value:6},{html:'<span class="keypad-button-number">-</span>',value:"-",cssClass:"calc-operator-button"},{html:'<span class="keypad-button-number">1</span>',value:1},{html:'<span class="keypad-button-number">2</span>',value:2},{html:'<span class="keypad-button-number">3</span>',value:3},{html:'<span class="keypad-button-number">+</span>',value:"+",cssClass:"calc-operator-button"},{html:'<span class="keypad-button-number">0</span>',value:0,cssClass:"keypad-button-double"},{html:'<span class="keypad-button-number">.</span>',value:r},{html:'<span class="keypad-button-number">=</span>',value:"=",cssClass:"calc-operator-button calc-operator-button-equal"}])}let l;n.params.inputEl&&(l=s(n.params.inputEl));let c;n.params.view?c=n.params.view:l&&l.length?c=l.parents(".view").length&&l.parents(".view")[0].f7View:c=e.views.get(l),c||(c=e.views.main),a.extend(n,{app:e,request:p,$containerEl:u,containerEl:u&&u[0],inline:u&&u.length>0,$inputEl:l,inputEl:l&&l[0],initialized:!1,opened:!1,view:c,url:n.params.url,calcValues:[],calcOperations:[],lastWasNumber:!1});function m(){n.open()}function O(r){r.preventDefault()}function C(r){const i=s(r.target);n.isPopover()||!n.opened||i.closest('[class*="backdrop"]').length||(l&&l.length>0?i[0]!==l[0]&&i.closest(".sheet-modal, .keypad-modal").length===0&&n.close():s(r.target).closest(".sheet-modal, .keypad-modal").length===0&&n.close())}a.extend(n,{attachInputEvents(){n.$inputEl.on("click",m),n.params.inputReadOnly&&n.$inputEl.on("focus mousedown",O)},detachInputEvents(){n.$inputEl.off("click",m),n.params.inputReadOnly&&n.$inputEl.off("focus mousedown",O)},attachHtmlEvents(){e.on("click",C)},detachHtmlEvents(){e.off("click",C)}});function w(r){if(r.length===0)return;const i=n.params.buttons[r.index()];let y=i.value,h=n.value;n.params.type==="numpad"&&(typeof h=="undefined"&&(h=""),r.hasClass("keypad-delete-button")?h=h.substring(0,h.length-1):typeof y!="undefined"&&(y==="."&&h.indexOf(".")>=0&&(y=""),h+=y),typeof h!="undefined"&&n.setValue(h)),n.params.type==="calculator"&&(n.calculator(i.value),n.$el.find(".keypad-buttons").find(".calc-operator-active").removeClass("calc-operator-active"),r.hasClass("calc-operator-button")&&!r.hasClass("calc-operator-button-equal")&&r.addClass("calc-operator-active")),n.emit("local::buttonClick keypadButtonClick",n,i),i.onClick&&i.onClick(n,i)}function V(r){const i=s(r.target).closest(".keypad-button");!i.length||w(i)}let I,b,v,T,x;const K=10;function B(r){if(b||v)return;const i=s(r.target).closest(".keypad-button");!i.length||(I=i,b=!0,T=r.targetTouches[0].pageX,x=r.targetTouches[0].pageY)}function M(r){if(!b)return;const i=(r.targetTouches[0]||r.changedTouches[0]).pageX,y=(r.targetTouches[0]||r.changedTouches[0]).pageY;(Math.abs(i-T)>K||Math.abs(y-x)>K)&&(v=!0)}function P(){if(!!b){if(v){b=!1,v=!1;return}b=!1,v=!1,w(I)}}return n.attachKeypadEvents=function(){const i=n.$el.find(".keypad-buttons");e.support.touch?(i.on(e.touchEvents.start,B),e.on("touchmove",M),e.on("touchend",P)):i.on("click",V),n.detachKeypadEvents=function(){e.support.touch?(i.off(e.touchEvents.start,B),e.off("touchmove",M),e.off("touchend",P)):i.off("click",V)}},l&&l.length&&(l[0].f7Keypad=g),u&&u.length&&(u[0].f7Keypad=g),n.init(),n}initInput(){const e=this;!e.$inputEl||e.params.inputReadOnly&&e.$inputEl.prop("readOnly",!0)}isPopover(){const e=this,{app:t,modal:a,params:s}=e;if(s.openIn==="sheet"||a&&a.type!=="popover")return!1;if(!e.inline&&e.inputEl){if(s.openIn==="popover")return!0;if(t.device.ios)return!!t.device.ipad;if(t.width>=768)return!0}return!1}calculator(e){const t=this,a="+ - = \xD7 \xF7 \xB1 %".split(" "),s=[0,1,2,3,4,5,6,7,8,9,"."],p="C",n="\xB1",d="%";function u(){let l="";for(let c=0;c<t.calcOperations.length;c+=1){let m=t.calcOperations[c];c===t.calcOperations.length-1&&a.indexOf(m)>=0||m&&(m==="."&&(m=0),l+=`${m.toString()}`.replace("\xD7","*").replace("\xF7","/"))}l=l.replace(/--/g,"+"),t.setValue(eval.call(window,l))}if(t.value||(t.value=0),e===p){t.setValue(0),t.calcValues=[],t.calcOperations=[];return}if(s.indexOf(e)>=0){if(e==="."&&t.lastWasNumber&&t.value.toString().indexOf(".")>=0)return;a.indexOf(t.calcValues[t.calcValues.length-1])>=0?t.setValue(e):t.setValue(t.value?`${t.value}${e}`:e),t.lastWasNumber=!0}if(a.indexOf(e)>=0)if(e===n){if(t.value===".")return;t.setValue(-1*t.value),t.lastWasNumber=!0}else if(e===d){if(t.calcOperations[t.calcOperations.length-2]){const l=t.value/100;t.setValue(t.calcOperations[t.calcOperations.length-2]*l)}t.lastWasNumber=!0}else{const l=t.calcOperations[t.calcOperations.length-1];if(e==="="){if(t.calcOperations[t.calcOperations.length-1]==="="){if(t.calcOperations.length<2)return;t.calcOperations.pop();const c=t.calcOperations[t.calcOperations.length-2],m=t.calcOperations[t.calcOperations.length-1];t.calcOperations.push(c),t.calcOperations.push(m)}else t.calcOperations.push(t.value);t.calcOperations.push("="),u()}else["-","+","\xD7","\xF7","="].indexOf(l)>=0?(l==="="&&(t.calcOperations=[t.value,e]),["-","+","\xD7","\xF7"].indexOf(l)>=0&&(t.lastWasNumber?["-","+"].indexOf(l)>=0&&["\xD7","\xF7"].indexOf(e)>=0?(t.calcOperations.push(t.value),t.calcOperations.push(e)):(t.calcOperations.push(t.value),t.calcOperations.push(e),u()):t.calcOperations[t.calcOperations.length-1]=e)):(t.calcOperations.push(t.value),t.calcOperations.push(e),u());t.lastWasNumber=!1}e!==n&&e!==d&&t.calcValues.push(e)}formatValue(e){const t=this;return t.params.formatValue?t.params.formatValue.call(t,e):e}setValue(e){this.updateValue(e)}getValue(){return this.value}updateValue(e){const t=this;t.value=e,t.params.valueMaxLength&&t.value.length>t.params.valueMaxLength&&(t.value=t.value.substring(0,t.params.valueMaxLength)),t.emit("local::change keypadChange",t,t.value),t.$inputEl&&t.$inputEl.length>0&&(t.$inputEl.val(t.formatValue(t.value)),t.$inputEl.trigger("change"))}renderButtons(){const e=this;let t="",a,s;for(let p=0;p<e.params.buttons.length;p+=1)s=e.params.buttons[p],a="keypad-button",s.dark&&(a+=" keypad-button-dark"),s.cssClass&&(a+=` ${s.cssClass}`),t+=`<span class="${a}">${s.html||""}</span>`;return t}renderToolbar(){const e=this;return e.params.renderToolbar?e.params.renderToolbar.call(e,e):`
        <div class="toolbar">
          <div class="toolbar-inner">
            <div class="left"></div>
            <div class="right">
              <a href="#" class="link sheet-close popover-close">${e.params.toolbarCloseText}</a>
            </div>
          </div>
        </div>
      `.trim()}renderSheet(){const e=this;if(e.params.renderSheet)return e.params.renderSheet.call(e,e);const{cssClass:t,toolbar:a}=e.params;return`
        <div class="sheet-modal keypad keypad-sheet keypad-type-${e.params.type} ${t||""}">
          ${a?e.renderToolbar():""}
          <div class="sheet-modal-inner keypad-buttons">
            ${e.renderButtons()}
          </div>
        </div>
      `}renderPopover(){const e=this;if(e.params.renderPopover)return e.params.renderPopover.call(e,e);const{cssClass:t,toolbar:a}=e.params;return`
        <div class="popover keypad-popover">
          <div class="popover-inner">
            <div class="keypad keypad-type-${e.params.type} ${t||""}">
              ${a?e.renderToolbar():""}
              <div class="keypad-buttons">
                ${e.renderButtons()}
              </div>
            </div>
          </div>
        </div>
      `.trim()}renderInline(){const e=this;if(e.params.renderInline)return e.params.renderInline.call(e,e);const{cssClass:t,toolbar:a}=e.params;return`
        <div class="keypad keypad-inline keypad-type-${e.params.type} ${t||""}">
          ${a?e.renderToolbar():""}
          <div class="keypad-buttons">
            ${e.renderButtons()}
          </div>
        </div>
      `}render(){const e=this,{params:t}=e;if(t.render)return t.render.call(e);if(!e.inline){let a=t.openIn;if(a==="auto"&&(a=e.isPopover()?"popover":"sheet"),a==="popover")return e.renderPopover();if(a==="sheet")return e.renderSheet()}return e.renderInline()}onOpen(){const e=this,{initialized:t,$el:a,app:s,$inputEl:p,inline:n,value:d,params:u}=e;e.opened=!0,e.attachKeypadEvents(),t?d&&e.setValue(d):d?e.setValue(d):u.value&&e.setValue(u.value),!n&&p.length&&s.theme==="md"&&p.trigger("focus"),e.initialized=!0,a&&a.trigger("keypad:open",e),p&&p.trigger("keypad:open",e),e.emit("local::open keypadOpen",e)}onOpened(){const e=this;e.$el&&e.$el.trigger("keypad:opened",e),e.$inputEl&&e.$inputEl.trigger("keypad:opened",e),e.emit("local::opened keypadOpened",e)}onClose(){const e=this,t=e.app;e.$inputEl&&t.theme==="md"&&e.$inputEl.trigger("blur"),e.detachKeypadEvents&&e.detachKeypadEvents(),e.$el&&e.$el.trigger("keypad:close",e),e.$inputEl&&e.$inputEl.trigger("keypad:close",e),e.emit("local::close keypadClose",e)}onClosed(){const e=this;e.opened=!1,e.inline||e.app.utils.nextTick(()=>{e.modal&&e.modal.el&&e.modal.destroy&&(e.params.routableModals||e.modal.destroy()),delete e.modal}),e.$el&&e.$el.trigger("keypad:closed",e),e.$inputEl&&e.$inputEl.trigger("keypad:closed",e),e.emit("local::closed keypadClosed",e)}open(){const e=this,{app:t,opened:a,inline:s,$inputEl:p,params:n}=e;if(a)return;if(s){e.$el=t.$(e.render()),e.$el[0].f7Keypad=e,e.$containerEl.append(e.$el),e.onOpen(),e.onOpened();return}let d=n.openIn;d==="auto"&&(d=e.isPopover()?"popover":"sheet");const u=e.render(),l={targetEl:p,scrollToEl:e.params.scrollToInput?p:void 0,content:u,backdrop:typeof e.params.backdrop=="undefined"?d!=="sheet":e.params.backdrop,on:{open(){const c=this;e.modal=c,e.$el=d==="popover"?c.$el.find(".keypad"):c.$el,e.$el[0].f7Keypad=e,e.onOpen()},opened(){e.onOpened()},close(){e.onClose()},closed(){e.onClosed()}}};e.params.routableModals?e.view.router.navigate({url:e.url,route:{path:e.url,[d]:l}}):(e.modal=t[d].create(l),e.modal.open())}close(){const e=this,{opened:t,inline:a}=e;if(!!t){if(a){e.onClose(),e.onClosed();return}e.params.routableModals?e.view.router.back():e.modal.close()}}init(){const e=this;if(e.initInput(),e.inline){e.open(),e.emit("local::init keypadInit",e);return}!e.initialized&&e.params.value&&e.setValue(e.params.value),e.$inputEl&&e.attachInputEvents(),e.params.closeByOutsideClick&&e.attachHtmlEvents(),e.emit("local::init keypadInit",e)}destroy(){const e=this;if(e.destroyed)return;const{$el:t}=e;e.emit("local::beforeDestroy keypadBeforeDestroy",e),t&&t.trigger("keypad:beforedestroy",e),e.close(),e.$inputEl&&e.detachInputEvents(),e.params.closeByOutsideClick&&e.detachHtmlEvents(),t&&t.length&&delete e.$el[0].f7Keypad,e.app.utils.deleteProps(e),e.destroyed=!0}}}let k;var N={name:"keypad",install(){const o=this;k=L(o.Class),o.Keypad=k},params:{keypad:{type:"numpad",openIn:"auto",backdrop:void 0,inputEl:null,containerEl:null,value:null,valueMaxLength:null,dotButton:!0,dotCharacter:".",buttons:[],closeByOutsideClick:!0,scrollToInput:!0,inputReadOnly:!0,onlyInPopover:!1,cssClass:null,toolbar:!0,toolbarCloseText:"Done",routableModals:!0,view:null,url:"select/",renderToolbar:null,renderPopover:null,renderSheet:null,renderInline:null,render:null}},create(){const o=this,f=o.$;o.keypad={create(e){return new k(o,e)},get(e=".keypad"){if(e instanceof k)return e;const t=f(e);if(t.length!==0)return t[0].f7Keypad},destroy(e=".keypad"){const t=o.keypad.get(e);if(t&&t.destroy)return t.destroy()},close(e=".keypad"){const t=f(e);if(t.length===0)return;const a=t[0].f7Keypad;!a||a&&!a.opened||a.close()}}},on:{pageInit(o){const f=o.app.$,e=o.app;o.$el.find('input[type="numpad"], input[type="calculator"]').each(t=>{const a=f(t),s={inputEl:t,type:a.attr("type"),value:a.val()||0};a.attr("maxlength")&&(s.valueMaxLength=a.attr("maxlength")),e.keypad.create(e.utils.extend(s,a.dataset()))})},pageBeforeRemove(o){o.$el.find('input[type="numpad"], input[type="calculator"]').each(f=>{o.app.keypad.destroy(f)})}}};function S(){return function(o){o.$;var f=o.$h;return o.$root,o.$f7,o.$f7route,o.$f7router,o.$theme,o.$update,o.$store,f`
  <div class="page" data-page="calculator">
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding">
        <div class="left">
          <a href="index.html" class="back link">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        <div class="title">Automatic Initialization</div>
      </div>
    </div>
    <div class="page-content">
      <div class="block block-strong">
        <p>Such predefined Numpad and Calculator keypads could be initialized automatically. Just use usual inputs but
          with special <code>type</code> attributes:<br />
          <b>${"<"}input type="numpad" ${">"}</b><br />
          <b>${"<"}input type="calculator" ${">"}</b>
        </p>
      </div>
      <div class="block-title">Numpad</div>
      <div class="list">
        <ul>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-input-wrap">
                  <input type="numpad" placeholder="Enter number" readonly="readonly" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="block-title">Calculator</div>
      <div class="list">
        <ul>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-input-wrap">
                  <input type="calculator" data-toolbar="false" placeholder="Calc something" readonly="readonly" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
`}}S.id="6e946cf6da";function $(o,f){const{$on:e,$f7:t}=f;return e("pageInit",()=>{t.keypad.create({inputEl:"#demo-numpad-inline",containerEl:"#numpad-inline-container",toolbar:!1,valueMaxLength:4,dotButton:!1,formatValue:function(a){return a=a.toString(),"****".substring(0,a.length)+"____".substring(0,4-a.length)},on:{change(a,s){console.log(a,s),s=s.toString(),s.length===4&&t.dialog.alert("Thank you! Your passcode is<br><b>"+s+"</b>",function(){t.views.main.router.back()})}}})}),function(a){a.$;var s=a.$h;return a.$root,a.$f7,a.$f7route,a.$f7router,a.$theme,a.$update,a.$store,s`
  <div class="page no-swipeback">
    <div class="page-content login-screen-content">
      <div class="login-screen-title">Ented Passcode</div>
      <form>
        <div class="block passcode-input">
          <input type="text" value="____" id="demo-numpad-inline" />
        </div>
        <div class="block block-strong no-padding no-margin passcode-numpad">
          <div id="numpad-inline-container"></div>
        </div>
      </form>
    </div>
  </div>
`}}$.id="0bcf995735";$.style=`
  .block.passcode-input {
    position: relative;
    z-index: 5;
  }

  .block.passcode-numpad {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    max-width: none;
    z-index: 10;
  }

  #demo-numpad-inline {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border: none;
    background: none;
    border-radius: 0 0 0 0;
    box-shadow: none;
    display: block;
    padding: 0 0 0 5px;
    margin: 0;
    width: 100%;
    height: 43px;
    color: #000;
    font-family: inherit;
    letter-spacing: 5px;
    text-align: center;
    font-size: 25px;
    font-weight: 300;
  }
`;Framework7.use(N);const E=new Framework7({el:"#app",routes:[{path:"/passcode/",component:$},{path:"/auto-init/",component:S}]});E.keypad.create({inputEl:"#demo-numpad",dark:!0});E.keypad.create({inputEl:"#demo-numpad-limited",valueMaxLength:2,dotButton:!1});E.keypad.create({inputEl:"#demo-calculator",type:"calculator",toolbar:!1});
