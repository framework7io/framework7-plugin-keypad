<a href="https://www.patreon.com/vladimirkharlampidi"><img src="https://cdn.framework7.io/i/support-badge.png" height="20"></a>

# Framework7 Keypad Plugin

Keypad plugin extends Framework7 with additional custom keyboards. By default it comes with predefined <b>Numpad</b> and <b>Calculator</b> keyboards, but it also can be used to create custom keyboards with custom buttons.

## Installation

Just grab plugin files from `dist/` folder or using npm:

```
npm install framework7-plugin-keypad
```

And link them to your app right AFTER Framework7's scripts and styles:

```
<link rel="stylesheet" href="path/to/framework7.min.css">
<link rel="stylesheet" href="path/to/framework7.keypad.css">
...
<script src="path/to/framework7.min.js"></script>
<script src="path/to/framework7.keypad.js"></script>
```

## Usage

### Install & Enable Plugin

After you included plugin script file, you need to install plugin before you init app:

```js
// install plugin to Framework7
Framework7.use(Framework7Keypad);

// init app
var app = new Framework7({
  ...
})
```

### ES Module

This plugin comes with ready to use ES module:

```js
import Framework7 from 'framework7';
import Framework7Keypad from 'framework7-plugin-keypad';

// install plugin
Framework7.use(Framework7Keypad);

// init app
var app = new Framework7({
  ...
})
```

### API

Plugin extends initiliazed `app` instance with new methods:

  * `app.keypad.create(parameters)` - init Keypad. This method returns initialized Keypad instance.
  * `app.keypad.get(keypadEl)` - get Keypad instance by HTML element. Method returns initialized Keypad instance.
  * `app.keypad.destroy(keypadEl)` - destroy Keypad instance

## Keypad Instance

Keypad can be created and initialized only using JavaScript. We need to use related App's method:

```js
app.keypad.create(parameters)
```

Where <b>parameters</b> - *object* - object with Keypad parameters. Required
This method returns initialized Keypad instance

For example
```js
var myKeypad = app.keypad.create({
  inputEl: '#demo-numpad-limited',
  valueMaxLength: 2,
  dotButton: false
});
```

## Keypad Parameters

Let's look on list of all available parameters:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>openIn</td>
      <td>string</td>
      <td>auto</td>
      <td>
        Can be <code>auto</code>, <code>popover</code> (to open keypad in popover) or <code>sheet</code> (to open in sheet modal). In case of <code>auto</code> will open in sheet modal on small screens and in popover on large screens.
      </td>
    </tr>
    <tr>
      <td>containerEl</td>
      <td>string or HTMLElement</td>
      <td></td>
      <td>
        String with CSS selector or HTMLElement where to place generated Keypad HTML. Use only for inline keypad
      </td>
    </tr>
    <tr>
      <td>containerEl</td>
      <td>string or HTMLElement</td>
      <td></td>
      <td>
        String with CSS selector or HTMLElement where to place generated Keypad HTML. Use only for inline keypad
      </td>
    </tr>
    <tr>
      <td>inputEl</td>
      <td>string or HTMLElement</td>
      <td></td>
      <td>
        String with CSS selector or HTMLElement with related input element
      </td>
    </tr>
    <tr>
      <td>scrollToInput</td>
      <td>boolean</td>
      <td>true</td>
      <td>Scroll viewport (page-content) to input when keypad opened</td>
    </tr>
    <tr>
      <td>inputReadOnly</td>
      <td>boolean</td>
      <td>true</td>
      <td>Sets "readonly" attribute on specified input</td>
    </tr>
    <tr>
      <td>cssClass</td>
      <td>string</td>
      <td></td>
      <td>Additional CSS class name to be set on keypad modal</td>
    </tr>
    <tr>
      <td>toolbar</td>
      <td>boolean</td>
      <td>true</td>
      <td>Enables keypad modal toolbar</td>
    </tr>
    <tr>
      <td>toolbarCloseText</td>
      <td>string</td>
      <td>Done</td>
      <td>Text for Done/Close toolbar button</td>
    </tr>
    <tr>
      <td>value</td>
      <td>string</td>
      <td></td>
      <td>Initial Keypad value</td>
    </tr>
    <tr>
      <td>formatValue</td>
      <td>function (value)</td>
      <td></td>
      <td>
        Function to format input value, should return new/formatted string value. <b>value</b>
        is the current keypad value
      </td>
    </tr>
    <tr>
      <td>type</td>
      <td>string</td>
      <td>numbad</td>
      <td>Keypad type, could be 'numpad', 'calculator' or 'custom'</td>
    </tr>
    <tr>
      <td>valueMaxLength</td>
      <td>number</td>
      <td>null</td>
      <td>Limit value by selected number of characters</td>
    </tr>
    <tr>
      <td>dotButton</td>
      <td>boolean</td>
      <td>true</td>
      <td>Only for 'numpad' type. Show or hide "dot" button</td>
    </tr>
    <tr>
      <td>dotCharacter</td>
      <td>string</td>
      <td>'.'</td>
      <td>Dot character symbol. Only for 'numpad' and 'calculator' types</td>
    </tr>
    <tr>
      <td>buttons</td>
      <td>array</td>
      <td></td>
      <td>
        <p>Array with keypad buttons, by default it is predefined for numpad and calculator, but can be used for custom keypad.</p>
        <p>Each button should be presented as object with the following properties:</p>
        <ul>
            <li><i>html</i> - <b>string</b> - button inner HTML</li>
            <li><i>value</i> - <b>string/number</b> - button value</li>
            <li><i>cssClass</i> - <b>string</b> - additional CSS class on button</li>
            <li><i>dark</i> - <b>boolean</b> - defines "dark" color button</li>
            <li><i>onClick</i> - <b>function (keypad, button)</b> - callback function that will be executed when you click on button</li>
        </ul>
        <p>As a reference look at source code to see how buttons defined for Numpad and Calculator</p>
        <p>For example:</p>
        <pre><code>
