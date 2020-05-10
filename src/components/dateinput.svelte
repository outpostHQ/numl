<nu-flex gap>
  <nu-value grow="1"></nu-value>
<!--  <nu-flex gap grow="1">-->
<!--    {#if fromDate}-->
<!--      <nu-datetime-->
<!--        value={fromDate}-->
<!--        date={date || ''}-->
<!--        weekday={weekday}-->
<!--        era={era}-->
<!--        year={year}-->
<!--        month={month}-->
<!--        day={day}-->
<!--        zone={zone}-->
<!--        timezone={timezone}-->
<!--        dayperiod={dayperiod}-->
<!--        calendar={calendar}-->
<!--        system={system}-->
<!--        hourcycle={hourcycle}-->
<!--        format={format}></nu-datetime>-->
<!--      {#if isRange}-->
<!--        <nu-el>–</nu-el>-->
<!--        <nu-datetime-->
<!--          value={toDate}-->
<!--          date={date || ''}-->
<!--          weekday={weekday}-->
<!--          era={era}-->
<!--          year={year}-->
<!--          month={month}-->
<!--          day={day}-->
<!--          zone={zone}-->
<!--          timezone={timezone}-->
<!--          dayperiod={dayperiod}-->
<!--          calendar={calendar}-->
<!--          system={system}-->
<!--          hourcycle={hourcycle}-->
<!--          format={format}></nu-datetime>-->
<!--      {/if}-->
<!--    {:else}-->
<!--      ...-->
<!--    {/if}-->
<!--  </nu-flex>-->
  <nu-icon
    name="chevron-down" size="1.25em" transition="scale"
    scale="^host:pressed[flip-y]"></nu-icon>
</nu-flex>
<nu-popup width="minmax(18, min-content)" padding>
  <nu-datepicker
    value={value}
    mode={mode}
    begin={begin}
    end={end}
    on:input={handleInput}></nu-datepicker>
</nu-popup>

<script>
import { createEventDispatcher } from 'svelte';

export let mode;
export let date;
export let time;
export let weekday;
export let era;
export let year;
export let month;
export let day;
export let hour;
export let minute;
export let second;
export let zone;
export let timezone;
export let dayperiod;
export let calendar;
export let system;
export let hourcycle;
export let format;
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

  // dispatch('input', detail);

  if (isRange) {
    fromDate = detail[0];
    toDate = detail[1];
  } else {
    fromDate = toDate = detail;
  }
}

</script>
