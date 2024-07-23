## Store

A vanilla store that can be used to store data globally, with zustand like pattern

check out example section for better understanding.

```js
const d = createStore(
  { count: 10 },
  {
    increment: (set, get) => set((state) => ({ count: state.count + 1 })),
    decrement: (set) => set((state) => ({ count: state.count - 1 })),
  }
);
```
