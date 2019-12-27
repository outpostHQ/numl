export function extractVars(value) {
  return value.split(';').reduce((varsMap, str) => {
    const tmp = str.split(':');

    varsMap[tmp[0].trim()] = tmp[1].trim();

    return varsMap;
  }, {});
}

export function getVarsList(val) {
  if (!val.includes('@')) return [];

  const set = new Set;

  const list = val.match(/@[a-z0-9-]+/ig);

  list.forEach(str => {
    set.add(str.slice(1));
  });

  return Array.from(set);
}

export function getVarValue(varName, context) {
  return context[`var:${varName}`] ? context[`var:${varName}`].value : '';
}

export function composeVarsValue(value, context, zonesNumber) {
  let anyVarResponsive = false;

  const styleValues = getResponsiveValues(value, zonesNumber);
  const varsList = getVarsList(value);
  const vars = varsList.reduce((map, varName) => {
    const varValue = getVarValue(varName, context);

    if (varValue.includes('|')) {
      anyVarResponsive = true;
    }

    map[varName] = getResponsiveValues(varValue, zonesNumber);

    return map;
  }, {});

  return styleValues.map((val, zone) => {
    varsList.forEach(varName => {
      val = val.replace(`@${varName}`, vars[varName][zone]);
    });

    return val;
  }).join('|');
}

export function getResponsiveValues(value, count) {
  const values = value.split('|');
  const outValues = [];

  let current = '';

  for (let i = 0; i < count; i++) {
    const val = values[i];

    if (!val) {
      outValues.push(current);
    } else if (val === ' ') {
      outValues.push('');
      current = '';
    } else {
      outValues.push(val);
      current = val;
    }
  }

  return outValues;
}