...
buttons: [
    {
        html:'1',
        value: 1,
        onClick: function () {
            console.log('Button 1 clicked')
        }
    },
    {
        html:'A',
        value: 'a',
    },
    ...
]
        </code></pre>
      </td>
    </tr>
    <tr>
      <th colspan="4">Render functions</th>
    </tr>
    <tr>
      <td>renderToolbar</td>
      <td>function (keypad)</td>
      <td></td>
      <td>
        Function to render toolbar. Must return toolbar HTML string
      </td>
    </tr>
    <tr>
      <td>renderPopover</td>
      <td>function (keypad)</td>
      <td></td>
      <td>
        Function to render popover. Must return popover HTML string
      </td>
    </tr>
    <tr>
      <td>renderSheet</td>
      <td>function (keypad)</td>
      <td></td>
      <td>
        Function to render sheet modal. Must return sheet modal HTML string
      </td>
    </tr>
    <tr>
      <td>renderInline</td>
      <td>function (keypad)</td>
      <td></td>
      <td>
        Function to render inline keypad modal. Must return full keypad HTML string
      </td>
    </tr>
  </tbody>
</table>

## Keypad Methods & Properties

After we initialize Keypad we have its initialized instance in variable (like `myKeypad` variable in example above) with helpful methods and properties:

<table width="100%">
  <tbody>
    <tr>
      <th colspan="2">Properties</th>
    </tr>
    <tr>
      <td>myKeypad.params</td>
      <td>Object with passed initialization parameters</td>
    </tr>
    <tr>
      <td>myKeypad.value</td>
      <td>Current keypad value</td>
    </tr>
    <tr>
      <td>myKeypad.opened</td>
      <td> <b>true</b> if Keypad is currently opened
      </td>
    </tr>
    <tr>
      <td>myKeypad.inline</td>
      <td> <b>true</b> if Keypad is inline Keypad
      </td>
    </tr>
    <tr>
      <td>myKeypad.$el</td>
      <td>Dom7 instance with Keypad container HTML element</td>
    </tr>
    <tr>
      <td>myKeypad.$inputEl</td>
      <td>Dom7 instance with Keypad input HTML element</td>
    </tr>
    <tr>
      <th colspan="2">Methods</th>
    </tr>
    <tr>
      <td>myKeypad.setValue(value)</td>
      <td>
        Set new keypad value.
      </td>
    </tr>
    <tr>
      <td>myKeypad.getValue(value)</td>
      <td>
        Get keypad value.
      </td>
    </tr>
    <tr>
      <td>myKeypad.open()</td>
      <td>Open Keypad</td>
    </tr>
    <tr>
      <td>myKeypad.close()</td>
      <td>Close Keypad</td>
    </tr>
    <tr>
      <td>myKeypad.destroy()</td>
      <td>Destroy Keypad instance and remove all events</td>
    </tr>
  </tbody>
