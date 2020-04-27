<nu-card as="section">
  <nu-inputgroup>
    <nu-icon name="search" size="lg"></nu-icon>
    <nu-input placeholder="User name" grow="1" value={inputValue}></nu-input>
  </nu-inputgroup>
</nu-card>

<nu-card as="section">
  <nu-numinput value="15" code="USD"></nu-numinput>
</nu-card>

<nu-card as="section">
  <nu-textarea value="1234"></nu-textarea>
</nu-card>

<nu-card as="section">
  <nu-blockquote>
    Say something!
  </nu-blockquote>
</nu-card>

<script>
let inputValue = 'Some input value';
</script>
