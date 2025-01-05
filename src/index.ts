import r, { IntR, Edges } from "array-gpio-es";
import { NumOutputs, getStateFromByte } from "./NumOutputs.js";
import { NumInput } from "./NumInputs.js";

const inputSettings = { intR: IntR.UP, edge: Edges.BOTH } as const;

const generateOutputHandlers = (outputInstance: NumOutputs, num: number) => ({
  set: (state: 0 | 1) => outputInstance.setOutput(num, state),
  get: () => outputInstance.getOutputState(num),
});

const outputs = new NumOutputs();

const Io = {
  o: outputs,
  o1: generateOutputHandlers(outputs, 1),
  o2: generateOutputHandlers(outputs, 2),
  o3: generateOutputHandlers(outputs, 3),
  o4: generateOutputHandlers(outputs, 4),
  o5: generateOutputHandlers(outputs, 5),
  o6: generateOutputHandlers(outputs, 6),
  o7: generateOutputHandlers(outputs, 7),
  o8: generateOutputHandlers(outputs, 8),
  i1: new NumInput(r.in(7, inputSettings)),
  i2: new NumInput(r.in(11, inputSettings)),
  i3: new NumInput(r.in(13, inputSettings)),
  i4: new NumInput(r.in(16, inputSettings)),
  i5: new NumInput(r.in(15, inputSettings)),
  i6: new NumInput(r.in(18, inputSettings)),
  i7: new NumInput(r.in(23, inputSettings)),
  i8: new NumInput(r.in(26, inputSettings)),
  i9: new NumInput(r.in(24, inputSettings)),
  i10: new NumInput(r.in(21, inputSettings)),
  i11: new NumInput(r.in(22, inputSettings)),
  i12: new NumInput(r.in(19, inputSettings)),
};

export { getStateFromByte };
export default Io;
