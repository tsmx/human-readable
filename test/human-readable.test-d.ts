import { expectType } from 'tsd';
import { availableSizes, fromBytes, calcFromTo, HROptionsType } from '../human-readable';

const testOptions: HROptionsType = {
    mode: 'IEC',
    numberOnly: false
}

expectType<string[]>(availableSizes());

expectType<string>(fromBytes(1024, testOptions));

expectType<string>(calcFromTo(1024, 'KBYTE', 'MBYTE', undefined));