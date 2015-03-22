[![devDependency Status](https://david-dm.org/nolimits4web/framework7-keypad/dev-status.svg)](https://david-dm.org/nolimits4web/framework7-keypad#info=devDependencies)
[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=nolimits4web&url=https://github.com/nolimits4web/framework7-keypad/&title=Framework7 Keypad&language=JavaScript&tags=github&category=software)

# Framework7 Keypad

Keypad plugin extends Framework7 with additional custom keyboards. By default it comes with predefined <b>Numpad</b> and <b>Calculator</b> keyboards, but it also can be used to create custom keyboards with custom buttons.

## Keypad Instance

Keypad can be created and initialized only using JavaScript. We need to use related App's method:

```js
myApp.keypad(parameters)
```

Where <b>parameters</b> - *object* - object with Keypad parameters. Required
This method returns initialized Keypad instance

For example
```js
var myKeypad = myApp.keypad({
    input: '#demo-numpad-limited',
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
      <th colspan="4">Common Picker Modal Component Parameters</th>
    </tr>
    <tr>
      <td>container</td>
      <td>string or HTMLElement</td>
      <td></td>
      <td>
        String with CSS selector or HTMLElement where to place generated Keypad HTML. Use only for inline keypad
      </td>
    </tr>
    <tr>
      <td>input</td>
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
      <td>convertToPopover</td>
      <td>boolean</td>
      <td>true</td>
      <td>
        Converts keypad modal to Popover on large screens (on iPad)
      </td>
    </tr>
    <tr>
      <td>onlyOnPopover</td>
      <td>boolean</td>
      <td>false</td>
      <td>
        Enable it and Keypad will be always opened in Popover
      </td>
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
      <td>'Done'</td>
      <td>Text for Done/Close toolbar button</td>
    </tr>
    <tr>
      <td>toolbarTemplate</td>
      <td>string</td>
      <td></td>
      <td>
        Toolbar HTML Template. By default it is HTML string with following template:
        <pre><code>
&lt;div class="toolbar"&gt;
  &lt;div class="toolbar-inner"&gt;
    &lt;div class="left"&gt;&lt;/div&gt;
    &lt;div class="right"&gt;
      &lt;a href="#" class="link close-picker"&gt;
        {{closeText}}
      &lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

        </code></pre>
      </td>
    </tr>
    <tr>
      <th colspan="4">Specific Picker Parameters</th>
    </tr>
    <tr>
      <td>value</td>
      <td>string</td>
      <td></td>
      <td>Initial Keypad value</td>
    </tr>
    <tr>
      <td>formatValue</td>
      <td>function (p, value)</td>
      <td></td>
      <td>
        Function to format input value, should return new/formatted string value. <b>value</b>
        is the current keypad value
      </td>
    </tr>
    <tr>
      <td>type</td>
      <td>string</td>
      <td>'numbad'</td>
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
            <li><i>onClick</i> - <b>function (p, button)</b> - callback function that will be executed when you click on button</li>
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
      <th colspan="4">Callbacks</th>
    </tr>
    <tr>
      <td>onChange</td>
      <td>function (p, value)</td>
      <td></td>
      <td>
        Callback function that will be executed when keypad value changed.
      </td>
    </tr>
    <tr>
      <td>onOpen</td>
      <td>function (p)</td>
      <td></td>
      <td>
        Callback function that will be executed when picker is opened
      </td>
    </tr>
    <tr>
      <td>onClose</td>
      <td>function (p)</td>
      <td></td>
      <td>
        Callback function that will be executed when picker is closed
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
      <td>myKeypad.container</td>
      <td>Dom7 instance with Keypad HTML container</td>
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
