<nu-flex gap>
  <nu-icon name="calendar-outline" move="0 (1x / -4)"></nu-icon>
  <nu-value grow="1" placeholder={placeholder}></nu-value>
  <nu-icon
    name="chevron-down" size="1.25em" transition="scale"
    scale="^host:pressed[flip-y]"></nu-icon>
</nu-flex>
<nu-popup width="minmax(18, min-content)" padding>
  <nu-datepicker
    value={value}
    link-value
    mode={mode}
    begin={begin}
    end={end}
    on:input={handleInput}></nu-datepicker>
</nu-popup>

<script>
import { createEventDispatcher } from 'svelte';

export let placeholder;
export let mode;
export let value;
export let begin;
export let end;
export let host;

const dispatch = createEventDispatcher();

$: isRange = mode === 'range';
$: host.setAttribute('type', isRange ? 'daterange' : 'date');

let fromDate = value && startOfDay(Array.isArray(value) ? value[0] : new Date(String(value).split('|')[0]));
let toDate = value && startOfDay(Array.isArray(value)
  ? (value[1] || value[0])
  : new Date(String(value).split('|')[1] || String(value).split('|')[0]));

function handleInput(event) {
  const detail = event.detail;

  if (isRange) {
    fromDate = detail[0];
    toDate = detail[1];
  } else {
    fromDate = toDate = detail;
  }
}

</script>
