import Framework7Keypad from '../src/framework7-keypad.js';
import '../src/framework7-keypad.less';

import AutoInit from './auto-init.f7';
import PassCode from './passcode.f7';

Framework7.use(Framework7Keypad);

const app = new Framework7({
  el: '#app',
  routes: [
    {
      path: '/passcode/',
      component: PassCode,
    },
    {
      path: '/auto-init/',
      component: AutoInit,
    },
  ],
});

app.keypad.create({
  inputEl: '#demo-numpad',
  dark: true,
});
app.keypad.create({
  inputEl: '#demo-numpad-limited',
  valueMaxLength: 2,
  dotButton: false,
});
app.keypad.create({
  inputEl: '#demo-calculator',
  type: 'calculator',
  toolbar: false,
});
