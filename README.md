# [**human-readable**](https://github.com/tsmx/human-readable)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![npm (scoped)](https://img.shields.io/npm/v/@tsmx/human-readable)
![node-current (scoped)](https://img.shields.io/node/v/@tsmx/human-readable)
[![Build Status](https://travis-ci.com/tsmx/human-readable.svg?branch=master)](https://travis-ci.org/tsmx/human-readable)
[![Coverage Status](https://coveralls.io/repos/github/tsmx/human-readable/badge.svg?branch=master)](https://coveralls.io/github/tsmx/human-readable?branch=master)

> Easily create human-readable strings for byte sizes and other units, e.g. 17238 --> 17.24 kB. Supports decimal (MB,GB,..) and binary (MiB, GiB,..) units.

For details about the differences of decimal (SI) and binary (IEC) units please refer to [Wikipedia](https://en.wikipedia.org/wiki/Byte).

## Usage

```js
const hr = require('@tsmx/human-readable');

hr.fromBytes(17238);
// '17.24 kB'

hr.fromBytes(17238, { mode: 'IEC' });
// '16.83 KiB'

hr.fromBytes(17238, { numberOnly: true });
// '17.24'

hr.fromBytes(17238, { fixedPrecision: '1' });
// '17.2 kB'

hr.fromBytes(17238, { fullPrecision: true });
// '17.238 kB'

hr.fromTo(17, 'GBYTE', 'KBYTE');
// '17000000 kB'

hr.fromTo(17, 'GBYTE', 'KBYTE', { mode: 'IEC' });
// '17825792 KiB'

hr.availableSizes();
// [ 'BTYE', 'KBYTE', 'MBYTE', 'GBYTE', 'TBYTE', 'PBYTE' ]
```

## API

### fromBytes(bytes, options)

Automatically creates a human-readable string out of a given number of bytes. E.g. 71255 --> 71.26 kB

#### bytes

Type: `Number`

Amount of bytes.

#### options

Type: `Object`

Optional. 

##### mode

Type: `String`
Default: none (use decimal mode)

Can be to `IEC` to use binary conversion (factor 1.024) and units (KiB,MiB,...). If not set or any other value, decimal conversion (factor 1.000) and units (kB, MB,...) are used. 

##### numberOnly

Type: `Boolean`
Default: `false`

If set to true, conversion only returns the number and omits the unit. Overrides `noWhitespace`.

##### fixedPrecision

Type: `Number`

If set the returned number string formatted to the given fixed decimal places. If not set, the default behaviour of the conversion is to use a dynamic number of decimal places from zero to two.

##### fullPrecision

Type: `Boolean`
Default: `false`

If set to true, the returned number value will be presented with full available precision. Overrides `fixedPrecision`.

##### noWhitespace

Type: `Boolean`
Default: `false`

If set to true, the whitespace between the number and unit string is omitted. E.g. '10MB' instead of '10 MB'.

### fromTo(value, fromUnit, toUnit, options)

Converts a size value from a given unit to a human-readable string of a target unit. E.g. converting Gigabytes to Megabytes.

#### value

Type: `Number`

The given value to be converted.

#### fromUnit

Type: `String`

The unit the given `value` has. Must be one out of `availableSizes`.

#### toUnit

Type: `String`

The unit `value` should be converted to. Must be one out of `availableSizes`.

#### options

Type: `Object`

See description under `fromBytes`.

### availableSizes()

Return an array of strings of all available sizes.