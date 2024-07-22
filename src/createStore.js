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

// const d = createStore(
//   { count: 10 },
//   {
//     increment: (set, get) => set((state) => ({ count: state.count + 1 })),
//     decrement: (set) => set((state) => ({ count: state.count - 1 })),
//   }
// );

// d.store.subscribe("1", (state) => console.log("subscribed", { state }));
// console.log(d.getState());
// d.increment();
// console.log(d.getState());
// d.decrement();
// console.log(d.getState());
