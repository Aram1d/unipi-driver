import {
  Edges,
  GpioInput,
  GpioState,
  StateCallback,
  WatchCallback,
} from "array-gpio-es";

export class NumInput {
  #gpioInput: GpioInput;

  constructor(gpioInput: GpioInput) {
    this.#gpioInput = gpioInput;
  }

  get state() {
    return this.#gpioInput.state;
  }
  get isOff() {
    return this.#gpioInput.isOff;
  }
  get isOn() {
    return this.#gpioInput.isOn;
  }

  read(): GpioState;
  read(cb: StateCallback): NodeJS.Immediate;
  read(cb?: StateCallback) {
    return cb ? this.#gpioInput.read(cb) : this.#gpioInput.read();
  }

  watch(
    cb: WatchCallback,
    { edge, pollRate }: { edge?: Edges; pollRate?: number } = {}
  ) {
    return this.#gpioInput.watch(cb, { edge, pollRate });
  }
  unwatch() {
    return this.#gpioInput.unwatch();
  }
}