</table>

## Keypad Events

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Target</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>change</td>
      <td>keypad</td>
      <td>(keypad, value)</td>
      <td>Event will be triggered when Keypad value changed</td>
    </tr>
    <tr>
      <td>keypadChange</td>
      <td>app</td>
      <td>(keypad, value)</td>
      <td>Event will be triggered when Keypad value changed</td>
    </tr>
    <tr>
      <td>buttonClick</td>
      <td>keypad</td>
      <td>(keypad, button)</td>
      <td>Event will be triggered on Keypad button click</td>
    </tr>
    <tr>
      <td>keypadButtonClick</td>
      <td>app</td>
      <td>(keypad, button)</td>
      <td>Event will be triggered on Keypad button click</td>
    </tr>
    <tr>
      <td>open</td>
      <td>keypad</td>
      <td>(keypad)</td>
      <td>Event will be triggered when Keypad item starts its opening animation (modal open transition)</td>
    </tr>
    <tr>
      <td>keypadOpen</td>
      <td>app</td>
      <td>(keypad)</td>
      <td>Event will be triggered when Keypad item starts its opening animation (modal open transition)</td>
    </tr>
    <tr>
      <td>opened</td>
      <td>keypad</td>
      <td>(keypad)</td>
      <td>Event will be triggered after Keypad item completes its opening animation (modal open transition)</td>
    </tr>
    <tr>
      <td>keypadOpened</td>
      <td>app</td>
      <td>(keypad)</td>
      <td>Event will be triggered after Keypad item completes its opening animation (modal open transition)</td>
    </tr>
    <tr>
      <td>close</td>
      <td>keypad</td>
      <td>(keypad)</td>
      <td>Event will be triggered when Keypad item starts its closing animation (modal close transition)</td>
    </tr>
    <tr>
      <td>keypadClose</td>
      <td>app</td>
      <td>(keypad)</td>
      <td>Event will be triggered when Keypad item starts its closing animation (modal close transition)</td>
    </tr>
    <tr>
      <td>closed</td>
      <td>keypad</td>
      <td>(keypad)</td>
      <td>Event will be triggered after Keypad item completes its closing animation (modal close transition)</td>
    </tr>
    <tr>
      <td>keypadClosed</td>
      <td>app</td>
      <td>(keypad)</td>
      <td>Event will be triggered after Keypad item completes its closing animation (modal close transition)</td>
    </tr>
  </tbody>
</table>

## Automatic initialization

Such predefined Numpad and Calculator keypads could be initialized automatically. Just use usual inputs but with special type attribute:
```html
<input type="numpad">
<input type="calculator">
```

## Access to Keypad's Instance

If you initialize Keypad as inline Keypad or using automatic initialization, it is still possible to access to Keypad's instance from its HTML container:

```js
var myKeypad = $$('.keypad-inline')[0].f7Keypad;
```

## Demo

Plugin comes with demo example to see how it works and looks. To make demo works you need to run in terminal:

```
$ npm run prod
```


## Contribute

All changes should be done only in `src/` folder. This project uses `gulp` to build a distributable version.

First you need to install all dependencies:

```
$ npm install
```

Then to build plugin's files for testing run:
```
$ npm run build:dev
```

If you need a local server while you developing you can run:

```
$ gulp server
```
or
```
$ npm run dev
```

And working demo will be available at `http://localhost:3000/demo/`

## Live Preview

https://framework7io.github.io/framework7-plugin-keypad/
