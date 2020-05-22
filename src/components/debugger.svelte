{#if target}
  <nu-block>
    Debugger for
    <nu-link scrollto={target.nuUniqId}>
      {target.tagName.toLowerCase()}#{target.nuUniqId}
    </nu-link>
  </nu-block>
  <nu-block>
    <nu-el text="w6">el{target.nuDebugId}</nu-el> in console
  </nu-block>
  <nu-tablist value="eventlog" border="inside bottom" control="tabs-header[padding]">
    <nu-tab control="eventlog" value="eventlog">
      event log
    </nu-tab>
    <nu-tab control="attributes" value="attributes">
      attributes
    </nu-tab>
    {#each behaviors as behavior}
      <nu-tab control={behavior.$$name} value={behavior.$$name}>
        {behavior.$$name}
      </nu-tab>
    {/each}
  </nu-tablist>

  <nu-block height="initial 15 15" scrollbar overflow="auto">
    <nu-block id="eventlog">
      {#each eventLog as log}
        <nu-flex gap>
          <nu-block>{log.timestamp}</nu-block>
          <nu-block width="7">{log.name}</nu-block>
          <nu-block>
            {log.detail !== undefined ? JSON.stringify(log.detail, null, 2) : ''}
          </nu-block>
        </nu-flex>
      {/each}
    </nu-block>
    <nu-grid id="attributes" columns="auto 1fr" gap="0 1x">
      {#each attrs as attr}
        <nu-block text="w6">[{attr.name}]</nu-block>
        <nu-block>{attr.value}</nu-block>
      {/each}
    </nu-grid>
    {#each behaviors as behavior}
      <nu-block id={behavior.$$name} text="pre">
        <nu-block place="sticky top" fill="bg">
          <nu-el text="w6">{behavior.$$name}{target.nuDebugId}</nu-el> in console
        </nu-block>
        {logBehaviorState(behavior)}
      </nu-block>
    {/each}
  </nu-block>
{/if}

<script>
// export let host;
/**
 * @type {HTMLElement}
 */
export let target = null;

/**
 * @type {HTMLElement}
 */
let currentTarget = null;
let eventLog = [];
let loggers = {};

export function log(name, detail = undefined) {
  eventLog = [{
    name,
    detail,
    timestamp: Date.now(),
  }, ...eventLog];
}

const eventList = ['input', 'tap', 'log'];
const ignoreProps = ['props', 'propsList', 'host', '$$name', 'component', 'ref'];

function logBehaviorState(behavior) {
  return JSON.stringify(Object
    .entries(behavior)
    .reduce((state, [prop, value]) => {
      if (!ignoreProps.includes(prop)
        && typeof value !== 'function'
        && !prop.startsWith('_')) {
        try {
          JSON.stringify(value);

          state[prop] = value;
        } catch(e) {
          state[prop] = '{OBJECT}';
        }
      }

      return state;
    }, {}), null, 2);
}

function createEventLogger(name) {
  return (evt) => {
    eventLog = [{
      name,
      timestamp: Date.now(),
      detail: evt.detail,
    }, ...eventLog];
  };
}

$: (() => {
  if (currentTarget === target) return;

  if (currentTarget) {
    eventList.forEach(name => {
      currentTarget.removeEventListener(name, loggers[name]);
    });
  }

  if (target) {
    eventList.forEach(name => {
      loggers[name] = createEventLogger(name);
      target.addEventListener(name, loggers[name]);
    });

    currentTarget = target;
  }
})();

setInterval(() => {
  behaviors = behaviors;
  attrs = attrs;
}, 500);

$: behaviors = target
  ? Object.values(target.nuBehaviors).filter(beh => beh.$$name !== 'debug' && beh.params && beh.params.widget)
  : [];
$: attrs = target ? [...target.attributes].reduce((list, { name, value }) => {
  value = value === '' ? 'true' : `"${value}"`;

  list.push({
    name,
    value,
  });

  return list;
}, []) : [];
</script>
