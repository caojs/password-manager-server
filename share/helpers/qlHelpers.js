import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

function scalarString(value) {
  return typeof value !== 'string' ?
    value :
    '"' + value + '"';
}

function mapToArgs(m) {
  return m
    .map(v => typeStringify(v))
    .join(',');
}

function objectToArgs(o) {
  return Object.keys(o)
    .filter(k => o[k] !== undefined)
    .map(k => k + ':' + typeStringify(o[k]))
    .join(',');
}

function typeStringify(input) {
  if (isArray(input)) {
    const rra = mapToArgs(input)
    return '[' + rra + ']';
  }
  if (isPlainObject(input)) {
    const bjec = objectToArgs(input);
    return '{' + bjec + '}';
  }

  return scalarString(input);
}

export const argsify = objectToArgs;
