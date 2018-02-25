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

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Framework7Keypad = factory());
}(this, (function () { 'use strict';

var KeypadClassConstructor = function (Framework7Class) {
  return (function (Framework7Class) {
    function Keypad(app, params) {
      Framework7Class.call(this, params, [app]);

      var Utils = app.utils;
      var $ = app.$;
      var request = app.request;

      var keypad = this;
      keypad.app = app;

      var defaults = Utils.extend({
        on: {},
      }, app.params.keypad);

      keypad.params = Utils.extend(defaults, params);

      var $containerEl;

      if (keypad.params.containerEl) {
        $containerEl = $(keypad.params.containerEl);
        if ($containerEl.length === 0) { return keypad; }
      }

      if (!keypad.params.buttons || keypad.params.buttons.length === 0) {
        var ref = keypad.params;
        var dotCharacter = ref.dotCharacter;
        var dotButton = ref.dotButton;
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
              html: dotButton ? ("<span class=\"keypad-button-number\">" + dotCharacter + "</span>") : '',
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
            } ];
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
            } ];
        }
      }

      var $inputEl;
      if (keypad.params.inputEl) {
        $inputEl = $(keypad.params.inputEl);
      }

      var view;
      if (keypad.params.view) {
        view = keypad.params.view;
      } else if ($inputEl && $inputEl.length) {
        view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
      } else {
        view = app.views.get($inputEl);
      }
      if (!view) { view = app.views.main; }

      Utils.extend(keypad, {
        app: app,
        request: request,
        $containerEl: $containerEl,
        containerEl: $containerEl && $containerEl[0],
        inline: $containerEl && $containerEl.length > 0,
        $inputEl: $inputEl,
        inputEl: $inputEl && $inputEl[0],
        initialized: false,
        opened: false,
        view: view,
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
        var $targetEl = $(e.target);
        if (keypad.isPopover()) { return; }
        if (!keypad.opened) { return; }
        if ($targetEl.closest('[class*="backdrop"]').length) { return; }
        if ($inputEl && $inputEl.length > 0) {
          if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal, .keypad-modal').length === 0) {
            keypad.close();
          }
        } else if ($(e.target).closest('.sheet-modal, .keypad-modal').length === 0) {
          keypad.close();
        }
      }
      Utils.extend(keypad, {
        attachInputEvents: function attachInputEvents() {
          keypad.$inputEl.on('click', onInputClick);
          if (keypad.params.inputReadOnly) {
            keypad.$inputEl.on('focus mousedown', onInputFocus);
          }
        },
        detachInputEvents: function detachInputEvents() {
          keypad.$inputEl.off('click', onInputClick);
          if (keypad.params.inputReadOnly) {
            keypad.$inputEl.off('focus mousedown', onInputFocus);
          }
        },
        attachHtmlEvents: function attachHtmlEvents() {
          app.on('click', onHtmlClick);
        },
        detachHtmlEvents: function detachHtmlEvents() {
          app.off('click', onHtmlClick);
        },
      });


      keypad.attachKeypadEvents = function attachKeypadEvents() {
        var $buttonsEl = keypad.$el.find('.keypad-buttons');

        function handleClick(e) {
          var $buttonEl = $(e.target);
          if (!$buttonEl.hasClass('keypad-button')) {
            $buttonEl = $buttonEl.parents('.keypad-button');
          }
          if ($buttonEl.length === 0) { return; }
          var button = keypad.params.buttons[$buttonEl.index()];
          var buttonValue = button.value;
          var currentValue = keypad.value;

          if (keypad.params.type === 'numpad') {
            if (typeof currentValue === 'undefined') { currentValue = ''; }
            if ($buttonEl.hasClass('keypad-delete-button')) {
              currentValue = currentValue.substring(0, currentValue.length - 1);
            } else if (typeof buttonValue !== 'undefined') {
              if (buttonValue === '.' && currentValue.indexOf('.') >= 0) {
                buttonValue = '';
              }
              currentValue += buttonValue;
            }
            if (typeof currentValue !== 'undefined') { keypad.setValue(currentValue); }
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

    if ( Framework7Class ) Keypad.__proto__ = Framework7Class;
    Keypad.prototype = Object.create( Framework7Class && Framework7Class.prototype );
    Keypad.prototype.constructor = Keypad;
    Keypad.prototype.initInput = function initInput () {
      var keypad = this;
      if (!keypad.$inputEl) { return; }
      if (keypad.params.inputReadOnly) { keypad.$inputEl.prop('readOnly', true); }
    };
    Keypad.prototype.isPopover = function isPopover () {
      var keypad = this;
      var app = keypad.app;
      var modal = keypad.modal;
      var params = keypad.params;
      if (params.openIn === 'sheet') { return false; }
      if (modal && modal.type !== 'popover') { return false; }

      if (!keypad.inline && keypad.inputEl) {
        if (params.openIn === 'popover') { return true; }
        else if (app.device.ios) {
          return !!app.device.ipad;
        } else if (app.width >= 768) {
          return true;
        }
      }
      return false;
    };
    Keypad.prototype.calculator = function calculator (value) {
      var keypad = this;
      var operators = ('+ - = × ÷ ± %').split(' ');
      var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
      var reset = 'C';
      var invert = '±';
      var perc = '%';
      function calc() {
        var toEval = '';
        for (var i = 0; i < keypad.calcOperations.length; i += 1) {
          var operation = keypad.calcOperations[i];
          // eslint-disable-next-line
          if (i === keypad.calcOperations.length - 1 && operators.indexOf(operation) >= 0) {

          } else if (operation) {
            if (operation === '.') {
              operation = 0;
            }
            toEval += (("" + (operation.toString())))
              .replace('×', '*')
              .replace('÷', '/');
          }
        }
        toEval = toEval.replace(/--/g, '+');
        // eslint-disable-next-line
        keypad.setValue(eval.call(window, toEval));
      }
      if (!keypad.value) { keypad.value = 0; }
      if (value === reset) {
        keypad.setValue(0);
        keypad.calcValues = [];
        keypad.calcOperations = [];
        return;
      }
      if (numbers.indexOf(value) >= 0) {
        if (value === '.') {
          if (keypad.lastWasNumber && keypad.value.toString().indexOf('.') >= 0) { return; }
        }
        if (operators.indexOf(keypad.calcValues[keypad.calcValues.length - 1]) >= 0) {
          keypad.setValue(value);
        } else {
          keypad.setValue(keypad.value ? ("" + (keypad.value) + value) : value);
        }
        keypad.lastWasNumber = true;
      }
      if (operators.indexOf(value) >= 0) {
        if (value === invert) {
          if (keypad.value === '.') { return; }
          keypad.setValue(-1 * keypad.value);
          keypad.lastWasNumber = true;
        } else if (value === perc) {
          if (keypad.calcOperations[keypad.calcOperations.length - 2]) {
            var percents = keypad.value / 100;
            keypad.setValue(keypad.calcOperations[keypad.calcOperations.length - 2] * percents);
          }
          keypad.lastWasNumber = true;
        } else {
          var lastOperation = keypad.calcOperations[keypad.calcOperations.length - 1];
          if (value === '=') {
            if (keypad.calcOperations[keypad.calcOperations.length - 1] === '=') {
              if (keypad.calcOperations.length < 2) { return; }
              keypad.calcOperations.pop();
              var val1 = keypad.calcOperations[keypad.calcOperations.length - 2];
              var val2 = keypad.calcOperations[keypad.calcOperations.length - 1];
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
      if (value !== invert && value !== perc) { keypad.calcValues.push(value); }
    };
    Keypad.prototype.formatValue = function formatValue (value) {
      var keypad = this;
      if (keypad.params.formatValue) { return keypad.params.formatValue.call(keypad, value); }
      return value;
    };
    Keypad.prototype.setValue = function setValue (value) {
      var keypad = this;
      keypad.updateValue(value);
    };
    Keypad.prototype.getValue = function getValue () {
      var keypad = this;
      return keypad.value;
    };
    Keypad.prototype.updateValue = function updateValue (newValue) {
      var keypad = this;
      keypad.value = newValue;
      if (keypad.params.valueMaxLength && keypad.value.length > keypad.params.valueMaxLength) {
        keypad.value = keypad.value.substring(0, keypad.params.valueMaxLength);
      }
      keypad.emit('local::change keypadChange', keypad, keypad.value);
      if (keypad.$inputEl && keypad.$inputEl.length > 0) {
        keypad.$inputEl.val(keypad.formatValue(keypad.value));
        keypad.$inputEl.trigger('change');
      }
    };
    Keypad.prototype.renderButtons = function renderButtons () {
      var keypad = this;
      var buttonsHTML = '';
      var buttonClass;
      var button;
      for (var i = 0; i < keypad.params.buttons.length; i += 1) {
        button = keypad.params.buttons[i];
        buttonClass = 'keypad-button';
        if (button.dark) { buttonClass += ' keypad-button-dark'; }
        if (button.cssClass) { buttonClass += " " + (button.cssClass); }
        buttonsHTML += "<span class=\"" + buttonClass + "\">" + (button.html || '') + "</span>";
      }
      return buttonsHTML;
    };
    Keypad.prototype.renderToolbar = function renderToolbar () {
      var keypad = this;
      if (keypad.params.renderToolbar) { return keypad.params.renderToolbar.call(keypad, keypad); }

      var toolbarHtml = "\n        <div class=\"toolbar\">\n          <div class=\"toolbar-inner\">\n            <div class=\"left\"></div>\n            <div class=\"right\">\n              <a href=\"#\" class=\"link sheet-close popover-close\">" + (keypad.params.toolbarCloseText) + "</a>\n            </div>\n          </div>\n        </div>\n      ";
      return toolbarHtml.trim();
    };
    Keypad.prototype.renderSheet = function renderSheet () {
      var keypad = this;
      if (keypad.params.renderSheet) { return keypad.params.renderSheet.call(keypad, keypad); }
      var ref = keypad.params;
      var cssClass = ref.cssClass;
      var toolbar = ref.toolbar;

      var sheetHtml = "\n        <div class=\"sheet-modal keypad keypad-sheet keypad-type-" + (keypad.params.type) + " " + (cssClass || '') + "\">\n          " + (toolbar ? keypad.renderToolbar() : '') + "\n          <div class=\"sheet-modal-inner keypad-buttons\">\n            " + (keypad.renderButtons()) + "\n          </div>\n        </div>\n      ";

      return sheetHtml;
    };
    Keypad.prototype.renderPopover = function renderPopover () {
      var keypad = this;
      if (keypad.params.renderPopover) { return keypad.params.renderPopover.call(keypad, keypad); }
      var ref = keypad.params;
      var cssClass = ref.cssClass;
      var toolbar = ref.toolbar;
      var popoverHtml = ("\n        <div class=\"popover keypad-popover\">\n          <div class=\"popover-inner\">\n            <div class=\"keypad keypad-type-" + (keypad.params.type) + " " + (cssClass || '') + "\">\n              " + (toolbar ? keypad.renderToolbar() : '') + "\n              <div class=\"keypad-buttons\">\n                " + (keypad.renderButtons()) + "\n              </div>\n            </div>\n          </div>\n        </div>\n      ").trim();

      return popoverHtml;
    };
    Keypad.prototype.renderInline = function renderInline () {
      var keypad = this;
      if (keypad.params.renderInline) { return keypad.params.renderInline.call(keypad, keypad); }
      var ref = keypad.params;
      var cssClass = ref.cssClass;
      var toolbar = ref.toolbar;

      var inlineHtml = "\n        <div class=\"keypad keypad-inline keypad-type-" + (keypad.params.type) + " " + (cssClass || '') + "\">\n          " + (toolbar ? keypad.renderToolbar() : '') + "\n          <div class=\"keypad-buttons\">\n            " + (keypad.renderButtons()) + "\n          </div>\n        </div>\n      ";

      return inlineHtml;
    };
    Keypad.prototype.render = function render () {
      var keypad = this;
      var params = keypad.params;
      if (params.render) { return params.render.call(keypad); }
      if (!keypad.inline) {
        var modalType = params.openIn;
        if (modalType === 'auto') { modalType = keypad.isPopover() ? 'popover' : 'sheet'; }

        if (modalType === 'popover') { return keypad.renderPopover(); }
        else if (modalType === 'sheet') { return keypad.renderSheet(); }
      }
      return keypad.renderInline();
    };

    Keypad.prototype.onOpen = function onOpen () {
      var keypad = this;
      var initialized = keypad.initialized;
      var $el = keypad.$el;
      var app = keypad.app;
      var $inputEl = keypad.$inputEl;
      var inline = keypad.inline;
      var value = keypad.value;
      var params = keypad.params;
      keypad.opened = true;

      // Init main events
      keypad.attachKeypadEvents();

      // Set value
      if (!initialized) {
        if (value) { keypad.setValue(value); }
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
    };
    Keypad.prototype.onOpened = function onOpened () {
      var keypad = this;
      if (keypad.$el) {
        keypad.$el.trigger('keypad:opened', keypad);
      }
      if (keypad.$inputEl) {
        keypad.$inputEl.trigger('keypad:opened', keypad);
      }
      keypad.emit('local::opened keypadOpened', keypad);
    };
    Keypad.prototype.onClose = function onClose () {
      var keypad = this;
      var app = keypad.app;

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
    };
    Keypad.prototype.onClosed = function onClosed () {
      var keypad = this;
      keypad.opened = false;

      if (!keypad.inline) {
        keypad.app.utils.nextTick(function () {
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
    };
    Keypad.prototype.open = function open () {
      var obj;

      var keypad = this;
      var app = keypad.app;
      var opened = keypad.opened;
      var inline = keypad.inline;
      var $inputEl = keypad.$inputEl;
      var params = keypad.params;
      if (opened) { return; }

      if (inline) {
        keypad.$el = app.$(keypad.render());
        keypad.$el[0].f7Keypad = keypad;
        keypad.$containerEl.append(keypad.$el);
        keypad.onOpen();
        keypad.onOpened();
        return;
      }
      var modalType = params.openIn;
      if (modalType === 'auto') {
        modalType = keypad.isPopover() ? 'popover' : 'sheet';
      }
      var modalContent = keypad.render();

      var modalParams = {
        targetEl: $inputEl,
        scrollToEl: keypad.params.scrollToInput ? $inputEl : undefined,
        content: modalContent,
        backdrop: modalType !== 'sheet',
        on: {
          open: function open() {
            var modal = this;
            keypad.modal = modal;
            keypad.$el = modalType === 'popover' ? modal.$el.find('.keypad') : modal.$el;
            keypad.$el[0].f7Keypad = keypad;
            keypad.onOpen();
          },
          opened: function opened() { keypad.onOpened(); },
          close: function close() { keypad.onClose(); },
          closed: function closed() { keypad.onClosed(); },
        },
      };
      if (keypad.params.routableModals) {
        keypad.view.router.navigate({
          url: keypad.url,
          route: ( obj = {
            path: keypad.url
          }, obj[modalType] = modalParams, obj ),
        });
      } else {
        keypad.modal = app[modalType].create(modalParams);
        keypad.modal.open();
      }
    };
    Keypad.prototype.close = function close () {
      var keypad = this;
      var opened = keypad.opened;
      var inline = keypad.inline;
      if (!opened) { return; }
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
    };
    Keypad.prototype.init = function init () {
      var keypad = this;
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
    };
    Keypad.prototype.destroy = function destroy () {
      var keypad = this;
      if (keypad.destroyed) { return; }
      var $el = keypad.$el;
      keypad.emit('local::beforeDestroy keypadBeforeDestroy', keypad);
      if ($el) { $el.trigger('keypad:beforedestroy', keypad); }

      keypad.close();

      // Detach Events
      if (keypad.$inputEl) {
        keypad.detachInputEvents();
      }
      if (keypad.params.closeByOutsideClick) {
        keypad.detachHtmlEvents();
      }

      if ($el && $el.length) { delete keypad.$el[0].f7Keypad; }
      keypad.app.utils.deleteProps(keypad);
      keypad.destroyed = true;
    };

    return Keypad;
  }(Framework7Class));
};

var Keypad;
var framework7_keypad = {
  name: 'keypad',
  install: function install() {
    var Framework7 = this;
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
  create: function create() {
    var app = this;
    var $ = app.$;
    app.keypad = {
      create: function create(params) {
        return new Keypad(app, params);
      },
      get: function get(el) {
        if ( el === void 0 ) el = '.keypad';

        if (el instanceof Keypad) { return el; }
        var $el = $(el);
        if ($el.length === 0) { return undefined; }
        return $el[0].f7Keypad;
      },
      destroy: function destroy(el) {
        if ( el === void 0 ) el = '.keypad';

        var instance = app.keypad.get(el);
        if (instance && instance.destroy) { return instance.destroy(); }
        return undefined;
      },
      close: function close(el) {
        if ( el === void 0 ) el = '.keypad';

        var $el = $(el);
        if ($el.length === 0) { return; }
        var keypad = $el[0].f7Keypad;
        if (!keypad || (keypad && !keypad.opened)) { return; }
        keypad.close();
      },
    };
  },
  on: {
    pageInit: function pageInit(page) {
      var $ = page.app.$;
      var app = page.app;
      page.$el.find('input[type="numpad"], input[type="calculator"]').each(function (index, inputEl) {
        var $inputEl = $(inputEl);
        var params = {
          inputEl: inputEl,
          type: $inputEl.attr('type'),
          value: $inputEl.val() || 0,
        };
        if ($inputEl.attr('maxlength')) { params.valueMaxLength = $inputEl.attr('maxlength'); }
        app.keypad.create(app.utils.extend(params, $inputEl.dataset()));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('input[type="numpad"], input[type="calculator"]').each(function (index, inputEl) {
        page.app.keypad.destroy(inputEl);
      });
    },
  },
};

return framework7_keypad;

})));
