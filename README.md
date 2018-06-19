# envfile (dotenv) parser / serialize

*An envfile parser written in javascript*

## Usage

`npm install dotenv-parser-serializer`

Parsing:

```javascript
import { parse } from 'dotenv-parser-serializer';

// parse transforms the contents of an envfile into a JSON object

const envfileContents = `

# Retrieve your public key at
# https://my-public-key.fr
SERVER_PUBLIC_KEY=f4dfneihfrhei
SERVER_PRIVATE_KEY="dewhifewgif4dfneihfrhei"

`;

assert.equal(
  parse(envfileContents),
  // output:
  {
    SERVER_PUBLIC_KEY: 'f4dfneihfrhei',
    SERVER_PRIVATE_KEY: 'dewhifewgif4dfneihfrhei',
  }
);

// You can extract comments and use them as descriptions using the `extractDescriptions` option

assert.equal(
  parse(envfileContents, { extractDescriptions: true }),
  // output:
  {
    SERVER_PUBLIC_KEY: {
      value: 'f4dfneihfrhei',
      description: 'Retrieve your public key at\nhttps://my-public-key.fr',
    },
    SERVER_PRIVATE_KEY: {
      value: 'dewhifewgif4dfneihfrhei',
      description: null,
    },
  }
);
```

Serializing:


```javascript
import { serialize } from 'dotenv-parser-serializer';

// serialize transforms an object of key => values into a string.

assert.equal(
  serialize({
    SERVER_PUBLIC_KEY: 'f4dfneihfrhei',
    SERVER_PRIVATE_KEY: 'dewhifewgif4dfneihfrhei',
  }),
  // output:
  `SERVER_PUBLIC_KEY=f4dfneihfrhei

SERVER_PRIVATE_KEY="dewhifewgif4dfneihfrhei"`
);

// You can insert comments in the file by providing an object containing a "description" property instead of a string.

assert.equal(
  serialize({
    SERVER_PUBLIC_KEY: 'f4dfneihfrhei',
    SERVER_PRIVATE_KEY: {
      description: `My private key\nIt's secret`,
      value: 'dewhifewgif4dfneihfrhei',
    },
  }),
  `SERVER_PUBLIC_KEY=f4dfneihfrhei

# My private key
# It's secret
SERVER_PRIVATE_KEY="dewhifewgif4dfneihfrhei"`
);
```


## Envfile syntax

The envfile may contain the following syntax (PR welcome if more support is needed):

- Any line starting with `#` is a comment
- The others should be in the format `<key>=<value>` where
  - `key` is string matching the following format: `/[a-zA-Z_\-]+[0-9a-zA-Z_\-]*/`
  - `value` is a either a "quoted string" or "unquoted string"

A quoted string is a string surrounded by double quotes:  
`MY_KEY="my value"`

A quoted string may contain escaped characters such as \n, \f, \r, \b, \", \\, \t and can be multiline


An unquoted string is a string that does not start with a double quote:
`MY_KEY=my value`

An unquoted string cannot be multiline and cannot contain escaped characters.
