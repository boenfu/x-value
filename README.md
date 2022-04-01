[![NPM version](https://img.shields.io/npm/v/x-value?color=%23cb3837&style=flat-square)](https://www.npmjs.com/package/x-value)
[![Repository package.json version](https://img.shields.io/github/package-json/v/vilic/x-value?color=%230969da&label=repo&style=flat-square)](./package.json)
[![MIT license](https://img.shields.io/github/license/vilic/x-value?style=flat-square)](./LICENSE)

# X-Value

X-Value (X stands for "cross") is a medium-somewhat-neutral alternative to libraries like [io-ts](https://github.com/gcanti/io-ts) and [Zod](https://github.com/colinhacks/zod).

Comparing to the input/output concept of io-ts or Zod, X-Value uses medium/value concept and allows multiple input "mediums", and the output is referred as "value".

**Currently under development.**

- [ ] Self referencing types.
- [ ] Documentation.
- [ ] 100% test coverage.

> I seriously doubt the usefulness of the medium/value concept in practice, after I prototyped X-Value.

## Usages

Defining types with X-Value is similar to io-ts/Zod.

```ts
import * as x from 'x-value';

const Oops = x.object({
  foo: x.string,
  bar: x.optional(x.number),
});

const Aha = x.array(Oops);

const Um = x.union(Oops, x.boolean);

const I = x.intersection(
  Oops,
  x.object({
    yoha: x.boolean,
  }),
);
```

Decode from medium:

```ts
let value = Oops.decode(x.json, '{"foo":"abc","bar":123}');
```

Encode to medium:

```ts
let json = Oops.decode(x.json, {foo: 'abc', bar: 123});
```

Convert from medium to medium:

```ts
let json = Oops.convert(x.queryString, x.json, 'foo=abc&bar=123');
```

Type `is` guard:

```ts
if (Oops.is(value)) {
  // ...
}
```

Type `satisfies` assertion (will throw if does not satisfy):

```ts
let oops = Oops.satisfies(value);
```

Diagnose for type issues:

```ts
let issues = Oops.diagnose(value);
```

## Mediums and Value

Assuming we have 3 mediums: `browser`, `server`, `rpc`; and 2 types: `ObjectId`, `Date`. Their types in mediums and value are listed below.

| Type\Medium | Browser  | RPC                | Server     | Value    |
| ----------- | -------- | ------------------ | ---------- | -------- |
| `ObjectId`  | `string` | packed as `string` | `ObjectId` | `string` |
| `Date`      | `Date`   | packed as `string` | `Date`     | `Date`   |

We can encode value to a medium:

<!-- prettier-ignore -->
```ts
let id = '6246056b1be8cbf6ca18401f';

ObjectId.encode(browser, id); // string '6246056b1be8cbf6ca18401f'
ObjectId.encode(rpc, id);     // packed string '"6246056b1be8cbf6ca18401f"'
ObjectId.encode(server, id);  // new ObjectId('6246056b1be8cbf6ca18401f')

let date = new Date('2022-03-31T16:00:00.000Z');

Date.encode(browser, date); // new Date('2022-03-31T16:00:00.000Z')
Date.encode(rpc, date);     // packed string '"2022-03-31T16:00:00.000Z"'
Date.encode(server, date);  // new Date('2022-03-31T16:00:00.000Z')
```

Or decode packed data of a medium to value:

```ts
// All result in '6246056b1be8cbf6ca18401f'
ObjectId.decode(browser, '6246056b1be8cbf6ca18401f');
ObjectId.decode(rpc, '"6246056b1be8cbf6ca18401f"');
ObjectId.decode(server, new ObjectId('6246056b1be8cbf6ca18401f'));

// All result in new Date('2022-03-31T16:00:00.000Z')
Date.decode(browser, new Date('2022-03-31T16:00:00.000Z'));
Date.decode(rpc, '"2022-03-31T16:00:00.000Z"');
Date.decode(server, new Date('2022-03-31T16:00:00.000Z'));
```

## License

MIT License.
