<nu-grid padding="0" gap columns="1fr 1fr" on:focusin={touch}>
  <nu-attrs
    for="arrow"
    padding="0.5x 0.25x" special border="color(special-bg)"></nu-attrs>
  <nu-attrs for="arrow-left-icon" name="chevron-left" size="1em" move="-.125x 0"></nu-attrs>
  <nu-attrs for="arrow-right-icon" name="chevron-right" size="1em" move=".125x 0"></nu-attrs>
  <nu-attrs
    for="dropdown-icon"
    name="chevron-down"
    opacity="^:hover[1] :pressed[1] :hover:pressed[1] 0"
    scale="^:pressed[flip-y]" place="right" height="100%" size="1em"></nu-attrs>
  <nu-attrs
    for="dropdown"
    text="w5 center" content="stretch" columns="1fr auto"
    padding=".5x .25x .5x .75x" grow="1"></nu-attrs>
  <nu-group radius>
    <nu-btn id="arrow" on:tap={prevYear} disabled={havePrevYear ? undefined : ''}>
      <nu-icon id="arrow-left-icon"></nu-icon>
    </nu-btn>
    <nu-btn
      id="dropdown" type="date"
      value={navDate} on:input={(event) => navDate = event.detail}>
      <nu-datetime year value={navDate}></nu-datetime>
      <nu-icon id="dropdown-icon"></nu-icon>
      <nu-popuplistbox
        height="28x" bind:this={yearPopup}>
        {#each years as year}
          <nu-option
            value={year}
            disabled={!isMonthInRange(year, beginDate, endDate) ? '' : undefined}
            color=":current[special]"
            fill=":current[subtle]">
            <nu-datetime year value={year}></nu-datetime>
          </nu-option>
        {/each}
      </nu-popuplistbox>
    </nu-btn>
    <nu-btn id="arrow" on:tap={nextYear} disabled={haveNextYear ? undefined : ''}>
      <nu-icon id="arrow-right-icon"></nu-icon>
    </nu-btn>
  </nu-group>

  <nu-group radius>
    <nu-btn id="arrow" on:tap={prevMonth} disabled={havePrevMonth ? undefined : ''}>
      <nu-icon id="arrow-left-icon"></nu-icon>
    </nu-btn>
    <nu-btn
      id="dropdown" on:tap={toggle} type="date"
      on:input={(event) => navDate = event.detail} value={navDate}>
      <nu-datetime month="short" value={navDate}></nu-datetime>
      <nu-icon id="dropdown-icon"></nu-icon>
      <nu-popuplistbox
        height="28x" overflow="auto" scrollbar bind:this={monthPopup}>
        {#each months as month}
          <nu-option
            value={month}
            disabled={!isMonthInRange(month, beginDate, endDate) ? '' : undefined}
            color=":current[special]"
            fill=":current[subtle]">
            <nu-datetime month value={month}></nu-datetime>
          </nu-option>
        {/each}
      </nu-popuplistbox>
    </nu-btn>
    <nu-btn id="arrow" on:tap={nextMonth} disabled={haveNextMonth ? undefined : ''}>
      <nu-icon id="arrow-right-icon"></nu-icon>
    </nu-btn>
  </nu-group>

</nu-grid>
<nu-grid columns="repeat(7, 1fr)" text="center" color="text 80%">
  <nu-attrs for="weekday" text="w7" size="xs"></nu-attrs>

  {#each weekDays as weekDay}
    <nu-el id="weekday">
      <nu-datetime weekday="short" value={weekDay}></nu-datetime>
    </nu-el>
  {/each}
</nu-grid>
<nu-grid
  columns="repeat(7, 1fr)" content="start stretch"
  text="center">
  <nu-attrs for="day" fill="clear" radius={isRange ? '1r :hover[1r 0 0 1r]' : '1r :hover[1r]'} text="w5" border="color(clear)" focus="inset"></nu-attrs>
  <nu-attrs for="today" text="w7" color="special" border></nu-attrs>
  <nu-attrs for="other-month" color="text 50% :hover[text]"></nu-attrs>
  <nu-attrs for="disabled" disabled color="text 50%"></nu-attrs>
  <nu-attrs for="start" special fill="special-bg" color radius="1r 0 0 1r"></nu-attrs>
  <nu-attrs for="end" radius="0r 1r 1r 0r :hover[1r 0 0 1r]" special fill="special-bg" color></nu-attrs>
  <nu-attrs for="selected" radius special fill="special-bg" color></nu-attrs>
  <nu-attrs for="range"
            radius={isRange ? '0 :hover[0 1r 1r 0]' : '1r'}
            fill="special-bg 25%" color="text"></nu-attrs>
  <nu-attrs for="range-inside" radius="0 :hover[1r 0 0 1r]" fill="special-bg 25%" color="text"></nu-attrs>

  {#each monthDays as day}
    <nu-btn
      as={day.modifiers}
      padding=".5x 1x"
      on:tap={() => selectRange(day.date)}
      on:mouseover={() => setHover(day.date)}>
      {day.date.getDate()}
    </nu-btn>
  {/each}

</nu-grid>

{#if isRange}
  <nu-flex gap size="xs">
    <nu-attrs for="nu-btn" special padding></nu-attrs>

    <nu-btn on:tap={() => setRange(yearRange)}>
      <nu-datetime year value={navDate}></nu-datetime>
    </nu-btn>

    <nu-btn on:tap={() => setRange(quaterRange)}>
      Q{navQuater}
      <nu-datetime year value={navDate}></nu-datetime>
    </nu-btn>

    <nu-btn on:tap={() => setRange(monthRange)}>
      <nu-datetime year month="short" value={navDate}></nu-datetime>
    </nu-btn>
  </nu-flex>
{/if}

<script context="module">
export const props = ['value', 'locale', 'begin', 'end', 'mode'];
</script>

<script>
import { createEventDispatcher } from 'svelte';
import {
  addDays,
  addMonths,
  addYears,
  endOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  startOfYear,
  startOfDay,
  endOfDay,
  endOfYear,
  differenceInDays,
  isWithinInterval,
  getQuarter,
  startOfQuarter,
  endOfQuarter,
  max as maxDate,
  min as minDate,
  setYear,
} from 'date-fns';
import { isValidDate, setTransitionTimeout } from '../helpers';

export let value;
export let locale;
export let begin;
export let end;
export let mode;
export let host;

const dispatch = createEventDispatcher();

function touch() {
  setTransitionTimeout(host, () => {
    touched = true;
  });
}

function weekStart(region) {
  if ('AEAFBHDJDZEGIQIRJOKWLYOMQASDSY'.match(/../g).includes(region)) {
    return 6;
  }
  if ('AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW'.match(/../g).includes(region)) {
    return 0;
  }
  return 1;
}

function decodeLocale(locale) {
  return locale.match(/^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|\d{3})(?=$|[_-]+))?/);
}

let fromDate = value && startOfDay(Array.isArray(value) ? value[0] : new Date(String(value).split(',')[0]));
let toDate = value && startOfDay(Array.isArray(value)
  ? (value[1] || value[0])
  : new Date(String(value).split(',')[1] || String(value).split(',')[0]));

if (!isValidDate(fromDate)) {
  fromDate = null;
}

if (!isValidDate(toDate)) {
  toDate = null;
}

$: isRange = mode === 'range';

if (mode === 'range' && (fromDate && !toDate) || (toDate && !fromDate)) {
  fromDate = null;
  toDate = null;
}

let navDate = startOfMonth(toDate || new Date);
let hoverDate;
let todayDate = new Date;
let yearPopup;
let monthPopup;
let touched = false;

$: navDateCurrentYear = setYear(new Date(navDate), todayDate.getFullYear());
$: host.setAttribute('type', isRange ? 'daterange' : 'date');
$: navQuater = getQuarter(navDate);
$: navMonthStartDate = navDate;
$: navMonthEndDate = endOfMonth(navDate);
$: weekStartDate = weekStart(decodeLocale(locale)[4]);
$: navStartDate = startOfWeek(navDate, { weekStartsOn: weekStartDate });
$: navEndDate = (() => {
  let dt = endOfWeek(navMonthEndDate, { weekStartsOn: weekStartDate });

  while (differenceInDays(dt, navStartDate) < 41) {
    dt = addDays(dt, 7);
  }

  return dt;
})();
$: beginDate = (() => {
  let date;

  if (begin) {
    date = startOfDay(new Date(begin));

    if (begin === 'today' || begin === 'now' || isAfter(date, todayDate)) {
      return todayDate;
    }

    return date;
  }

  return addYears(todayDate, -100);
})();
$: endDate = (() => {
  let date;

  if (end) {
    date = endOfDay(new Date(end));

    if (end === 'today' || end === 'now' || isBefore(date, beginDate)) {
      return todayDate;
    }

    return date;
  }

  return addYears(todayDate, 100);
})();
$: monthDays = (() => {
  let arr = [];
  let date = navStartDate;

  while (isBefore(date, navEndDate)) {
    arr.push({
      date,
      modifiers: getDayModifiers(
        date,
        navMonthStartDate,
        navMonthEndDate,
        fromDate,
        toDate,
        hoverDate,
        beginDate,
        endDate
      ),
    });

    date = addDays(date, 1);
  }

  return arr;
})();
$: startOfYearDate = startOfYear(navDate);
$: months = touched ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
  return addMonths(startOfYear(navDate), i);
}) : [];
$: years = (() => {
  if (!touched) return [];

  const list = [];

  const startYear = beginDate.getFullYear();
  const endYear = endDate.getFullYear();

  for (let i = 0; i <= endYear - startYear; i++) {
    list.push(setYear(navDate, startYear + i));
  }

  return list;
})();
$: weekDays = monthDays.slice(0, 7).map(day => day.date);
$: currentYear = navDate.toLocaleString(locale, { year: 'numeric' });
$: currentMonth = navDate.toLocaleString(locale, { month: 'short' });
$: haveNextMonth = isMonthInRange(addMonths(navDate, 1), beginDate, endDate);
$: havePrevMonth = isMonthInRange(addMonths(navDate, -1), beginDate, endDate);
$: haveNextYear = isYearInRange(addYears(navDate, 1), beginDate, endDate);
$: havePrevYear = isYearInRange(addYears(navDate, -1), beginDate, endDate);
$: yearRange = (() => {
  return [
    maxDate([beginDate, startOfYear(navDate)]),
    minDate([endDate, endOfYear(navDate)]),
  ];
})();
$: quaterRange = (() => {
  return [
    maxDate([beginDate, startOfQuarter(navDate)]),
    minDate([endDate, endOfQuarter(navDate)]),
  ];
})();
$: monthRange = (() => {
  return [
    maxDate([beginDate, startOfMonth(navDate)]),
    minDate([endDate, endOfMonth(navDate)]),
  ];
})();

function isMonthInRange(monthDate, beginDate, endDate) {
  const monthBeginDate = startOfMonth(beginDate);
  const monthEndDate = endOfMonth(endDate);

  return isWithinInterval(monthDate, {
    start: monthBeginDate,
    end: monthEndDate,
  });
}

function isYearInRange(yearDate, beginDate, endDate) {
  const yearBeginDate = startOfYear(beginDate);
  const yearEndDate = endOfYear(endDate);

  return isWithinInterval(yearDate, {
    start: yearBeginDate,
    end: yearEndDate,
  });
}

function nextMonth() {
  navDate = addMonths(navDate, 1);
}

function prevMonth() {
  navDate = addMonths(navDate, -1);
}

function nextYear() {
  navDate = addYears(navDate, 1);
}

function prevYear() {
  navDate = addYears(navDate, -1);
}

function getDayModifiers(date, navMonthStartDate, navMonthEndDate, fromDate, toDate, hoverDate, beginDate, endDate) {
  const mods = ['day'];
  const rangeMod = fromDate && toDate ? 'range-inside' : 'range';

  if (isBefore(date, navMonthStartDate) || isAfter(date, navMonthEndDate)) {
    mods.push('other-month');
  }

  if (isSameDay(date, todayDate)) {
    mods.push('today');
  }

  if (!isWithinInterval(date, {
    start: beginDate,
    end: endDate,
  })) {
    mods.push('disabled');

    return mods.join(' ');
  }

  if (fromDate && isSameDay(date, fromDate)) {
    mods.push('start');
  }

  if (toDate && isSameDay(date, toDate)) {
    mods.push('end');
  }

  if (isSameDay(date, fromDate) && isSameDay(fromDate, toDate)) {
    mods.push('selected');
  }

  if (fromDate && toDate
    && isAfter(date, fromDate)
    && isBefore(date, toDate)) {
    mods.push(rangeMod);
  } else if (fromDate && !toDate
    && isAfter(date, fromDate)
    && (isBefore(date, hoverDate) || isSameDay(date, hoverDate))) {
    mods.push(rangeMod);
  }

  return mods.join(' ');
}

function selectRange(date) {
  if (isRange) {
    if (fromDate && !toDate && (isAfter(date, fromDate) || isSameDay(date, fromDate))) {
      toDate = date;

      dispatch('input', [fromDate, toDate]);
    } else {
      fromDate = date;

      toDate = null;
    }
  } else {
    fromDate = date;
    toDate = date;

    dispatch('input', date);
  }
}

function setHover(date) {
  hoverDate = date;
}

function toLowerCase(date) {
  return date ? date.toString().toLowerCase() : '';
}

function toggle() {
  touched = true;
}

function setRange(range) {
  fromDate = startOfDay(range[0]);
  toDate = startOfDay(range[1]);

  dispatch('input', range);
}

</script>
