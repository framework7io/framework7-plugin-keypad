import KeypadClassConstructor from './keypad-class';

let Keypad;
export default {
  name: 'keypad',
  install() {
    const Framework7 = this;
    Keypad = KeypadClassConstructor(Framework7.Class);
    Framework7.Keypad = Keypad;
  },
  params: {
    keypad: {
      type: 'numpad', // or 'calculator' or 'custom',
      openIn: 'auto', // or 'popover' or 'sheet'
      inputEl: null,
      containerEl: null,
      value: null,
      valueMaxLength: null,
      dotButton: true,
      dotCharacter: '.',
      buttons: [],
      closeByOutsideClick: true,
      scrollToInput: true,
      inputReadOnly: true,
      onlyInPopover: false,
      cssClass: null,
      toolbar: true,
      toolbarCloseText: 'Done',
      routableModals: true,
      view: null,
      url: 'select/',
      renderToolbar: null,
      renderPopover: null,
      renderSheet: null,
      renderInline: null,
      render: null,
    },
  },
  create() {
    const app = this;
    const $ = app.$;
    app.keypad = {
      create(params) {
        return new Keypad(app, params);
      },
      get(el = '.keypad') {
        if (el instanceof Keypad) return el;
        const $el = $(el);
        if ($el.length === 0) return undefined;
        return $el[0].f7Keypad;
      },
      destroy(el = '.keypad') {
        const instance = app.keypad.get(el);
        if (instance && instance.destroy) return instance.destroy();
        return undefined;
      },
      close(el = '.keypad') {
        const $el = $(el);
        if ($el.length === 0) return;
        const keypad = $el[0].f7Keypad;
        if (!keypad || (keypad && !keypad.opened)) return;
        keypad.close();
      },
    };
  },
  on: {
    pageInit(page) {
      const $ = page.app.$;
      const app = page.app;
      page.$el.find('input[type="numpad"], input[type="calculator"]').each((index, inputEl) => {
        const $inputEl = $(inputEl);
        const params = {
          inputEl,
          type: $inputEl.attr('type'),
          value: $inputEl.val() || 0,
        };
        if ($inputEl.attr('maxlength')) params.valueMaxLength = $inputEl.attr('maxlength');
        app.keypad.create(app.utils.extend(params, $inputEl.dataset()));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('input[type="numpad"], input[type="calculator"]').each((index, inputEl) => {
        page.app.keypad.destroy(inputEl);
      });
    },
  },
};
