import { Store } from "./store.js";

const createStore = (initialState, actions) => {
  if (!initialState) return { getState: null };

  const store = new Store(initialState);

  if (!actions || Object.values(actions).length === 0)
    return {
      getState: store.getState.bind(store),
    };

  // Attach setters and getters to actions
  let newActions = {};
  Object.entries(actions).forEach(([key, cb]) => {
    newActions[key] = () => {
      return cb(store.setState.bind(store), store.getState.bind(store));
    };
  });

  return {
    store,
    storeId: store.storeId,
    setState: store.setState.bind(store),
    getState: store.getState.bind(store),
    ...newActions,
  };
};

export default createStore;
