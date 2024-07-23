import clone from "./utils/clone.js";

/**
 * Represents a store that holds state and allows state management.
 */
export class Store {
  /**
   * The current state of the store.
   * @private
   */
  #state;

  /**
   * An object holding all the listeners subscribed to the store updates.
   * @private
   */
  #listeners = {};

  /**
   * Creates an instance of the Store.
   * @param {Object} initialState - The initial state of the store.
   */
  constructor(initialState) {
    this.storeId = new Date().getTime();
    this.#state = initialState;
  }

  /**
   * Sets the state of the store. If a function is provided,
   * it updates the state based on the previous state.
   * Notifies all subscribed listeners after the state is updated.
   * @param {Object|Function} x - The new state or a function to update the state.
   */
  setState(x) {
    if (typeof x === "function") {
      this.#state = x(this.#state);
    } else {
      this.#state = x;
    }
    Object.values(this.#listeners).forEach((cb) => cb(this.#state));
  }

  /**
   * Returns a clone of the current state to prevent external mutation.
   * @returns {Object} A clone of the current state.
   */
  getState() {
    // sending clone so user doesn't mutate the state outside class
    return clone(this.#state);
  }

  /**
   * Subscribes a listener to the store updates.
   * @param {string} id - A unique identifier for the subscriber.
   * @param {Function} cb - The callback function to be called on state updates.
   * @returns {string} The id of the subscriber.
   */
  subscribe(id, cb) {
    this.#listeners[id] = cb;
    return id;
  }

  /**
   * Unsubscribes a listener from the store updates using its unique identifier.
   * @param {string} id - The unique identifier of the subscriber to be removed.
   * @throws {Error} Throws an error if an invalid id is provided.
   */
  unsubscribeById(id) {
    if (!this.#listeners[id])
      throw new Error(`Invalid id (${id}) provided for listener`);
    delete this.#listeners[id];
  }

  /**
   * Unsubscribes all listeners from the store updates.
   */
  unsubscribeAll() {
    this.#listeners = {};
  }
}
// Store example
// const d = new Store({ count: 10 });
// d.setState((state) => ({ count: state.count + 1 }));
// d.setState((state) => ({ count: state.count + 4 }));
// console.log(d.getState()); // { count: 15 }
// let x = d.getState();
// x.count = 1000000;
// console.log(d.getState()); // { count: 15 }
