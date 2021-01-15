<nu-heading>Playground</nu-heading>

{#if show('builtin')}
  <nu-heading level="2">Built-in Themes</nu-heading>

  <nu-card>
    <nu-pane flow="row wrap">
      <nu-btn success>Success</nu-btn>
      <nu-btn danger>Danger</nu-btn>
      <nu-btn warning>Warning</nu-btn>
      <nu-btn success clear>Clear Success</nu-btn>
      <nu-btn danger clear>Clear Danger</nu-btn>
      <nu-btn warning clear>Clear Warning</nu-btn>
      <nu-btn success special>Special Success</nu-btn>
      <nu-btn danger special>Special Danger</nu-btn>
      <nu-btn warning special>Special Warning</nu-btn>
    </nu-pane>
  </nu-card>
{/if}

{#if show('mark')}
  <nu-heading level="2">Marks</nu-heading>

  <nu-card>
    <nu-pane flow="row wrap">
      <nu-mark>Default Mark</nu-mark>
      <nu-mark special>Special Mark</nu-mark>
    </nu-pane>
  </nu-card>
{/if}

{#if show('badge')}
  <nu-heading level="2">Badges</nu-heading>

  <nu-card>
    <nu-pane flow="row wrap">
      <nu-badge>Default Badge</nu-badge>
      <nu-badge success>Success Badge</nu-badge>
      <nu-badge danger>Danger Badge</nu-badge>
      <nu-badge warning>Warning Badge</nu-badge>
      <nu-badge special>Special Badge</nu-badge>
    </nu-pane>
  </nu-card>
{/if}

{#if show('radius')}
  <nu-heading level="2">Radius</nu-heading>

  <nu-card>
    <nu-pane flow="row wrap">
      <nu-btn radius="leaf">Leaf</nu-btn>
      <nu-btn radius="backleaf">BackLeaf</nu-btn>
      <nu-btn radius="leaf 2r .5r">Custom Leaf</nu-btn>
    </nu-pane>
  </nu-card>
{/if}

{#if show('test-input')}
  <nu-heading level="2">Input test</nu-heading>

  <nu-card as="section">
    <nu-pane>
      <nu-input value={inputTestValue} on:input={evt => { inputTestValue = evt.detail; console.log('??', evt.detail) }}></nu-input>

      <nu-btn on:tap={() => { inputTestValue = '123' }}>Clear</nu-btn>

      <nu-block>{inputTestValue}</nu-block>
    </nu-pane>
  </nu-card>
{/if}

{#if show('button')}
  <nu-heading level="2">Button states</nu-heading>

  <nu-card as="section">
    <nu-pane flow="row wrap">
      <nu-btn use-action="no">Normal</nu-btn>
      <nu-btn use-action="n" is-hover mark>Hover</nu-btn>
      <nu-btn use-action="n" is-active>Pressed</nu-btn>
      <nu-btn use-action="n" is-pressed>Toggled</nu-btn>
      <nu-btn use-action="n" outline="focus" is-focus>Focused</nu-btn>
      <nu-btn use-action="n" disabled>Disabled</nu-btn>
    </nu-pane>

    <nu-pane flow="row wrap">
      <nu-btn>Default Button</nu-btn>
      <nu-btn special>Special Button</nu-btn>
      <nu-btn danger>Danger Button</nu-btn>
      <nu-btn danger special>Danger Special Button</nu-btn>
    </nu-pane>
  </nu-card>
{/if}

{#if show('group-radius')}
  <nu-heading level="2">Group radius</nu-heading>

  <nu-card as="section">
    <nu-props transition=".2s"></nu-props>
    <nu-attrs
      for="btn"
      shadow="0 0 0 1bw #border :pressed[0 0 0 1bw #special-bg]"
      fill="#bg :pressed[#special-bg]"
      z=":pressed[above]"
      border="n"
      color="#special :pressed[special-text]"
      inset="n :active[.75em] :pressed[n]"></nu-attrs>
    <nu-radiogroup
      value="0" display="inline-flex"
      group-radius="1r" border="#clear" gap="1bw" radius>
      <nu-btn>A</nu-btn>
      <nu-btn>B</nu-btn>
      <nu-btn>C</nu-btn>
    </nu-radiogroup>
  </nu-card>
{/if}

{#if show('format')}
  <nu-heading level="2">Formatting</nu-heading>

  <nu-card as="section">
    <nu-block><nu-num value="1234"></nu-num></nu-block>
    <nu-block><nu-num value="1234" grouping="no"></nu-num></nu-block>
  </nu-card>
{/if}

{#if show('group')}
  <nu-heading level="2">Group radius</nu-heading>

  <nu-card as="section">
    <nu-flex group-radius="column" flow="column">
      <nu-btn>1</nu-btn>
      <nu-btn>2</nu-btn>
    </nu-flex>
  </nu-card>
{/if}

{#if show('decoration')}
  <nu-heading level="2">Code</nu-heading>

  <nu-card as="section">
    <nu-el text="u #special.50" color="special">Special</nu-el>
  </nu-card>
{/if}

{#if show('snippet')}
  <nu-heading level="2">Code</nu-heading>

  <nu-card as="section">
    <nu-code special padding="1x 2x" overflow="auto">
      <pre>
        <nu-input is-big placeholder="Input"></nu-input>
        [[ ]] ## qqsdasd

        #[[something]]#
      </pre>
    </nu-code>
  </nu-card>
{/if}

{#if show('radio')}
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
  </nu-card>
{/if}

{#if show('color')}
  <nu-card as="section">
    <nu-props
      some-color="^root :high-contrast[hsl(1, 80%, 50%)] :low-contrast[hsl(180, 80%, 50%)]"
      custom-color="#aabbcc" other-color="color(custom)"></nu-props>
    <nu-props some-other-color="hue(1 100)"></nu-props>
    <nu-block height="5" fill="some 50%"></nu-block>
    <nu-block height="5" fill="#some-other"></nu-block>
  </nu-card>
{/if}

{#if show('outline')}
  <nu-card as="section">
    <nu-btn outline="focus">Focus</nu-btn>
    <nu-btn outline="focus 1x">Focus 1x</nu-btn>
    <nu-btn outline="focus #special">Focus Special</nu-btn>
    <nu-btn outline="inset focus">Inset</nu-btn>
    <nu-btn outline="focus visible">Focus visible</nu-btn>
    <nu-cardbtn outline="n">
      <nu-el outline="focus-outside" box="y">On focus outside</nu-el>
    </nu-cardbtn>
    <nu-card outline="focus-inside">
      On focus inside
      <nu-btn outline="n">Button</nu-btn>
    </nu-card>
  </nu-card>
{/if}

{#if show('overflow')}
  <nu-card as="section" width="10" height="10" overflow="no auto">
    <nu-card width="20" height="20"></nu-card>
  </nu-card>
{/if}

{#if show('base')}
  <nu-card as="section">
    <nu-base size="(100vw / 80)|1rem"></nu-base>
    Everybody is looking for something
  </nu-card>
{/if}

{#if show('snap')}
  <nu-grid columns="repeat(4, 1fr)" height="10rem" width="max 20" overflow="auto" snapping="x start"
           gap="2x">
    <nu-card height="100%" width="20" fill="hue(0)"></nu-card>
    <nu-card height="100%" width="20" fill="hue(90)"></nu-card>
    <nu-card height="100%" width="20" fill="hue(180)"></nu-card>
    <nu-card height="100%" width="20" fill="hue(270)"></nu-card>
  </nu-grid>
{/if}

{#if show('touch')}
  <nu-card as="section">
    <nu-btn toggle>
      Button
      <nu-tooltip>Tooltip</nu-tooltip>
    </nu-btn>
  </nu-card>
{/if}

{#if show('heading')}
  <nu-card as="section">
    <nu-props
      h1-font-size="2rem||1.75rem"
      h1-line-height="2.5rem"></nu-props>
    <nu-heading level="3">Heading</nu-heading>

    <nu-block color="hue(280 80)">
      <nu-heading level="4">Heading with inherited color</nu-heading>
      <nu-block>Paragraph text.</nu-block>

      <nu-block theme padding="left">
        <nu-heading level="4">Heading with inherited color</nu-heading>
        <nu-block>Paragraph text.</nu-block>
      </nu-block>
    </nu-block>
  </nu-card>
{/if}

{#if show('notifications')}
  <nu-block theme="tone" box="y" width="20">
    <nu-card width="100% - 4x" height="100%" place="top left 2x"></nu-card>
    <nu-card width="100% - 2x" height="100%" place="top left 1x"></nu-card>
    <nu-card gap>
      <nu-h6>
        <nu-icon name="message-circle"></nu-icon>
        <nu-strong>Susan</nu-strong>
      </nu-h6>
      <nu-block text="i">
        Can I call you now?
      </nu-block>
    </nu-card>
  </nu-block>
{/if}

{#if show('basics')}
  <nu-card as="section">
    <nu-el
      border
      radius
      padding="1x 2x"
      cursor="pointer"
      mark="hover"
      nx-active
      inset="active">
      Button
    </nu-el>
  </nu-card>
{/if}

{#if show('colors')}
  <nu-gridtable columns="auto auto 1fr" border text="nowrap">
    <nu-attrs for="cell" padding></nu-attrs>
    <nu-columnheader>Name</nu-columnheader>
    <nu-columnheader>Contrast</nu-columnheader>
    <nu-columnheader></nu-columnheader>
    <nu-cell>system-black</nu-cell>
    <nu-cell>~MIN~</nu-cell>
    <nu-cell fill="#system-black"></nu-cell>
    <nu-cell>black</nu-cell>
    <nu-cell>100</nu-cell>
    <nu-cell fill="#black"></nu-cell>
    <nu-cell>dark</nu-cell>
    <nu-cell>85</nu-cell>
    <nu-cell fill="#dark"></nu-cell>
    <nu-cell>darkgrey</nu-cell>
    <nu-cell>high</nu-cell>
    <nu-cell fill="#darkgrey"></nu-cell>
    <nu-cell>grey</nu-cell>
    <nu-cell>auto</nu-cell>
    <nu-cell fill="#grey"></nu-cell>
    <nu-cell>lightgrey</nu-cell>
    <nu-cell>low</nu-cell>
    <nu-cell fill="#lightgrey"></nu-cell>
    <nu-cell>light</nu-cell>
    <nu-cell>5</nu-cell>
    <nu-cell fill="#light"></nu-cell>
    <nu-cell>white</nu-cell>
    <nu-cell>0</nu-cell>
    <nu-cell fill="#white"></nu-cell>
    <nu-cell>system-white</nu-cell>
    <nu-cell>~MAX~</nu-cell>
    <nu-cell fill="#system-white"></nu-cell>
  </nu-gridtable>

  <nu-card gap="2x">
    <nu-block color="success">Success text</nu-block>
    <nu-block color="danger">Danger text</nu-block>
    <nu-block color="warning">Warning text</nu-block>
    <nu-block color="white" fill="success-bg">Success special bg</nu-block>
    <nu-block color="white" fill="danger-bg">Danger special bg</nu-block>
    <nu-block color="white" fill="warning-bg">Warning special bg</nu-block>
  </nu-card>
{/if}

{#if show('nav')}
  <nu-nav as="section">
    <nu-menu flow="row">
      <nu-attrs for="menuitem" border="0 :current[1sw bottom inside #special]"></nu-attrs>
      <nu-menuitem to="/">Home</nu-menuitem>
      <nu-menuitem to="/about">About</nu-menuitem>
    </nu-menu>
  </nu-nav>
{/if}

{#if show('borders')}
  <nu-flow gap>
    <nu-flex gap>
      <nu-attrs for="nu-block" height="3" width="3" fill="subtle"></nu-attrs>

      <nu-block radius="round" border="1x hue(320)"></nu-block>
      <nu-block radius="round" border="1x top #special"></nu-block>
      <nu-block radius="round" border="1x right #special"></nu-block>
      <nu-block radius="round" border="1x bottom #special"></nu-block>
      <nu-block radius="round" border="1x left #special"></nu-block>
    </nu-flex>

    <nu-flex gap>
      <nu-attrs for="nu-block" height="5" width="3" fill="subtle"></nu-attrs>
      <nu-block radius="round" border="1x #special"></nu-block>
      <nu-block radius="round" border="1x top #special"></nu-block>
      <nu-block radius="round" border="1x right #special"></nu-block>
      <nu-block radius="round" border="1x bottom #special"></nu-block>
      <nu-block radius="round" border="1x left #special"></nu-block>
    </nu-flex>
  </nu-flow>
{/if}

{#if show('code')}
  <nu-card>
    <nu-markdown>
      <pre>
        # What?

        ```
        var a = #[['123']]#;
        var b = /.+/g;
        ```
      </pre>
    </nu-markdown>
  </nu-card>
{/if}

{#if show('appear')}
  <nu-card>
    <nu-block height="100vh"></nu-block>
    <nu-btn nx-appear="toggle timeout(1000)" opacity="0 :appear[1]" move="8x 0 :appear[0]"
            transition="opacity .5s, move .5s">Button
    </nu-btn>
    <nu-block height="100vh"></nu-block>
  </nu-card>
{/if}

{#if show('offset')}
  <nu-card>
    <nu-cardbtn
      nx-offset transition="move :offset[no]"
      move="(--offset-x * 1x) (--offset-y * 1x)" height="5" width="15" display="grid"
      items="center">
      Interactive button
    </nu-cardbtn>
  </nu-card>
{/if}

{#if show('menu')}
  <nu-nav label="Main">
    <nu-menu padding="1x 0" border width="12" nx-debug>
      <nu-menuitem>Item 1</nu-menuitem>
      <nu-menuitem>Item 2</nu-menuitem>
      <nu-menuitem>Item 3</nu-menuitem>
      <nu-menuitem>
        Item 4
        <nu-popup>
          <nu-menu>
            <nu-menuitem>Item 1</nu-menuitem>
            <nu-menuitem>
              Item 2
              <nu-popup>
                <nu-menu>
                  <nu-menuitem>Item 1</nu-menuitem>
                  <nu-menuitem>Item 2</nu-menuitem>
                </nu-menu>
              </nu-popup>
            </nu-menuitem>
          </nu-menu>
        </nu-popup>
      </nu-menuitem>
    </nu-menu>
  </nu-nav>

  <nu-debug></nu-debug>
{/if}

{#if show('spacer')}
  <nu-block>
    <nu-card>
      Card 1
    </nu-card>
    <nu-spacer size="2x"></nu-spacer>
    <nu-card>
      Card 2
    </nu-card>
  </nu-block>
{/if}

{#if show('circle')}
  <nu-card>
    <nu-pane gap>
      <nu-circle></nu-circle>
      <nu-circle size="xl"></nu-circle>
      <nu-circle special></nu-circle>
    </nu-pane>
  </nu-card>
{/if}

{#if show('gradients')}
  <nu-flow gap="2x" size="lg">
    <nu-attrs
      for="slider" width="15" min="0" max="359"
      image="linear(to right, hue(0), hue(90), hue(180), hue(270), hue(0))"></nu-attrs>
    <nu-grid columns="auto 1fr" gap="1x" items="center start">
      <nu-el>From</nu-el>
      <nu-slider fill="--from" value="280" control="props[from=hue(@ special)]"></nu-slider>
      <nu-el>To</nu-el>
      <nu-slider fill="--to" value="320" control="props[to=hue(@ special)]"></nu-slider>
      <nu-el>Angle</nu-el>
      <nu-slider image value="345" control="props[angle=@deg]"></nu-slider>
    </nu-grid>
    <nu-props id="props" fill="special"></nu-props>
    <nu-card
      clear color="special-text" size="xl" text="h" radius="3x" width="15" height="15"
      shadow="special"
      transition="fill .15s, shadow"
      image="linear(--angle, --from, --to)">
      Heading
    </nu-card>
    <!--    <nu-card-->
    <!--      clear color="special-text" size="xl" text="h" radius="3x" width="15" height="15"-->
    <!--      shadow="special"-->
    <!--      transition="fill .15s, shadow"-->
    <!--      image="linear(-15deg, hue(280 100% pastel special), hue(320 special))">-->
    <!--      Heading-->
    <!--    </nu-card>-->
  </nu-flow>
{/if}

{#if show('shadow')}
  <nu-card gap="2x" text="b" padding="4x">
    <nu-card shadow=".25">CARD</nu-card>
    <nu-card shadow=".5">CARD</nu-card>
    <nu-card shadow="1">CARD</nu-card>
    <nu-card shadow="2">CARD</nu-card>
  </nu-card>

  <nu-card gap="2x" padding="4x">
    <nu-cardbtn shadow=".25" border="0" special>CARD</nu-cardbtn>
    <nu-cardbtn shadow=".5" border="0" special>CARD</nu-cardbtn>
    <nu-cardbtn shadow="1" border="0" special>CARD</nu-cardbtn>
    <nu-cardbtn shadow="2" border="0" special>CARD</nu-cardbtn>
  </nu-card>
{/if}

<!--{#if show('theme')}-->
<!--  <nu-theme name="positive" hue="sadf" mod="special"></nu-theme>-->

<!--  <nu-card theme="positive">-->
<!--    Special card-->
<!--  </nu-card>-->
<!--{/if}-->

{#if show('clamp')}
  <nu-card>
    <nu-block line-clamp="2" width="max 10">
      sdfasdf af sadg asdigaso ifasoifsadoiu asdfiuosf sdos sf sdof asoif sadf
    </nu-block>
  </nu-card>
{/if}

{#if show('table')}
  <nu-card>
    <nu-table>
      <nu-rowgroup>
        <nu-row>
          <nu-tableheader></nu-tableheader>
          <nu-columnheader>Two</nu-columnheader>
        </nu-row>
      </nu-rowgroup>
      <nu-rowgroup>
        <nu-row>
          <nu-rowheader>One</nu-rowheader>
          <nu-cell>Two</nu-cell>
        </nu-row>
      </nu-rowgroup>
    </nu-table>
  </nu-card>

  <nu-card>
    <nu-h3>Grid Table</nu-h3>
    <nu-gridtable columns="auto 1fr">
      <nu-tableheader></nu-tableheader>
      <nu-columnheader>Two</nu-columnheader>
      <nu-rowheader>One</nu-rowheader>
      <nu-cell>Two</nu-cell>
    </nu-gridtable>
  </nu-card>

  <nu-card height="100vh + 4x" padding="1x 0">
    <nu-attrs
      for="columnheader"
      place="sticky top" z="above" fade="0 :sticky[bottom #shadow]"></nu-attrs>
    <nu-attrs for="content" width="30vw"></nu-attrs>
    <nu-table box="y" overflow="scroll-x">
      <nu-rowgroup>
        <nu-row>
          <nu-tableheader></nu-tableheader>
          <nu-columnheader>
            <nu-el as="content">Two</nu-el>
          </nu-columnheader>
          <nu-columnheader>
            <nu-el as="content">Two</nu-el>
          </nu-columnheader>
          <nu-columnheader>
            <nu-el as="content">Two</nu-el>
          </nu-columnheader>
          <nu-columnheader>
            <nu-el as="content">Two</nu-el>
          </nu-columnheader>
        </nu-row>
      </nu-rowgroup>
      <nu-rowgroup>
        <nu-row>
          <nu-rowheader>One</nu-rowheader>
          <nu-cell>Two</nu-cell>
        </nu-row>
      </nu-rowgroup>
    </nu-table>
  </nu-card>
{/if}

{#if show('datepicker')}
  <nu-card>
    <nu-datepicker mode="range" shadow-root="y" value={dateRange}></nu-datepicker>
  </nu-card>
{/if}

{#if show('collapse')}
  <nu-block>
    <nu-attrs for="btn" clear="" control="description" padding="" text="wrap" pressing=":active[1]"
              width="100%" content="start"></nu-attrs>
    <nu-attrs for="container" gap="" padding="0 0 3x 6x||0 0 2x 5x"></nu-attrs>

    <nu-flow gap="">
      <nu-btn toggle>
        <nu-dropdownicon></nu-dropdownicon>
        <nu-el text="h" size="h4">You probably
          <nu-el text="u">need</nu-el>
          a&nbsp;design&nbsp;system
        </nu-el>
      </nu-btn>

      <nu-flow id="description" as="container" hidden>
        <nu-block>
          Modern web development is complex. To&nbsp;grow fast you have to&nbsp;iterate fast. Design&nbsp;system
          allows&nbsp;you to&nbsp;have control over your&nbsp;design and&nbsp;code increasing
          quality of code base and minimizing tech debt.
        </nu-block>

        <nu-block>
          <nu-strong>NuML</nu-strong>
          gives you insane level of
          <nu-strong>consistency</nu-strong>
          and
          <nu-strong>controllability</nu-strong>
          . This will make it easier for you to scale your application as it grows.
        </nu-block>
      </nu-flow>
    </nu-flow>

    <!--    <nu-flow gap="">-->
    <!--      <nu-btn toggle="">-->
    <!--        <nu-dropdownicon></nu-dropdownicon>-->
    <!--        <nu-heading>Creating and maintaining a&nbsp;design&nbsp;system on your own is&nbsp;tough</nu-heading>-->
    <!--      </nu-btn>-->

    <!--      <nu-flow id="description" as="container" hidden>-->
    <!--        <nu-block>-->
    <!--          It consumes a lot of time and requires high&nbsp;level of&nbsp;expertise in your team.-->
    <!--        </nu-block>-->

    <!--        <nu-block>-->
    <!--          With <nu-b>NuML</nu-b> you'll get full-featured Design&nbsp;System with a <nu-b>bunch of elements and components</nu-b> <nu-link to="!/guide/getting-started">in seconds</nu-link>.-->
    <!--        </nu-block>-->
    <!--      </nu-flow>-->
    <!--    </nu-flow>-->

    <!--    <nu-flow gap="">-->
    <!--      <nu-btn toggle="">-->
    <!--        <nu-dropdownicon></nu-dropdownicon>-->
    <!--        <nu-heading>Customization & future-proof are requirements</nu-heading>-->
    <!--      </nu-btn>-->

    <!--      <nu-block id="description" as="container" hidden="">-->
    <!--        In <nu-b>NuML</nu-b> everything is <nu-b>customizable</nu-b> to&nbsp;the&nbsp;core and uses generation techniques to&nbsp;give you the&nbsp;newest features of&nbsp;the&nbsp;platform (like <nu-b>Flex gap</nu-b>). It means the&nbsp;markup of&nbsp;your project will&nbsp;be up-to-date with <nu-b>the&nbsp;latest web&nbsp;standards</nu-b> and <nu-b>best&nbsp;practices</nu-b> for at least the <nu-b>next decade</nu-b>.-->
    <!--      </nu-block>-->
    <!--    </nu-flow>-->

    <!--    <nu-flow gap="">-->
    <!--      <nu-btn toggle="">-->
    <!--        <nu-dropdownicon></nu-dropdownicon>-->
    <!--        <nu-heading>There is <nu-u>no</nu-u> time to wait</nu-heading>-->
    <!--      </nu-btn>-->

    <!--      <nu-flow id="description" as="container" hidden="">-->
    <!--        <nu-block>-->
    <!--          <nu-b>NuML</nu-b> don't require a build step. Everything is happening in runtime.-->
    <!--        </nu-block>-->

    <!--        <nu-block>-->
    <!--          Simply <nu-link>add NuML script</nu-link> to your page and <nu-b>start prototyping</nu-b>.-->
    <!--        </nu-block>-->

    <!--        <nu-block>-->
    <!--          All the <nu-b>CSS</nu-b> will be generated <nu-b>instantly</nu-b> as needed. All the <nu-b>JS</nu-b> for behaviors will be loaded <nu-b>dynamically</nu-b>.-->
    <!--        </nu-block>-->
    <!--      </nu-flow>-->
    <!--    </nu-flow>-->
  </nu-block>
{/if}

{#if show('custom-themes')}
  <nu-card as="section" gap="2x">
    <nu-heading level="2">Custom themes</nu-heading>

    <nu-theme name="success1" hue="130" mod="tone dim"></nu-theme>
    <nu-theme name="danger1" hue="1" mod="special strong"></nu-theme>

    <nu-flow gap>
      <nu-card theme="success1">
        Everything is ok!
      </nu-card>

      <nu-card theme="danger1">
        Something went dramatically wrong!
      </nu-card>
    </nu-flow>
  </nu-card>
{/if}

{#if show('button-themes')}
  <nu-card as="section" gap="2x">
    <nu-heading level="2">Buttons</nu-heading>
    <nu-heading level="4">Button states</nu-heading>
    <nu-card display="flex" gap flow="column" shadow>
      <nu-h5>Main</nu-h5>
      <nu-description>Text example.</nu-description>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn>Button</nu-btn>
          <nu-btn mark="y">Hover</nu-btn>
          <nu-btn inset>Pressed</nu-btn>
          <nu-btn outline="y">Focus</nu-btn>
          <nu-btn disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn special>Button</nu-btn>
          <nu-btn special mark="y">Hover</nu-btn>
          <nu-btn special inset="special">Pressed</nu-btn>
          <nu-btn special outline="y">Focus</nu-btn>
          <nu-btn special disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn clear>Button</nu-btn>
          <nu-btn clear mark="y">Hover</nu-btn>
          <nu-btn clear inset>Pressed</nu-btn>
          <nu-btn clear outline="y">Focus</nu-btn>
          <nu-btn clear disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-input placeholder="Input"></nu-input>
      <nu-input disabled placeholder="Disabled input"></nu-input>
      <nu-input special placeholder="Special Input"></nu-input>
      <nu-input disabled special placeholder="Disabled special input"></nu-input>
    </nu-card>
    <nu-card display="flex" gap flow="column" shadow theme="tint">
      <nu-h5>Tint</nu-h5>
      <nu-description>Text example.</nu-description>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn>Button</nu-btn>
          <nu-btn mark="y">Hover</nu-btn>
          <nu-btn inset>Pressed</nu-btn>
          <nu-btn outline="y">Focus</nu-btn>
          <nu-btn disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn special>Button</nu-btn>
          <nu-btn special mark="y">Hover</nu-btn>
          <nu-btn special inset="special">Pressed</nu-btn>
          <nu-btn special outline="y">Focus</nu-btn>
          <nu-btn special disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn clear>Button</nu-btn>
          <nu-btn clear mark="y">Hover</nu-btn>
          <nu-btn clear inset>Pressed</nu-btn>
          <nu-btn clear outline="y">Focus</nu-btn>
          <nu-btn clear disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-input placeholder="Input"></nu-input>
      <nu-input disabled placeholder="Disabled input"></nu-input>
      <nu-input special placeholder="Special Input"></nu-input>
      <nu-input disabled special placeholder="Disabled special input"></nu-input>
    </nu-card>
    <nu-card display="flex" gap flow="column" shadow theme="tone">
      <nu-h5>Tone</nu-h5>
      <nu-description>Text example.</nu-description>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn>Button</nu-btn>
          <nu-btn mark="y">Hover</nu-btn>
          <nu-btn inset>Pressed</nu-btn>
          <nu-btn outline="y">Focus</nu-btn>
          <nu-btn disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn special>Button</nu-btn>
          <nu-btn special mark="y">Hover</nu-btn>
          <nu-btn special inset="special">Pressed</nu-btn>
          <nu-btn special outline="y">Focus</nu-btn>
          <nu-btn special disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn clear>Button</nu-btn>
          <nu-btn clear mark="y">Hover</nu-btn>
          <nu-btn clear inset>Pressed</nu-btn>
          <nu-btn clear outline="y">Focus</nu-btn>
          <nu-btn clear disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-input placeholder="Input"></nu-input>
      <nu-input disabled placeholder="Disabled input"></nu-input>
      <nu-input special placeholder="Special Input"></nu-input>
      <nu-input disabled special placeholder="Disabled special input"></nu-input>
    </nu-card>
    <nu-card display="flex" gap flow="column" shadow theme="swap">
      <nu-h5>Swap</nu-h5>
      <nu-description>Text example.</nu-description>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn>Button</nu-btn>
          <nu-btn mark="y">Hover</nu-btn>
          <nu-btn inset>Pressed</nu-btn>
          <nu-btn outline="y">Focus</nu-btn>
          <nu-btn disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn special>Button</nu-btn>
          <nu-btn special mark="y">Hover</nu-btn>
          <nu-btn special inset="special">Pressed</nu-btn>
          <nu-btn special outline="y">Focus</nu-btn>
          <nu-btn special disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn clear>Button</nu-btn>
          <nu-btn clear mark="y">Hover</nu-btn>
          <nu-btn clear inset>Pressed</nu-btn>
          <nu-btn clear outline="y">Focus</nu-btn>
          <nu-btn clear disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-input placeholder="Input"></nu-input>
      <nu-input disabled placeholder="Disabled input"></nu-input>
      <nu-input special placeholder="Special Input"></nu-input>
      <nu-input disabled special placeholder="Disabled special input"></nu-input>
    </nu-card>
    <nu-card display="flex" gap flow="column" shadow theme="special">
      <nu-h5>Special</nu-h5>
      <nu-description>Text example.</nu-description>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn>Button</nu-btn>
          <nu-btn mark="y">Hover</nu-btn>
          <nu-btn inset>Pressed</nu-btn>
          <nu-btn outline="y">Focus</nu-btn>
          <nu-btn disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn special>Button</nu-btn>
          <nu-btn special mark="y">Hover</nu-btn>
          <nu-btn special inset="special">Pressed</nu-btn>
          <nu-btn special outline="y">Focus</nu-btn>
          <nu-btn special disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-block>
        <nu-flex flow="row wrap" gap>
          <nu-btn clear>Button</nu-btn>
          <nu-btn clear mark="y">Hover</nu-btn>
          <nu-btn clear inset>Pressed</nu-btn>
          <nu-btn clear outline="y">Focus</nu-btn>
          <nu-btn clear disabled>Disabled</nu-btn>
        </nu-flex>
      </nu-block>
      <nu-input placeholder="Input"></nu-input>
      <nu-input disabled placeholder="Disabled input"></nu-input>
      <nu-input special placeholder="Special Input"></nu-input>
      <nu-input disabled special placeholder="Disabled special input"></nu-input>
    </nu-card>
    <nu-heading level="4">Toggle buttons</nu-heading>
    <nu-flex gap flow="row wrap">
      <nu-btn toggle>Non-pressed toggle button</nu-btn>
      <nu-btn toggle pressed>Pressed toggle button</nu-btn>
      <nu-btn toggle disabled>Disabled toggle button</nu-btn>
      <nu-btn toggle disabled pressed>Disabled pressed toggle button</nu-btn>
    </nu-flex>
  </nu-card>
{/if}

{#if show('space-around')}
  <nu-card as="section" gap>
    <nu-block>
      There should be a gap between cards
    </nu-block>
    <nu-card place="space-around" width="20">Space around</nu-card>
    <nu-card space="around" width="20">Space around</nu-card>
    <nu-card place="space-around" width="20">Space around</nu-card>
  </nu-card>
{/if}

{#if show('icon')}
  <nu-card as="section">
    <nu-heading level="4">Icons</nu-heading>

    <nu-heading level="5">Ionicons</nu-heading>

    Uses IonIcons library.

    <nu-block size="xl">
      <nu-icon name="accessibility-outline :hover[accessibility]" use-hover></nu-icon>
      <nu-icon name="aperture-outline :hover[aperture]" use-hover></nu-icon>
      <nu-icon name="basketball-outline :hover[basketball]" use-hover></nu-icon>
      <nu-icon name="calendar-outline :hover[calendar]" use-hover></nu-icon>
      Text to align
    </nu-block>

    <nu-heading level="5">Feather</nu-heading>

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

{#if show('tabs')}
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
      <nu-block id="one" effect="collapse">One</nu-block>
      <nu-block id="two" effect="collapse">Two</nu-block>
      <nu-block id="three" effect="collapse">Three</nu-block>
    </nu-block>

    <!--    <nu-router>-->
    <!--      <nu-block id=""></nu-block>-->
    <!--    </nu-router>-->
  </nu-card>
{/if}

{#if show('width') || show('height')}
  <nu-card width="max 20">
    Something
  </nu-card>
{/if}

{#if show('weight')}
  <nu-card>
    <nu-heading level="3">Font
      <nu-u>weight</nu-u>
    </nu-heading>

    <nu-heading level="4" text="w6">Redefined</nu-heading>

    <nu-heading level="4" text="u">Styled</nu-heading>

    <nu-link>Simple link</nu-link>

    <nu-link text="i">Styled link</nu-link>

    <nu-link text="w7">Redefined link</nu-link>
  </nu-card>
{/if}

{#if show('place')}
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

{#if show('image')}
  <nu-card id="section">
    <nu-heading>Images</nu-heading>

    <nu-grid columns="1fr 1fr||1fr" gap="2x">
      <nu-heading level="4">Raster image</nu-heading>
      <nu-heading level="4">Vector image</nu-heading>
      <nu-block>
        <nu-img
          class="nu-dark-invert"
          src={pngImages.logo}
          width="100%"
          loading="lazy"
          label="NUDE Elements Design System Playground">
        </nu-img>
      </nu-block>
      <nu-block>
        <nu-svg
          id="logo-vector"
          color="text-soft"
          src={svgImages.logo}
          width="100%"
          height="min 3"
          label="NUDE Elements Design System Playground">
        </nu-svg>
      </nu-block>
    </nu-grid>
    <nu-heading level="4">Background image</nu-heading>
    <nu-block
      class="nu-dark-invert"
      image="no-repeat left center / contain url({pngImages.logo})"
      height="4">
    </nu-block>
  </nu-card>
{/if}

{#if show('switch')}
  <nu-card as="section">
    <nu-heading>Switches</nu-heading>

    <nu-block>
      <nu-switch checked={false}/>
      <nu-switch checked={true}/>
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

{#if show('markdown')}
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

And markdown **TEXT**. What do you _think_? `var a = '123'`. Also here is a [link](https://github.com/numldesign/numl).

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

And markdown **TEXT**. What do you _think_? `var a = '123'`. Also here is a [link](https://github.com/numldesign/numl).

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

{#if show('control')}
  <nu-card as="section">
    <nu-props transition=".9s"></nu-props>
    <nu-heading>Collapsing Custom Effect</nu-heading>
    <nu-btn
      toggle trigger
      control="collapsing[!hidden]"
      t="'Show the block' :pressed['Collapse the block']"></nu-btn>
    <nu-block id="collapsing" opacity="1 :hidden[0]" transition="opacity, move" move="0 0 :enter[0 -5x] :leave[0 5x]" hidden>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </nu-block>
  </nu-card>

  <nu-card as="section">
    <nu-props transition=".4s"></nu-props>
    <nu-heading>Collapsing</nu-heading>
    <nu-btn
      toggle trigger
      control="collapsing[!hidden]"
      t="'Show the block' :pressed['Collapse the block']"></nu-btn>
    <nu-block id="collapsing" effect="collapse">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
        toggle pressed clear
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
        id="test"
        toggle clear
        value="sun" off-value="moon"
        control="light[name]">
        Toggle
      </nu-btn>
      <nu-icon id="light" name="sun" type="fill"></nu-icon>
    </nu-pane>

    <nu-pane>
      <nu-btn
        toggle clear
        value="sun" off-value="moon"
        control="light[name]" trigger>
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
        toggle trigger use-debug
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

{#if show('form')}
  <!--  <nu-card>-->
  <!--    <nu-datepicker mode="range" shadow-root="y" value={dateRange}></nu-datepicker>-->
  <!--  </nu-card>-->

  <nu-card as="section">
    <nu-flex gap>
      <nu-input></nu-input>
      <nu-btn>Submit</nu-btn>
    </nu-flex>
  </nu-card>

  <nu-card as="section">
    <nu-card gap>
      <nu-h3>Basic form</nu-h3>
      <nu-form control="output[.value]" gap="1x" type="formdata">
        <nu-field>
          <nu-label>Password</nu-label>
          <nu-password id="password" grow="1"></nu-password>
        </nu-field>
        <nu-field>
          <nu-label>Phone</nu-label>
          <nu-telinput id="phone" grow="1"></nu-telinput>
        </nu-field>
        <nu-field>
          <nu-label>Full name</nu-label>
          <nu-input id="name"/>
        </nu-field>
        <nu-field>
          <nu-label>One time code</nu-label>
          <nu-onetimecode id="onetimecode"/>
        </nu-field>
        <nu-field>
          <nu-label>Email</nu-label>
          <nu-emailinput id="email"/>
        </nu-field>
        <nu-field>
          <nu-label>Cover letter (optional)</nu-label>
          <nu-textarea id="coverLetter"/>
        </nu-field>
        <nu-field>
          <nu-label>LinkedIn Profile (optional)</nu-label>
          <nu-input id="linkedInUrl"/>
        </nu-field>
          <nu-field>
          <nu-label>CV/Resume</nu-label>
          <nu-fileinput id="files" />
        </nu-field>
        <nu-btn special action="submit">Submit</nu-btn>
      </nu-form>
      <nu-block overflow="auto" scrollbar width="max 16">
        <nu-value id="output"></nu-value>
      </nu-block>
    </nu-card>
  </nu-card>

  <nu-card as="section">
    <nu-form value={formData} on:input={submit} use-debug="form-debugger0">
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
          <nu-password id="password" placeholder="" grow="1"></nu-password>
        </nu-inputgroup>
        <nu-check for="password" assert="required">
          Password is required
        </nu-check>
      </nu-field>
      <nu-field>
        <nu-label>Date of issue</nu-label>
        <nu-dateinput mode="range" width="min 10"
                      placeholder="Date range"></nu-dateinput>
      </nu-field>
      <nu-card>
        <nu-form id="user" use-debug="form-debugger1">
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
            <nu-check for="name" assert={customValidator}>
              Name should pass custom validator
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
            <nu-checkbox checked id="press" use-debug="form-debugger3"></nu-checkbox>
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

{#if show('progressbar')}
  <nu-card as="section">
    <nu-heading level="2">Progressbar</nu-heading>
    <nu-progressbar value="50"></nu-progressbar>
  </nu-card>
{/if}

{#if show('slider')}
  <nu-card as="section">
    <nu-card padding="0" overflow="no" selectable="n">
      <nu-attrs for="$slider-cap" show="n"></nu-attrs>
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/after.jpg"></nu-img>
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/before.jpg"
              id="overlay" place="cover" height="100%" fit="cover left"
              border="2bw right color(special)"></nu-img>
      <nu-slider control="overlay[width:%] cap[--percent:%]" value="50" place="cover" height="100%"
                 fill="clear" border="0" mark="n"></nu-slider>
      <nu-circle id="cap" fill="special-bg" color="special-text" size="2"
                 place="left top 50% --percent" move="(-50% + 1bw) 0" interactive="no">
        <nu-icon name="chevron-left" place="left" move="-.5x"></nu-icon>
        <nu-icon name="chevron-right" place="right" move=".5x"></nu-icon>
      </nu-circle>
    </nu-card>
  </nu-card>

  <nu-card as="section" gap selectable="n">
    <nu-card padding="0" overflow="no">
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/after.jpg"></nu-img>
      <nu-img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/before.jpg"
              id="overlay" place="cover" height="100%" fit="cover left"
              border="2bw right color(special)"></nu-img>
    </nu-card>
    <nu-slider control="overlay[width:%]" value="50"></nu-slider>
  </nu-card>

  <nu-card as="section">
    <nu-heading level="2">Slider</nu-heading>
    <nu-slider value="50" use-debug="slider-debug-h"></nu-slider>
    <nu-slider value="50" orient="v" use-debug="slider-debug-v"></nu-slider>

    <nu-grid gap columns="1fr 1fr">
      <nu-debug id="slider-debug-h"></nu-debug>
      <nu-debug id="slider-debug-v"></nu-debug>
    </nu-grid>
  </nu-card>

{/if}

{#if show('listbox')}
  <nu-card as="section">
    <nu-heading level="4">Plain listbox</nu-heading>

    <nu-listbox value="one" label="Choose a number:">
      <nu-option value="one">One</nu-option>
      <nu-option value="two">Two</nu-option>
      <nu-option value="three">Three</nu-option>
    </nu-listbox>

    <nu-spacer></nu-spacer>

    <nu-heading level="4">Listbox with multiple value</nu-heading>

    <nu-listbox value="one, two" label="Choose a number:" multiple>
      <nu-option value="one">One</nu-option>
      <nu-option value="two">Two</nu-option>
      <nu-option value="three">Three</nu-option>
    </nu-listbox>

    <nu-spacer></nu-spacer>

    <nu-flow gap>
      <nu-heading level="4">Select</nu-heading>

      <nu-label for="comboxbox">
        Choose a number:
      </nu-label>
      <nu-btn id="comboxbox" width="10" columns="1fr auto" value="six" labelledby="value">
        <nu-value list></nu-value>
        <nu-dropdownicon></nu-dropdownicon>
        <nu-popuplistbox labelledby="label">
          <nu-option value="one">One</nu-option>
          <nu-option value="two">Two</nu-option>
          <nu-option value="three">Three</nu-option>
          <nu-option value="four">Four</nu-option>
          <nu-option value="five">Five</nu-option>
          <nu-option value="six">Six</nu-option>
          <nu-option value="seven">Seven</nu-option>
        </nu-popuplistbox>
      </nu-btn>
    </nu-flow>

    <nu-spacer></nu-spacer>

    <nu-flow gap>
      <nu-heading level="4">Multi-Select</nu-heading>

      <nu-label for="comboxbox">
        Choose a number:
      </nu-label>
      <nu-btn id="comboxbox" width="10 20" text="wrap" columns="1fr auto" value="six, four" labelledby="value">
        <nu-attrs for="badge" special></nu-attrs>
        <nu-value list placeholder="select options..."></nu-value>
        <nu-dropdownicon></nu-dropdownicon>
        <nu-popuplistbox multiple labelledby="label">
          <nu-option value="one">One</nu-option>
          <nu-option value="two">Two</nu-option>
          <nu-option value="three">Three</nu-option>
          <nu-option value="four">Four</nu-option>
          <nu-option value="five">Five</nu-option>
          <nu-option value="six">Six</nu-option>
          <nu-option value="seven">Seven</nu-option>
        </nu-popuplistbox>
      </nu-btn>
    </nu-flow>
  </nu-card>
{/if}

{#if show('select')}
  <nu-card as="section">
    <nu-heading level="3">Select</nu-heading>

    <nu-btn id="select" use-debug="debugger4" type="date">
      <nu-value></nu-value>
      <nu-popup use-listbox type="date" use-debug="select-debugger" link-value padding="1x 0">
        <nu-option value="05.10.2020">One</nu-option>
        <nu-option value="10.10.2020">Two</nu-option>
        <nu-option>
          Something else...
          <nu-popup use-listbox place="outside-right -1x 0" link-value padding="1x 0">
            <nu-option value="05.11.2020">Three</nu-option>
          </nu-popup>
        </nu-option>
      </nu-popup>
    </nu-btn>

    <nu-btn id="select" type="date">
      <nu-value></nu-value>
      <nu-popup use-listbox type="date" link-value padding="1x 0">
        <nu-option value="05.10.2020">One</nu-option>
        <nu-option value="10.10.2020">Two</nu-option>
      </nu-popup>
    </nu-btn>

    <nu-debug id="select-debugger"></nu-debug>
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
</nu-card>-->

<script>
const svgImages = require('../images/*.svg');
const pngImages = require('../images/*.png');

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
let dateRange = [new Date('2020-05-10'), new Date('2020-05-20')];
let inputTestValue = '456';

function submit(event) {
  console.log('! form data submitted', event.detail);
}

function customValidator(val) {
  return val === 'Andrew';
}

window.addEventListener('hashchange', () => {
  hash = location.hash;
});

$: show = (name) => {
  return hash ? hash.includes(name) : true;
}
</script>
