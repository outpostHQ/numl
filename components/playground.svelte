<nu-heading>Playground</nu-heading>

<nu-card as="section">
  <nu-form value={formData} on:input={submit} nx-debug="debugger0">
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
      <nu-dateinput id="date" width="min(10)" nx-debug="debugger1"></nu-dateinput>
    </nu-flow>
    <nu-card>
      <nu-form id="user">
        <nu-heading level="5">User</nu-heading>
        <nu-flow>
          <nu-label>User name</nu-label>
          <nu-inputgroup>
            <nu-icon name="user" size="lg"></nu-icon>
            <nu-input id="name" grow="1" nx-debug="debugger2"></nu-input>
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
          <nu-checkbox checked id="press" labelledby=":next" nx-debug="debugger3"></nu-checkbox>
          <nu-label>Some checkbox</nu-label>
        </nu-pane>
      </nu-form>
    </nu-card>
    <nu-block>
      <nu-btn action="submit" special>Submit</nu-btn>
    </nu-block>
  </nu-form>
</nu-card>

<nu-grid columns="repeat(4, 1fr)" gap>
  <nu-debug id="debugger0" as="section"></nu-debug>
  <nu-debug id="debugger1" as="section"></nu-debug>
  <nu-debug id="debugger2" as="section"></nu-debug>
  <nu-debug id="debugger3" as="section"></nu-debug>
</nu-grid>

<!--<nu-card as="section">-->
<!--  <nu-numinput value="15" code="USD"></nu-numinput>-->
<!--</nu-card>-->

<!--<nu-card as="section">-->
<!--  <nu-progressbar value="50"></nu-progressbar>-->

<!--  <nu-slider value="50" orient="v"></nu-slider>-->
<!--</nu-card>-->

<nu-card as="section">
  <nu-heading level="3">Select</nu-heading>

  <nu-btn id="select" nx-debug="debugger4" type="date">
    <nu-value></nu-value>
    <nu-popupmenu type="date" nx-debug="debugger5">
      <nu-menuitem value="05.10.2020" nx-debug="debugger6">One</nu-menuitem>
      <nu-menuitem value="10.10.2020">Two</nu-menuitem>
    </nu-popupmenu>
  </nu-btn>

<!--  <nu-card width="minmax(20, min-content)">-->
<!--    <nu-datepicker mode="range" shadow-root="y" value={dateRange}></nu-datepicker>-->
<!--  </nu-card>-->
<!--  <nu-dateinput width="min(10)" mode="range"></nu-dateinput>-->
</nu-card>

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
let formData = {
  email: 'tenphi@gmail.com',
  user,
};
let dateRange = [new Date, new Date('2020-05-10')];

function submit(event) {
  console.log('! form data submitted', event.detail);
}
</script>
