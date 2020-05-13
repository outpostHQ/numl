<nu-heading>Playground</nu-heading>

{#if show(hash, 'form')}
  <nu-card as="section">
    <nu-form value={formData} on:input={submit} nx-debug="form-debugger0">
      <nu-theme name="error" hue="1" mod="tone"></nu-theme>
      <nu-attrs for="nu-check" theme="error"></nu-attrs>
      <nu-attrs for="nu-input" theme=":invalid[error]"></nu-attrs>
      <nu-attrs for="nu-inputgroup" theme=":invalid[error]"></nu-attrs>
      <nu-heading level="4">Form</nu-heading>
      <nu-flow>
        <nu-input
          id="email" placeholder="Email address" grow="1"></nu-input>
        <nu-check for="email" assert="email">
          Should be a valid email address
        </nu-check>
      </nu-flow>
      <nu-flow>
        <nu-input id="password" placeholder="Password" grow="1" mask></nu-input>
        <nu-check for="password" assert="required">
          Password is required
        </nu-check>
      </nu-flow>
      <nu-flow>
        <nu-label>Date of issue</nu-label>
        <nu-dateinput
          id="date" mode="range" width="min(10)"
          placeholder="Date range"></nu-dateinput>

        <nu-debug id="debugger-picker"></nu-debug>
      </nu-flow>
      <nu-card>
        <nu-form id="user" nx-debug="form-debugger1">
          <nu-heading level="5">User</nu-heading>
          <nu-flow>
            <nu-label for="name">User name</nu-label>
            <nu-inputgroup>
              <nu-icon name="user" size="lg"></nu-icon>
              <nu-input id="name" grow="1" nx-debug="form-debugger2"></nu-input>
            </nu-inputgroup>
            <nu-check for="name" assert="required">
              Name is required
            </nu-check>
            <nu-check for="name" assert="minlength:5">
              Name should contain at least 5 characters
            </nu-check>
          </nu-flow>

          <nu-flow>
            <nu-label>Period</nu-label>
            <nu-inputgroup>
              <nu-icon name="hash" size="lg"></nu-icon>
              <nu-numinput id="period" unit="day" grow="1"></nu-numinput>
            </nu-inputgroup>
          </nu-flow>

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
  <nu-heading level="2">Slider</nu-heading>
  <nu-slider value="50" nx-debug="slider-debug-h"></nu-slider>
  <nu-slider value="50" orient="v" nx-debug="slider-debug-v"></nu-slider>

  <nu-grid gap columns="1fr 1fr">
    <nu-debug id="slider-debug-h"></nu-debug>
    <nu-debug id="slider-debug-v"></nu-debug>
  </nu-grid>
</nu-card>
{/if}

{#if show(hash, 'select')}
<nu-card as="section">
  <nu-heading level="3">Select</nu-heading>

  <nu-btn id="select" nx-debug="debugger4" type="date">
    <nu-value></nu-value>
    <nu-popupmenu type="date" nx-debug="select-debugger" link-value>
      <nu-menuitem value="05.10.2020">One</nu-menuitem>
      <nu-menuitem value="10.10.2020">Two</nu-menuitem>
      <nu-menuitem>
        Something else...
        <nu-popupmenu place="outside-right -1x 0" link-value>
          <nu-menuitem value="05.11.2020">Three</nu-menuitem>
        </nu-popupmenu>
      </nu-menuitem>
    </nu-popupmenu>
  </nu-btn>

  <nu-btn id="select" type="date">
    <nu-value></nu-value>
    <nu-popupmenu type="date" link-value>
      <nu-menuitem value="05.10.2020">One</nu-menuitem>
      <nu-menuitem value="10.10.2020">Two</nu-menuitem>
    </nu-popupmenu>
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
