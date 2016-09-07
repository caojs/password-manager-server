import isPlainObject from 'lodash/isPlainObject';
import createAction from 'redux-actions/lib/createAction';

const { ACTION_FROM_SERVER } = require('../actionCreators/constants');

function isServerAction(action) {
  if (isPlainObject(action)) {
    return action.type === ACTION_FROM_SERVER;
  }
}

export default function({ dispatch }) {
  return next => action => {
    if (!isServerAction(action)) return next(action);

    const { payload, meta } = action;

    if (!isPlainObject(meta)) {
      throw new Error('meta with object type is required.');
    }

    const { type, ...rest } = meta;

    if (!type) {
      throw new Error('meta.type is required.');
    }

    return dispatch({
      type,
      payload,
      meta: rest
    });
  };
}
