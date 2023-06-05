import { expectType } from 'tsd';
import { availableSizes, fromBytes, fromTo, HROptionsType } from '../human-readable';

const testOptions: HROptionsType = {
    mode: 'IEC',
    numberOnly: false
}

expectType<string[]>(availableSizes());

expectType<string>(fromBytes(1024, testOptions));

expectType<string>(fromTo(1024, 'KBYTE', 'MBYTE', undefined));
