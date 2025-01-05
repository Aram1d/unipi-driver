import r, { GpioState, I2C } from "array-gpio-es";

const mcpAddr = 0x20 as const;

export function getStateFromByte(byte: number, outputNumber: number) {
  return ((byte >>> (8 - outputNumber)) & 1) > 0 ? 1 : 0;
}

export class NumOutputs {
  #i2c: I2C;
  #outputBits = generateOutputBitMap();

  constructor() {
    const i2c = r.setI2C(1);
    i2c.setTransferSpeed(400000);
    i2c.selectSlave(mcpAddr);
    i2c.write(Buffer.from([0x00, 0x00]), 2);
    this.#i2c = i2c;
  }

  getOutputsState() {
    this.#i2c.write(Buffer.from([0x09]), 1);
    const readBuffer = Buffer.alloc(8);
    this.#i2c.read(readBuffer, 8);
    return readBuffer.readUint8();
  }

  getOutputState(k: number) {
    if (k > 8 || k < 1) throw new Error("The number should be <8 and >=0");
    this.#i2c.write(Buffer.from([0x09]), 1);
    const state = this.getOutputsState();
    return ((state >>> (8 - k)) & 1) > 0 ? 1 : 0;
  }

  setOutputs(byte: number) {
    if (byte > 255 || byte < 0)
      throw new Error("The number should be <255 and >0");
    this.#i2c.write(Buffer.from([0x09, byte]), 2);
  }
  setOutput(output: number, outputState: GpioState) {
    const prevOutputState = this.getOutputState(output);
    const outputsState = this.getOutputsState();

    if (!(outputState !== prevOutputState)) return;
    this.#i2c.write(
      Buffer.from([
        0x09,
        outputState
          ? outputsState + this.#outputBits[output]
          : outputsState - this.#outputBits[output],
      ]),
      2
    );
  }

  closeOutputs() {
    const resetBuffer = Buffer.from([9, 0]);
    this.#i2c.write(resetBuffer, 2);
    this.#i2c.end();
  }
}

const generateOutputBitMap = () => {
  const bitMap = [0];
  for (let n = 7; n >= 0; n--) {
    bitMap.push(2 ** n);
  }
  return bitMap;
};
