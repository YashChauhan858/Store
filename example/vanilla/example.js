import createStore from "../../src/createStore";

const d = createStore(
  { count: 10 },
  {
    increment: (set, get) => set((state) => ({ count: state.count + 1 })),
    decrement: (set) => set((state) => ({ count: state.count - 1 })),
  }
);

d.store.subscribe("1", (state) => console.log("subscribed", { state }));

console.log(d.getState());
d.increment();
console.log(d.getState());
d.decrement();
console.log(d.getState());
