// @flow

import parse from './src/parse';

const testFile = `

   
#test
# test
UNQUOTED_STRING=a pony in the dark
LINE_WITH_QUOTE_AT_END=the quote => "

ENV_WITH_ESCAPED_QUOTE="quote => \\""
  ENV_WITH_ESCAPED_ESCAPER="escaper => \\\\"
MULTILINE="
test

line4"
`;

console.log('=> parsing dotenv file:');
console.log(testFile);
console.log('=> output:');
console.log(parse(testFile));

console.log(serialize({
  TEST: '42423',
  TEST2: '13423',
  TEST3: {
    description: 'Hello\ndwe',
    value: 'df'
  },
}));
