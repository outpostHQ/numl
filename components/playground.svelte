<nu-heading>Playground</nu-heading>

{#if show(hash, 'space-around')}
  <nu-card as="section" gap>
    <nu-block>
      There should be a gap between cards
    </nu-block>
    <nu-card place="space-around" width="20">Space around</nu-card>
    <nu-card space="around" width="20">Space around</nu-card>
    <nu-card place="space-around" width="20">Space around</nu-card>
  </nu-card>
{/if}

{#if show(hash, 'icon')}
  <nu-card as="section">
    <nu-heading level="4">Icons</nu-heading>

    Uses Feather Icons library by default. (lazy-loading)

    <nu-block size="xl">
      <nu-icon name="user"></nu-icon>
      <nu-icon name="dollar-sign"></nu-icon>
      <nu-icon name="message-square"></nu-icon>
      <nu-icon name="package"></nu-icon>
      Text to align
    </nu-block>

    <nu-heading level="5">Change default size (Context definition)</nu-heading>
    <nu-block>
      <nu-el>
        <nu-icon name="hash"></nu-icon>
      </nu-el>

      <nu-el>
        <nu-props icon-size="1em"></nu-props>
        <nu-icon name="hash"></nu-icon>
      </nu-el>

      <nu-el>
        <nu-props icon-size="2em"></nu-props>
        <nu-icon name="hash"></nu-icon>
      </nu-el>
    </nu-block>

    <nu-heading level="5">Change default stroke width</nu-heading>
    <nu-block>
      <nu-el>
        <nu-props icon-stroke-width=".5x / 3"></nu-props>
        <nu-icon name="hash"></nu-icon>
      </nu-el>

      <nu-el>
        <nu-props icon-stroke-width=".5x"></nu-props>
        <nu-icon name="hash"></nu-icon>
      </nu-el>
    </nu-block>

  </nu-card>
{/if}

{#if show(hash, 'tabs')}
  <nu-card as="section">
    <nu-props icon-stroke-width=".5x / 3"></nu-props>

    <nu-tablist value="one" border="bottom">
      <nu-tab control="one" value="one" trigger>
        One
      </nu-tab>
      <nu-tab control="two" value="two" trigger>Two</nu-tab>
      <nu-tab control="three" value="three" trigger>Three</nu-tab>
    </nu-tablist>

    <nu-block>
      <nu-block id="one">One</nu-block>
      <nu-block id="two">Two</nu-block>
      <nu-block id="three">Three</nu-block>
    </nu-block>

<!--    <nu-router>-->
<!--      <nu-block id=""></nu-block>-->
<!--    </nu-router>-->
  </nu-card>
{/if}

{#if show(hash, 'width') || show(hash, 'height')}
  <nu-card width="max 20">
    Something
  </nu-card>
{/if}

{#if show(hash, 'weight')}
  <nu-card>
    <nu-heading level="3">Font <nu-u>weight</nu-u></nu-heading>

    <nu-heading level="4" text="w6">Redefined</nu-heading>

    <nu-heading level="4" text="u">Styled</nu-heading>

    <nu-link>Simple link</nu-link>

    <nu-link text="i">Styled link</nu-link>

    <nu-link text="w7">Redefined link</nu-link>
  </nu-card>
{/if}

{#if show(hash, 'place')}
  <nu-block padding="4">
    <nu-card width="20" height="20">
      <nu-block place="outside-top 1x">Something</nu-block>
    </nu-card>
  </nu-block>
{/if}

<!--<nu-btn special padding="1x .5x 1x 1x">-->
<!--  <nu-icon name="message-circle-outline"></nu-icon>-->
<!--  <nu-el show="y|||n">Join chat</nu-el>-->
<!--  <nu-icon name="chevron-down" scale="^:pressed[flip-y]"></nu-icon>-->
<!--  <nu-popupmenu to="!https://tele.click/telegram">-->
<!--    <nu-props opacity-transition-time=".08s"></nu-props>-->
<!--    <nu-option to="!https://tele.click/numldesign">Telegram</nu-option>-->
<!--    <nu-option action="close">Gitter</nu-option>-->
<!--  </nu-popupmenu>-->
<!--</nu-btn>-->

{#if show(hash, 'image')}
  <nu-card id="section">
    <nu-heading>Images</nu-heading>

    <nu-grid columns="1fr 1fr||1fr" gap="2x">
      <nu-heading level="4">Raster image</nu-heading>
      <nu-heading level="4">Vector image</nu-heading>
      <nu-block>
        <nu-img
          class="nu-dark-invert"
          id="logo-raster"
          width="100%"
          label="NUDE Elements Design System Playground">
        </nu-img>
      </nu-block>
      <nu-block>
        <nu-svg
          id="logo-vector"
          color="text-soft"
          width="100%"
          height="min(3)"
          label="NUDE Elements Design System Playground">
        </nu-svg>
      </nu-block>
    </nu-grid>
    <nu-heading level="4">Background image</nu-heading>
    <nu-block
      class="nu-dark-invert"
      id="logo-background"
      height="4">
    </nu-block>
  </nu-card>
{/if}

{#if show(hash, 'switch')}
  <nu-card as="section">
    <nu-heading>Switches</nu-heading>

    <nu-block>
      <nu-switch></nu-switch>
      <nu-switch checked></nu-switch>
    </nu-block>

    <nu-block size="xs">
      <nu-switch></nu-switch>
      <nu-switch checked></nu-switch>
    </nu-block>

    <nu-block size="xl">
      <nu-switch></nu-switch>
      <nu-switch checked></nu-switch>
    </nu-block>

    <nu-block>
      <nu-switch checked disabled></nu-switch>
      <nu-switch disabled></nu-switch>
      - Disabled.
    </nu-block>
  </nu-card>
{/if}

{#if show(hash, 'markdown')}
  <nu-card as="section">
    <nu-markdown linkify>
      <pre>
---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will ==like== those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) [
  return bar++;
];

console.log(foo(5));
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        [ some code, part of Definition 2 ]

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
      </pre>
    </nu-markdown>

    <nu-markdown>
      <pre>
#### My awesome markdown header

And markdown **TEXT**. What do you _think_? `var a = '123'`. Also here is a [link](https://github.com/tenphi/nude).

----

```enumerate
var a = '123';
var b = /wow?/;
```
      </pre>
    </nu-markdown>

    <nu-markdown>
      <pre>
#### Markdown in Shadow DOM

And markdown **TEXT**. What do you _think_? `var a = '123'`. Also here is a [link](https://github.com/tenphi/nude).

```enumerate
var a = '123';
var b = /wow?/;
```
      </pre>
    </nu-markdown>

    <nu-heading level="4">Inline markdown</nu-heading>

    <nu-block>
      It's a fragment of "
      <nu-md>
        <pre>**inlined** markdown _content_</pre>
      </nu-md>
      ".
    </nu-block>
  </nu-card>
{/if}

{#if show(hash, 'control')}
  <nu-card as="section">
    <nu-props transition-time=".4s"></nu-props>
    <nu-heading>Collapsing</nu-heading>
    <nu-btn
      checkbox trigger
      control="collapsing[!hidden]"
      t="'Show the block' :pressed['Collapse the block']"></nu-btn>
    <nu-block id="collapsing" effect="collapse">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </nu-block>
  </nu-card>

  <nu-card as="section">
    <nu-heading>Hide self</nu-heading>
    <nu-block>
      <nu-btn control=":self">
        Hide myself
      </nu-btn>
    </nu-block>
  </nu-card>

  <nu-card as="section">
    <nu-heading>Toggle icon styles</nu-heading>
    <nu-pane>
      <nu-btn
        checkbox pressed clear
        control="light[color=text|special] light[size=3x|2x]">
        Toggle
      </nu-btn>
      <nu-icon id="light" name="sun"></nu-icon>
    </nu-pane>
  </nu-card>

  <nu-card as="section">
    <nu-heading>Slider value</nu-heading>

    <nu-block id="block"></nu-block>

    <nu-slider value="50" control="block[.innerText: units]"></nu-slider>
  </nu-card>

  <nu-card as="section">
    <nu-attrs for="icon" size="2x"></nu-attrs>
    <nu-heading>Toggle icon name</nu-heading>
    <nu-pane>
      <nu-btn
        role="checkbox" clear
        value="sun" off-value="moon"
        control="light[name=@]">
        Toggle
      </nu-btn>
      <nu-icon id="light" name="sun" type="fill"></nu-icon>
    </nu-pane>

    <nu-pane>
      <nu-btn
        role="checkbox" clear
        value="sun" off-value="moon"
        control="light[name=@]" trigger>
        Toggle with trigger
      </nu-btn>
      <nu-icon id="light" name="sun" type="fill"></nu-icon>
    </nu-pane>
  </nu-card>

  <nu-card as="section">
    <nu-heading>Toggle layout</nu-heading>

    <nu-debug id="debugger"></nu-debug>

    <nu-flex gap>
      <nu-btn
        role="checkbox" trigger nx-debug
        control="layout[columns=auto auto|repeat(4, auto)]">
        Toggle Layout
      </nu-btn>

      <nu-btn value="stretch" control="layout[content=@]" trigger>
        <nu-value list="options"></nu-value>
        <nu-popup padding="1x 0">
          <nu-listbox id="options" link-value>
            <nu-option value="stretch">Stretch</nu-option>
            <nu-option value="space-between">Space between</nu-option>
            <nu-option value="start">Start</nu-option>
            <nu-option value="end">End</nu-option>
          </nu-listbox>
        </nu-popup>
      </nu-btn>
    </nu-flex>
    <nu-block id="layout" display="grid" gap>
      <nu-card>
        First card
      </nu-card>

      <nu-card>
        Second card
      </nu-card>

      <nu-card>
        Third card
      </nu-card>

      <nu-card>
        Fourth card
      </nu-card>
    </nu-block>
  </nu-card>

  <nu-card as="section">
    <nu-btngroup value="auto" control=":root[data-nu-scheme=@]">
      <nu-btn value="auto">Auto</nu-btn>
      <nu-btn value="dark">Dark</nu-btn>
      <nu-btn value="light">Light</nu-btn>
    </nu-btngroup>
  </nu-card>
{/if}

{#if show(hash, 'form')}
  <nu-card as="section">
    <nu-form value={formData} on:input={submit} nx-debug="form-debugger0">
      <nu-theme name="error" hue="1" mod="tone"></nu-theme>
      <!--      <nu-attrs for="nu-check" theme="error"></nu-attrs>-->
      <nu-attrs for="nu-field" theme=":invalid[error]"></nu-attrs>

      <nu-heading level="4">Form</nu-heading>
      <nu-flow>
        <nu-input
          id="email" placeholder="Email address" grow="1"></nu-input>
        <nu-check for="email" assert="email">
          Should be a valid email address
        </nu-check>
      </nu-flow>
      <nu-field>
        <nu-inputgroup height="8x" padding="2.5x 1x 1x 1x">
          <nu-label
            place="top left 1x 2x" z="above" text="w5" origin="top left"
            scale="^:focus[.75] :empty[1] .75"
            move="^:focus[0] :empty[0 1.25x] 0"
            color="^:focus[text-soft] :empty[text 50%] text-soft"
            transition="theme, transform">
            Password
          </nu-label>
          <nu-input id="password" placeholder="" grow="1" mask></nu-input>
        </nu-inputgroup>
        <nu-check for="password" assert="required">
          Password is required
        </nu-check>
      </nu-field>
      <nu-field>
        <nu-label>Date of issue</nu-label>
        <nu-dateinput
          id="date" mode="range" width="min(10)"
          placeholder="Date range"></nu-dateinput>
      </nu-field>
      <nu-card>
        <nu-form id="user" nx-debug="form-debugger1">
          <nu-heading level="5">User</nu-heading>

          <nu-field>
            <nu-label for="name">User name</nu-label>
            <nu-inputgroup>
              <nu-icon name="user"></nu-icon>
              <nu-input id="name" grow="1"></nu-input>
            </nu-inputgroup>
            <nu-check for="name" assert="required">
              Name is required
            </nu-check>
            <nu-check for="name" assert="minlength:5">
              Name should contain at least 5 characters
            </nu-check>
          </nu-field>

          <nu-field>
            <nu-label>Period</nu-label>
            <nu-inputgroup>
              <nu-icon name="hash"></nu-icon>
              <nu-numinput id="period" unit="day" grow="1"></nu-numinput>
            </nu-inputgroup>
          </nu-field>

          <nu-pane gap>
            <nu-checkbox checked id="press" nx-debug="form-debugger3"></nu-checkbox>
            <nu-label for="press">Some checkbox</nu-label>
          </nu-pane>
        </nu-form>
      </nu-card>
      <nu-block>
        <nu-btn action="submit" special>Submit</nu-btn>
      </nu-block>
    </nu-form>
  </nu-card>

  <nu-grid columns="repeat(4, 1fr)||1fr 1fr" gap>
    <nu-debug id="form-debugger0" as="section"></nu-debug>
    <nu-debug id="form-debugger1" as="section"></nu-debug>
    <nu-debug id="form-debugger2" as="section"></nu-debug>
    <nu-debug id="form-debugger3" as="section"></nu-debug>
  </nu-grid>
{/if}

  <!--<nu-card as="section">-->
<!--  <nu-numinput value="15" code="USD"></nu-numinput>-->
<!--</nu-card>-->

{#if show(hash, 'progressbar')}
  <nu-card as="section">
    <nu-heading level="2">Progressbar</nu-heading>
    <nu-progressbar value="50"></nu-progressbar>
  </nu-card>
{/if}

{#if show(hash, 'slider')}
  <nu-card as="section">
    <nu-card padding="0" overflow="no">
      <nu-attrs for="$slider-cap" show="n"></nu-attrs>
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/after.jpg"></nu-img>
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/before.jpg"
              id="overlay" place="cover" height="100%" fit="cover left" border="2bw right color(special)"></nu-img>
      <nu-slider control="overlay[width:%] cap[--percent:%]" value="50" place="cover" height="100%" fill="clear" border="0"></nu-slider>
      <nu-circle id="cap" fill="special-bg" color="special-text" size="2" place="left top 50% --percent" move="(-50% + 1bw) 0" interactive="no">
        <nu-icon name="chevron-left" place="left" move="-.5x"></nu-icon>
        <nu-icon name="chevron-right" place="right" move=".5x"></nu-icon>
      </nu-circle>
    </nu-card>
  </nu-card>

  <nu-card as="section" gap>
    <nu-card padding="0" overflow="no">
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/after.jpg"></nu-img>
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/before.jpg"
              id="overlay" place="cover" height="100%" fit="cover left" border="2bw right color(special)"></nu-img>
    </nu-card>
    <nu-slider control="overlay[width:%]" value="50"></nu-slider>
  </nu-card>

  <nu-card as="section">
    <nu-heading level="2">Slider</nu-heading>
    <nu-slider value="50" nx-debug="slider-debug-h"></nu-slider>
    <nu-slider value="50" orient="v" nx-debug="slider-debug-v"></nu-slider>

    <nu-grid gap columns="1fr 1fr">
      <nu-debug id="slider-debug-h"></nu-debug>
      <nu-debug id="slider-debug-v"></nu-debug>
    </nu-grid>
  </nu-card>

{/if}

{#if show(hash, 'listbox')}
  <nu-card as="section">
    <nu-heading level="4">Plain listbox</nu-heading>

    <nu-listbox value="one">
      <nu-option value="one">One</nu-option>
      <nu-option value="two">Two</nu-option>
      <nu-option value="three">Three</nu-option>
    </nu-listbox>

    <nu-heading level="4">Select</nu-heading>

    <nu-btn width="10" columns="1fr auto" value="six">
      <nu-value list></nu-value>
      <nu-dropdownicon></nu-dropdownicon>
      <nu-popuplistbox nx-debug="debug-1">
        <nu-option value="one" nx-debug="debug-2">One</nu-option>
        <nu-option value="two">Two</nu-option>
        <nu-option value="three">Three</nu-option>
        <nu-option value="four">Four</nu-option>
        <nu-option value="five">Five</nu-option>
        <nu-option value="six">Six</nu-option>
        <nu-option value="seven">Seven</nu-option>
      </nu-popuplistbox>
    </nu-btn>

    <nu-grid columns="1cl 1cl" gap>
      <nu-debug id="debug-1"></nu-debug>
      <nu-debug id="debug-2"></nu-debug>
    </nu-grid>
  </nu-card>
{/if}

{#if show(hash, 'select')}
  <nu-card as="section">
    <nu-heading level="3">Select</nu-heading>

    <nu-btn id="select" nx-debug="debugger4" type="date">
      <nu-value></nu-value>
      <nu-popup nx-listbox type="date" nx-debug="select-debugger" link-value padding="1x 0">
        <nu-option value="05.10.2020">One</nu-option>
        <nu-option value="10.10.2020">Two</nu-option>
        <nu-option>
          Something else...
          <nu-popup nx-listbox place="outside-right -1x 0" link-value padding="1x 0">
            <nu-option value="05.11.2020">Three</nu-option>
          </nu-popup>
        </nu-option>
      </nu-popup>
    </nu-btn>

    <nu-btn id="select" type="date">
      <nu-value></nu-value>
      <nu-popup nx-listbox type="date" link-value padding="1x 0">
        <nu-option value="05.10.2020">One</nu-option>
        <nu-option value="10.10.2020">Two</nu-option>
      </nu-popup>
    </nu-btn>

    <nu-debug id="select-debugger"></nu-debug>

    <!--  <nu-card width="minmax(20, min-content)">-->
    <!--    <nu-datepicker mode="range" shadow-root="y" value={dateRange}></nu-datepicker>-->
    <!--  </nu-card>-->
    <!--  <nu-dateinput width="min(10)" mode="range"></nu-dateinput>-->
  </nu-card>
{/if}

  <!--<nu-card display="grid" columns="1fr 1fr 1fr" gap>-->
<!--  <nu-debug id="debugger4"></nu-debug>-->
<!--  <nu-debug id="debugger5"></nu-debug>-->
<!--  <nu-debug id="debugger6"></nu-debug>-->
<!--</nu-card>-->

<!--<nu-card as="section">-->
<!--  <nu-markdown>-->
<!--    <pre>-->
<!--# Something-->

<!--Something **bold**.-->

<!--```-->
<!--var a = '123';-->
<!--```-->
<!--    </pre>-->
<!--  </nu-markdown>-->
<!--</nu-card>-->

<!--<nu-card as="section">
  <nu-textarea value={inputValue}></nu-textarea>
</nu-card>

<nu-card as="section">
  <nu-blockquote>
    Say something!
    <nu-spacer></nu-spacer>
    <nu-block text="w6" size="md">Andrey Yamanov, Frontend Engineer at Sellerscale</nu-block>
  </nu-blockquote>
</nu-card>

<nu-heading level="2">Checkboxes</nu-heading>

<nu-card as="section">
  <nu-grid
    display="inline-grid" columns="auto auto" rows="auto auto" flow="column" gap="1x 2x">
    <nu-flex gap="1x" items="center">
      <nu-checkbox labelledby=":next"></nu-checkbox>
      <nu-label>Checkbox</nu-label>
    </nu-flex>

    <nu-flex gap="1x" items="center">
      <nu-checkbox labelledby=":next" pressed></nu-checkbox>
      <nu-label>Checked checkbox</nu-label>
    </nu-flex>

    <nu-flex gap="1x" items="center">
      <nu-checkbox labelledby=":next" disabled></nu-checkbox>
      <nu-label>Disabled checkbox</nu-label>
    </nu-flex>

    <nu-flex gap="1x" items="center">
      <nu-checkbox labelledby=":next" disabled checked></nu-checkbox>
      <nu-label>Disabled and checked checkbox</nu-label>
    </nu-flex>
  </nu-grid>
</nu-card>

<nu-heading level="2">Radio buttons</nu-heading>

<nu-card as="section" flow="row">
  <nu-grid
    display="inline-grid" columns="auto auto" gap="1x 2x">
    <nu-radiogroup flow="column" gap value="second">
      <nu-flex gap="1x" items="center">
        <nu-radio labelledby=":next" value="first"></nu-radio>
        <nu-label>First value</nu-label>
      </nu-flex>

      <nu-flex gap="1x" items="center">
        <nu-radio labelledby=":next" value="second"></nu-radio>
        <nu-label>Second value</nu-label>
      </nu-flex>

      <nu-flex gap="1x" items="center">
        <nu-radio labelledby=":next" value="third"></nu-radio>
        <nu-label>Third value</nu-label>
      </nu-flex>
    </nu-radiogroup>

    <nu-radiogroup flow="column" gap value="second">
      <nu-flex gap="1x" items="center">
        <nu-radio labelledby=":next" value="first" disabled></nu-radio>
        <nu-label>First value</nu-label>
      </nu-flex>

      <nu-flex gap="1x" items="center">
        <nu-radio labelledby=":next" value="second" disabled></nu-radio>
        <nu-label>Second value</nu-label>
      </nu-flex>

      <nu-flex gap="1x" items="center">
        <nu-radio labelledby=":next" value="third" disabled></nu-radio>
        <nu-label>Third value</nu-label>
      </nu-flex>
    </nu-radiogroup>
  </nu-grid>
</nu-card>-->

<script>
let inputValue = 'Some input value';
let user = {
  press: 2,
  name: '',
};
let hash = location.hash;
let formData = {
  email: 'tenphi@gmail.com',
  user,
};
let dateRange = [new Date, new Date('2020-05-10')];

function submit(event) {
  console.log('! form data submitted', event.detail);
}

window.addEventListener('hashchange', () => {
  hash = location.hash;
});

function show(hash, name) {
  return hash ? hash.includes(name) : true;
}
</script>
