import { createStore } from 'redux';
import enhancers from './enhancers.js';
import reducers from './reducers.js';

export default function(initialState) {
  const store = enhancers(createStore)(reducers, initialState);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers',
      () => store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
}
