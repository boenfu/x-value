import {atomicTypeSymbol, medium} from '../medium';
import {
  booleanTypeSymbol,
  dateTypeSymbol,
  nullTypeSymbol,
  numberTypeSymbol,
  stringTypeSymbol,
  undefinedTypeSymbol,
  unknownTypeSymbol,
} from '../types';

export interface ECMAScriptTypes {
  [unknownTypeSymbol]: unknown;
  [undefinedTypeSymbol]: undefined;
  [nullTypeSymbol]: null;
  [stringTypeSymbol]: string;
  [numberTypeSymbol]: number;
  [booleanTypeSymbol]: boolean;
  [dateTypeSymbol]: Date;
}

export const ecmascript = medium<ECMAScriptTypes>('ECMAScript', {
  codecs: {
    [atomicTypeSymbol]: {
      encode(value) {
        return value;
      },
      decode(value) {
        return value;
      },
    },
  },
});
