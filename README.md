# Unipi-driver
unipi-driver is a small TS library for handling unipi digital inputs and digital outputs of a Unipi 1.1

## Installation

use yarn or npm to install the package to you project

```bash
yarn add unipi-driver
```

```bash
npm install unipi-driver
```

## Usage

This lib exposes a single object allowing to access the 8 outputs and the 12 inputs.

```python
import Io from "unipi-driver"

// set state of output 2
Io.o1.set(1)

// get state of output 3
Io.o1.get()

// Inputs are NumInputs object from array-gpio-es
console.log(Io.i1.state) // prints true or false
console.log(Io.i1.isOn)  // returns boolean according to input is On.
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)