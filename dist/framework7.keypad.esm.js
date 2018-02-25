/**
 * Framework7 Plugin Keypad 2.0.0
 * Keypad plugin extends Framework7 with additional custom keyboards
 * http://framework7.io/plugins/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 25, 2018
 */

var KeypadClassConstructor = function (Framework7Class) {
  return class Keypad extends Framework7Class {
    constructor(app, params) {
      super(params, [app]);

      const Utils = app.utils;
      const $ = app.$;
      const request = app.request;

      const keypad = this;
      keypad.app = app;

      const defaults = Utils.extend({
        on: {},
      }, app.params.keypad);

      keypad.params = Utils.extend(defaults, params);

      let $containerEl;

      if (keypad.params.containerEl) {
        $containerEl = $(keypad.params.containerEl);
        if ($containerEl.length === 0) return keypad;
      }

      if (!keypad.params.buttons || keypad.params.buttons.length === 0) {
        const { dotCharacter, dotButton } = keypad.params;
        if (keypad.params.type === 'numpad') {
          keypad.params.buttons = [
            {
              html: '<span class="keypad-button-number">1</span><span class="keypad-button-letters"></span>',
              value: 1,
            },
            {
              html: '<span class="keypad-button-number">2</span><span class="keypad-button-letters">ABC</span>',
              value: 2,
            },
            {
              html: '<span class="keypad-button-number">3</span><span class="keypad-button-letters">DEF</span>',
              value: 3,
            },
            {
              html: '<span class="keypad-button-number">4</span><span class="keypad-button-letters">GHI</span>',
              value: 4,
            },
            {
              html: '<span class="keypad-button-number">5</span><span class="keypad-button-letters">JKL</span>',
              value: 5,
            },
            {
              html: '<span class="keypad-button-number">6</span><span class="keypad-button-letters">MNO</span>',
              value: 6,
            },
            {
              html: '<span class="keypad-button-number">7</span><span class="keypad-button-letters">PQRS</span>',
              value: 7,
            },
            {
              html: '<span class="keypad-button-number">8</span><span class="keypad-button-letters">TUV</span>',
              value: 8,
            },
            {
              html: '<span class="keypad-button-number">9</span><span class="keypad-button-letters">WXYZ</span>',
              value: 9,
            },
            {
              html: dotButton ? `<span class="keypad-button-number">${dotCharacter}</span>` : '',
              value: dotButton ? dotCharacter : undefined,
              dark: true,
              cssClass: dotButton ? '' : 'keypad-dummy-button',
            },
            {
              html: '<span class="keypad-button-number">0</span>',
              value: 0,
            },
            {
              html: '<i class="icon icon-keypad-delete"></i>',
              cssClass: 'keypad-delete-button',
              dark: true,
            },
          ];
        } else if (params.type === 'calculator') {
          keypad.params.buttons = [
            {
              html: '<span class="keypad-button-number">C</span>',
              value: 'C',
              dark: true,
            },
            {
              html: '<span class="keypad-button-number">±</span>',
              value: '±',
              dark: true,
            },
            {
              html: '<span class="keypad-button-number">%</span>',
              value: '%',
              dark: true,
            },
            {
              html: '<span class="keypad-button-number">÷</span>',
              value: '÷',
              cssClass: 'calc-operator-button',

            },
            {
              html: '<span class="keypad-button-number">7</span>',
              value: 7,
            },
            {
              html: '<span class="keypad-button-number">8</span>',
              value: 8,
            },
            {
              html: '<span class="keypad-button-number">9</span>',
              value: 9,
            },
            {
              html: '<span class="keypad-button-number">×</span>',
              value: '×',
              cssClass: 'calc-operator-button',
            },
            {
              html: '<span class="keypad-button-number">4</span>',
              value: 4,
            },
            {
              html: '<span class="keypad-button-number">5</span>',
              value: 5,
            },
            {
              html: '<span class="keypad-button-number">6</span>',
              value: 6,
            },
            {
              html: '<span class="keypad-button-number">-</span>',
              value: '-',
              cssClass: 'calc-operator-button',
            },
            {
              html: '<span class="keypad-button-number">1</span>',
              value: 1,
            },
            {
              html: '<span class="keypad-button-number">2</span>',
              value: 2,
            },
            {
              html: '<span class="keypad-button-number">3</span>',
              value: 3,
            },
            {
              html: '<span class="keypad-button-number">+</span>',
              value: '+',
              cssClass: 'calc-operator-button',
            },
            {
              html: '<span class="keypad-button-number">0</span>',
              value: 0,
              cssClass: 'keypad-button-double',
            },
            {
              html: '<span class="keypad-button-number">.</span>',
              value: dotCharacter,
            },
            {
              html: '<span class="keypad-button-number">=</span>',
              value: '=',
              cssClass: 'calc-operator-button calc-operator-button-equal',
            },
          ];
        }
      }

      let $inputEl;
      if (keypad.params.inputEl) {
        $inputEl = $(keypad.params.inputEl);
      }

      let view;
      if (keypad.params.view) {
        view = keypad.params.view;
      } else if ($inputEl && $inputEl.length) {
        view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
      } else {
        view = app.views.get($inputEl);
      }
      if (!view) view = app.views.main;

      Utils.extend(keypad, {
        app,
        request,
        $containerEl,
        containerEl: $containerEl && $containerEl[0],
        inline: $containerEl && $containerEl.length > 0,
        $inputEl,
        inputEl: $inputEl && $inputEl[0],
        initialized: false,
        opened: false,
        view,
        url: keypad.params.url,
        calcValues: [],
        calcOperations: [],
        lastWasNumber: false,
      });

      // Events
      function onInputClick() {
        keypad.open();
      }
      function onInputFocus(e) {
        e.preventDefault();
      }
      function onHtmlClick(e) {
        const $targetEl = $(e.target);
        if (keypad.isPopover()) return;
        if (!keypad.opened) return;
        if ($targetEl.closest('[class*="backdrop"]').length) return;
        if ($inputEl && $inputEl.length > 0) {
          if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal, .keypad-modal').length === 0) {
            keypad.close();
          }
        } else if ($(e.target).closest('.sheet-modal, .keypad-modal').length === 0) {
          keypad.close();
        }
      }
      Utils.extend(keypad, {
        attachInputEvents() {
          keypad.$inputEl.on('click', onInputClick);
          if (keypad.params.inputReadOnly) {
            keypad.$inputEl.on('focus mousedown', onInputFocus);
          }
        },
        detachInputEvents() {
          keypad.$inputEl.off('click', onInputClick);
          if (keypad.params.inputReadOnly) {
            keypad.$inputEl.off('focus mousedown', onInputFocus);
          }
        },
        attachHtmlEvents() {
          app.on('click', onHtmlClick);
        },
        detachHtmlEvents() {
          app.off('click', onHtmlClick);
        },
      });


      keypad.attachKeypadEvents = function attachKeypadEvents() {
        const $buttonsEl = keypad.$el.find('.keypad-buttons');

        function handleClick(e) {
          let $buttonEl = $(e.target);
          if (!$buttonEl.hasClass('keypad-button')) {
            $buttonEl = $buttonEl.parents('.keypad-button');
          }
          if ($buttonEl.length === 0) return;
          const button = keypad.params.buttons[$buttonEl.index()];
          let buttonValue = button.value;
          let currentValue = keypad.value;

          if (keypad.params.type === 'numpad') {
            if (typeof currentValue === 'undefined') currentValue = '';
            if ($buttonEl.hasClass('keypad-delete-button')) {
              currentValue = currentValue.substring(0, currentValue.length - 1);
            } else if (typeof buttonValue !== 'undefined') {
              if (buttonValue === '.' && currentValue.indexOf('.') >= 0) {
                buttonValue = '';
              }
              currentValue += buttonValue;
            }
            if (typeof currentValue !== 'undefined') keypad.setValue(currentValue);
          }
          if (keypad.params.type === 'calculator') {
            keypad.calculator(button.value);
            $buttonsEl.find('.calc-operator-active').removeClass('calc-operator-active');
            if ($buttonEl.hasClass('calc-operator-button') && !$buttonEl.hasClass('calc-operator-button-equal')) {
              $buttonEl.addClass('calc-operator-active');
            }
          }
          keypad.emit('local::buttonClick keypadButtonClick', keypad, button);
          if (button.onClick) {
            button.onClick(keypad, button);
          }
        }

        $buttonsEl.on('click', handleClick);

        keypad.detachKeypadEvents = function detachKeypadEvents() {
          $buttonsEl.off('click', handleClick);
        };
      };

      if ($inputEl && $inputEl.length) {
        $inputEl[0].f7Keypad = Keypad;
      }
      if ($containerEl && $containerEl.length) {
        $containerEl[0].f7Keypad = Keypad;
      }

      keypad.init();

      return keypad;
    }
    initInput() {
      const keypad = this;
      if (!keypad.$inputEl) return;
      if (keypad.params.inputReadOnly) keypad.$inputEl.prop('readOnly', true);
    }
    isPopover() {
      const keypad = this;
      const { app, modal, params } = keypad;
      if (params.openIn === 'sheet') return false;
      if (modal && modal.type !== 'popover') return false;

      if (!keypad.inline && keypad.inputEl) {
        if (params.openIn === 'popover') return true;
        else if (app.device.ios) {
          return !!app.device.ipad;
        } else if (app.width >= 768) {
          return true;
        }
      }
      return false;
    }
    calculator(value) {
      const keypad = this;
      const operators = ('+ - = × ÷ ± %').split(' ');
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
      const reset = 'C';
      const invert = '±';
      const perc = '%';
      function calc() {
        let toEval = '';
        for (let i = 0; i < keypad.calcOperations.length; i += 1) {
          let operation = keypad.calcOperations[i];
          // eslint-disable-next-line
          if (i === keypad.calcOperations.length - 1 && operators.indexOf(operation) >= 0) {

          } else if (operation) {
            if (operation === '.') {
              operation = 0;
            }
            toEval += (`${operation.toString()}`)
              .replace('×', '*')
              .replace('÷', '/');
          }
        }
        toEval = toEval.replace(/--/g, '+');
        // eslint-disable-next-line
        keypad.setValue(eval.call(window, toEval));
      }
      if (!keypad.value) keypad.value = 0;
      if (value === reset) {
        keypad.setValue(0);
        keypad.calcValues = [];
        keypad.calcOperations = [];
        return;
      }
      if (numbers.indexOf(value) >= 0) {
        if (value === '.') {
          if (keypad.lastWasNumber && keypad.value.toString().indexOf('.') >= 0) return;
        }
        if (operators.indexOf(keypad.calcValues[keypad.calcValues.length - 1]) >= 0) {
          keypad.setValue(value);
        } else {
          keypad.setValue(keypad.value ? `${keypad.value}${value}` : value);
        }
        keypad.lastWasNumber = true;
      }
      if (operators.indexOf(value) >= 0) {
        if (value === invert) {
          if (keypad.value === '.') return;
          keypad.setValue(-1 * keypad.value);
          keypad.lastWasNumber = true;
        } else if (value === perc) {
          if (keypad.calcOperations[keypad.calcOperations.length - 2]) {
            const percents = keypad.value / 100;
            keypad.setValue(keypad.calcOperations[keypad.calcOperations.length - 2] * percents);
          }
          keypad.lastWasNumber = true;
        } else {
          const lastOperation = keypad.calcOperations[keypad.calcOperations.length - 1];
          if (value === '=') {
            if (keypad.calcOperations[keypad.calcOperations.length - 1] === '=') {
              if (keypad.calcOperations.length < 2) return;
              keypad.calcOperations.pop();
              const val1 = keypad.calcOperations[keypad.calcOperations.length - 2];
              const val2 = keypad.calcOperations[keypad.calcOperations.length - 1];
              keypad.calcOperations.push(val1);
              keypad.calcOperations.push(val2);
            } else {
              keypad.calcOperations.push(keypad.value);
            }
            keypad.calcOperations.push('=');
            calc();
          } else if (['-', '+', '×', '÷', '='].indexOf(lastOperation) >= 0) {
            if (lastOperation === '=') {
              keypad.calcOperations = [keypad.value, value];
            }
            if (['-', '+', '×', '÷'].indexOf(lastOperation) >= 0) {
              if (keypad.lastWasNumber) {
                if (['-', '+'].indexOf(lastOperation) >= 0 && ['×', '÷'].indexOf(value) >= 0) {
                  keypad.calcOperations.push(keypad.value);
                  keypad.calcOperations.push(value);
                } else {
                  keypad.calcOperations.push(keypad.value);
                  keypad.calcOperations.push(value);
                  calc();
                }
              } else {
                keypad.calcOperations[keypad.calcOperations.length - 1] = value;
              }
            }
          } else {
            keypad.calcOperations.push(keypad.value);
            keypad.calcOperations.push(value);
            calc();
          }
          keypad.lastWasNumber = false;
        }
      }
      if (value !== invert && value !== perc) keypad.calcValues.push(value);
    }
    formatValue(value) {
      const keypad = this;
      if (keypad.params.formatValue) return keypad.params.formatValue.call(keypad, value);
      return value;
    }
    setValue(value) {
      const keypad = this;
      keypad.updateValue(value);
    }
    getValue() {
      const keypad = this;
      return keypad.value;
    }
    updateValue(newValue) {
      const keypad = this;
      keypad.value = newValue;
      if (keypad.params.valueMaxLength && keypad.value.length > keypad.params.valueMaxLength) {
        keypad.value = keypad.value.substring(0, keypad.params.valueMaxLength);
      }
      keypad.emit('local::change keypadChange', keypad, keypad.value);
      if (keypad.$inputEl && keypad.$inputEl.length > 0) {
        keypad.$inputEl.val(keypad.formatValue(keypad.value));
        keypad.$inputEl.trigger('change');
      }
    }
    renderButtons() {
      const keypad = this;
      let buttonsHTML = '';
      let buttonClass;
      let button;
      for (let i = 0; i < keypad.params.buttons.length; i += 1) {
        button = keypad.params.buttons[i];
        buttonClass = 'keypad-button';
        if (button.dark) buttonClass += ' keypad-button-dark';
        if (button.cssClass) buttonClass += ` ${button.cssClass}`;
        buttonsHTML += `<span class="${buttonClass}">${button.html || ''}</span>`;
      }
      return buttonsHTML;
    }
    renderToolbar() {
      const keypad = this;
      if (keypad.params.renderToolbar) return keypad.params.renderToolbar.call(keypad, keypad);

      const toolbarHtml = `
        <div class="toolbar">
          <div class="toolbar-inner">
            <div class="left"></div>
            <div class="right">
              <a href="#" class="link sheet-close popover-close">${keypad.params.toolbarCloseText}</a>
            </div>
          </div>
        </div>
      `;
      return toolbarHtml.trim();
    }
    renderSheet() {
      const keypad = this;
      if (keypad.params.renderSheet) return keypad.params.renderSheet.call(keypad, keypad);
      const { cssClass, toolbar } = keypad.params;

      const sheetHtml = `
        <div class="sheet-modal keypad keypad-sheet keypad-type-${keypad.params.type} ${cssClass || ''}">
          ${toolbar ? keypad.renderToolbar() : ''}
          <div class="sheet-modal-inner keypad-buttons">
            ${keypad.renderButtons()}
          </div>
        </div>
      `;

      return sheetHtml;
    }
    renderPopover() {
      const keypad = this;
      if (keypad.params.renderPopover) return keypad.params.renderPopover.call(keypad, keypad);
      const { cssClass, toolbar } = keypad.params;
      const popoverHtml = `
        <div class="popover keypad-popover">
          <div class="popover-inner">
            <div class="keypad keypad-type-${keypad.params.type} ${cssClass || ''}">
              ${toolbar ? keypad.renderToolbar() : ''}
              <div class="keypad-buttons">
                ${keypad.renderButtons()}
              </div>
            </div>
          </div>
        </div>
      `.trim();

      return popoverHtml;
    }
    renderInline() {
      const keypad = this;
      if (keypad.params.renderInline) return keypad.params.renderInline.call(keypad, keypad);
      const { cssClass, toolbar } = keypad.params;

      const inlineHtml = `
        <div class="keypad keypad-inline keypad-type-${keypad.params.type} ${cssClass || ''}">
          ${toolbar ? keypad.renderToolbar() : ''}
          <div class="keypad-buttons">
            ${keypad.renderButtons()}
          </div>
        </div>
      `;

      return inlineHtml;
    }
    render() {
      const keypad = this;
      const { params } = keypad;
      if (params.render) return params.render.call(keypad);
      if (!keypad.inline) {
        let modalType = params.openIn;
        if (modalType === 'auto') modalType = keypad.isPopover() ? 'popover' : 'sheet';

        if (modalType === 'popover') return keypad.renderPopover();
        else if (modalType === 'sheet') return keypad.renderSheet();
      }
      return keypad.renderInline();
    }

    onOpen() {
      const keypad = this;
      const { initialized, $el, app, $inputEl, inline, value, params } = keypad;
      keypad.opened = true;

      // Init main events
      keypad.attachKeypadEvents();

      // Set value
      if (!initialized) {
        if (value) keypad.setValue(value);
        else if (params.value) {
          keypad.setValue(params.value);
        }
      } else if (value) {
        keypad.setValue(value);
      }

      // Extra focus
      if (!inline && $inputEl.length && app.theme === 'md') {
        $inputEl.trigger('focus');
      }

      keypad.initialized = true;

      // Trigger events
      if ($el) {
        $el.trigger('keypad:open', keypad);
      }
      if ($inputEl) {
        $inputEl.trigger('keypad:open', keypad);
      }
      keypad.emit('local::open keypadOpen', keypad);
    }
    onOpened() {
      const keypad = this;
      if (keypad.$el) {
        keypad.$el.trigger('keypad:opened', keypad);
      }
      if (keypad.$inputEl) {
        keypad.$inputEl.trigger('keypad:opened', keypad);
      }
      keypad.emit('local::opened keypadOpened', keypad);
    }
    onClose() {
      const keypad = this;
      const app = keypad.app;

      if (keypad.$inputEl && app.theme === 'md') {
        keypad.$inputEl.trigger('blur');
      }
      if (keypad.detachKeypadEvents) {
        keypad.detachKeypadEvents();
      }

      if (keypad.$el) {
        keypad.$el.trigger('keypad:close', keypad);
      }
      if (keypad.$inputEl) {
        keypad.$inputEl.trigger('keypad:close', keypad);
      }
      keypad.emit('local::close keypadClose', keypad);
    }
    onClosed() {
      const keypad = this;
      keypad.opened = false;

      if (!keypad.inline) {
        keypad.app.utils.nextTick(() => {
          if (keypad.modal && keypad.modal.el && keypad.modal.destroy) {
            if (!keypad.params.routableModals) {
              keypad.modal.destroy();
            }
          }
          delete keypad.modal;
        });
      }
      if (keypad.$el) {
        keypad.$el.trigger('keypad:closed', keypad);
      }
      if (keypad.$inputEl) {
        keypad.$inputEl.trigger('keypad:closed', keypad);
      }
      keypad.emit('local::closed keypadClosed', keypad);
    }
    open() {
      const keypad = this;
      const { app, opened, inline, $inputEl, params } = keypad;
      if (opened) return;

      if (inline) {
        keypad.$el = app.$(keypad.render());
        keypad.$el[0].f7Keypad = keypad;
        keypad.$containerEl.append(keypad.$el);
        keypad.onOpen();
        keypad.onOpened();
        return;
      }
      let modalType = params.openIn;
      if (modalType === 'auto') {
        modalType = keypad.isPopover() ? 'popover' : 'sheet';
      }
      const modalContent = keypad.render();

      const modalParams = {
        targetEl: $inputEl,
        scrollToEl: keypad.params.scrollToInput ? $inputEl : undefined,
        content: modalContent,
        backdrop: modalType !== 'sheet',
        on: {
          open() {
            const modal = this;
            keypad.modal = modal;
            keypad.$el = modalType === 'popover' ? modal.$el.find('.keypad') : modal.$el;
            keypad.$el[0].f7Keypad = keypad;
            keypad.onOpen();
          },
          opened() { keypad.onOpened(); },
          close() { keypad.onClose(); },
          closed() { keypad.onClosed(); },
        },
      };
      if (keypad.params.routableModals) {
        keypad.view.router.navigate({
          url: keypad.url,
          route: {
            path: keypad.url,
            [modalType]: modalParams,
          },
        });
      } else {
        keypad.modal = app[modalType].create(modalParams);
        keypad.modal.open();
      }
    }
    close() {
      const keypad = this;
      const { opened, inline } = keypad;
      if (!opened) return;
      if (inline) {
        keypad.onClose();
        keypad.onClosed();
        return;
      }
      if (keypad.params.routableModals) {
        keypad.view.router.back();
      } else {
        keypad.modal.close();
      }
    }
    init() {
      const keypad = this;
      keypad.initInput();

      if (keypad.inline) {
        keypad.open();
        keypad.emit('local::init keypadInit', keypad);
        return;
      }

      if (!keypad.initialized && keypad.params.value) {
        keypad.setValue(keypad.params.value);
      }

      // Attach input Events
      if (keypad.$inputEl) {
        keypad.attachInputEvents();
      }
      if (keypad.params.closeByOutsideClick) {
        keypad.attachHtmlEvents();
      }
      keypad.emit('local::init keypadInit', keypad);
    }
    destroy() {
      const keypad = this;
      if (keypad.destroyed) return;
      const { $el } = keypad;
      keypad.emit('local::beforeDestroy keypadBeforeDestroy', keypad);
      if ($el) $el.trigger('keypad:beforedestroy', keypad);

      keypad.close();

      // Detach Events
      if (keypad.$inputEl) {
        keypad.detachInputEvents();
      }
      if (keypad.params.closeByOutsideClick) {
        keypad.detachHtmlEvents();
      }

      if ($el && $el.length) delete keypad.$el[0].f7Keypad;
      keypad.app.utils.deleteProps(keypad);
      keypad.destroyed = true;
    }
  };
};

let Keypad;
var framework7_keypad = {
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

export default framework7_keypad;
