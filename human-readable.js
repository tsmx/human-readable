var sizes = new Map();
sizes.set('BYTE', {
    index: 0,
    unit: 'B',
    unitLowercase: 'b',
    unitIEC: 'B',
    unitLowercaseIEC: 'b'
});
sizes.set('KBYTE', {
    index: 1,
    unit: 'kB',
    unitLowercase: ' kb',
    unitIEC: 'KiB',
    unitLowercaseIEC: 'kib'
});
sizes.set('MBYTE', {
    index: 2,
    unit: 'MB',
    unitLowercase: 'mb',
    unitIEC: 'MiB',
    unitLowercaseIEC: 'mib'
});
sizes.set('GBYTE', {
    index: 3,
    unit: 'GB',
    unitLowercase: 'gb',
    unitIEC: 'GiB',
    unitLowercaseIEC: 'gib'
});
sizes.set('TBYTE', {
    index: 4,
    unit: 'TB',
    unitLowercase: 'tb',
    unitIEC: 'TiB',
    unitLowercaseIEC: 'tib'
});
sizes.set('PBYTE', {
    index: 5,
    unit: 'PB',
    unitLowercase: 'pb',
    unitIEC: 'PiB',
    unitLowercaseIEC: 'pib'
});

sizes[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => b[1].index - a[1].index);
}

const factorDecimal = 1000;
const factorIEC = 1024;
const defaultMaxPrecision = 2;

function countDecimals(value) {
    return value % 1 ? value.toString().split(".")[1].length : 0;
}

function calcSize(size, originalUnit, targetUnit, iecMode = false) {
    let resultSize = NaN;
    let resultUnit = null;
    if (!sizes.has(originalUnit) || !sizes.has(targetUnit)) {
        return { size: resultSize, unit: resultUnit };
    }
    let original = sizes.get(originalUnit);
    let target = sizes.get(targetUnit);
    let delta = target.index - original.index;
    let factor = iecMode ? factorIEC : factorDecimal;
    if (delta > 0) {
        // convert to larger unit
        resultSize = parseFloat(size) / Math.pow(factor, delta);
    }
    else if (delta < 0) {
        // convert to smaller unit
        resultSize = parseFloat(size) * Math.pow(factor, Math.abs(delta));
    }
    else {
        // target === original
        resultSize = parseFloat(size);
    }
    resultUnit = iecMode ? target.unitIEC : target.unit;
    return { size: resultSize, unit: resultUnit };
}

function autoCalcSize(bytes, iecMode = false) {
    let resultSize = parseFloat(bytes);
    let resultUnit = iecMode ? sizes.get('BYTE').unitIEC : sizes.get('BYTE').unit;
    let factor = iecMode ? factorIEC : factorDecimal;
    for (let [key, value] of sizes) {
        if (bytes >= Math.pow(factor, value.index)) {
            resultSize = bytes / Math.pow(factor, value.index);
            resultUnit = iecMode ? value.unitIEC : value.unit;
            break;
        }
    }
    return { size: resultSize, unit: resultUnit };
}

function postProcessResult(size, unit, options) {
    let resultSize = parseFloat(size);
    // option: precision, defaultMax: 2 - only if fullPrecision is not present or false!
    if (!(options && options.fullPrecision === true)) {
        if (options && options.fixedPrecision) {
            let precision = parseInt(options.fixedPrecision);
            if (!isNaN(precision)) {
                resultSize = resultSize.toFixed(precision);
            }
            else {
                if (countDecimals(resultSize) > defaultMaxPrecision)
                    resultSize = resultSize.toFixed(defaultMaxPrecision);
            }
        }
        else {
            if (countDecimals(resultSize) > defaultMaxPrecision)
                resultSize = resultSize.toFixed(defaultMaxPrecision);
        }
    }
    // option: numberOnly
    if (options && options.numberOnly && options.numberOnly === true) {
        return resultSize.toString();
    }
    // option: noWhitespace
    let noWhitespace = (options && options.noWhitespace && options.noWhitespace == true);
    return resultSize + (noWhitespace ? '' : ' ') + unit;
}

module.exports.fromBytes = function (bytes, options) {
    // option IEC mode: default = decimal
    let iecMode = (options && options.mode && options.mode === 'IEC') ? true : false;
    let { size, unit } = autoCalcSize(bytes, iecMode);
    return postProcessResult(size, unit, options);
}

module.exports.fromTo = function (value, fromUnit, toUnit, options) {
    // option IEC mode: default = decimal
    let iecMode = (options && options.mode && options.mode === 'IEC') ? true : false;
    let { size, unit } = calcSize(value, fromUnit, toUnit, iecMode);
    return postProcessResult(size, unit, options);
}