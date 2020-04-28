<nu-card as="section">
  <nu-form nu-debug="debugger0" gap value={formData}>
    <nu-heading level="4">Form</nu-heading>
    <nu-input
      id="email" placeholder="Email address" grow="1"></nu-input>
    <nu-card>
      <nu-form id="user" nu-debug="debugger1" gap>
        <nu-heading level="5">User</nu-heading>
        <nu-inputgroup>
          <nu-icon name="user" size="lg"></nu-icon>
          <nu-input
            id="name" placeholder="User name" grow="1" value={inputValue}
            nu-debug="debugger2"></nu-input>
        </nu-inputgroup>
        <nu-pane gap padding>
          <nu-checkbox
            checked id="press" type="num" value="4" off-value="2" labelledby=":next"
            nu-debug="debugger3"></nu-checkbox>
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

<nu-card as="section">
  <nu-numinput value="15" code="USD"></nu-numinput>
</nu-card>

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
  name: 'Something',
};
let formData = {
  email: 'tenphi@gmail.com',
  user,
};
</script>
