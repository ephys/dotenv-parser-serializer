import parse from './parse';

const r = String.raw;

describe('parse', () => {

  it('Supports simple key=value expressions', () => {

    expect(parse(`MY_KEY=value`)).toEqual({
      MY_KEY: 'value',
    });
  });

  it('Supports multiple key=value expressions', () => {

    expect(parse(`MY_KEY=value\nMY_KEY2=12`)).toEqual({
      MY_KEY: 'value',
      MY_KEY2: '12',
    });
  });

  it('Ignores whitespace and comments', () => {

    expect(parse(`
    
    # This is my first value, very important
    MY_KEY=value
    
    # another key
      KEY2=test
`)).toEqual({
      MY_KEY: 'value',
      KEY2: 'test',
    });
  });

  it('Allows extracting comments', () => {

    expect(parse(`
    
    # This is my first value, very important
    MY_KEY=value
    
    # another key
      KEY2=test
      
      THIRD=abc
`, { extractDescriptions: true })).toEqual({
      MY_KEY: {
        value: 'value',
        description: 'This is my first value, very important',
      },
      KEY2: {
        value: 'test',
        description: 'another key',
      },
      THIRD: {
        value: 'abc',
        description: null,
      },
    });
  });

  it('Supports quoted strings', () => {

    expect(parse(`MY_KEY="value"`)).toEqual({
      MY_KEY: 'value',
    });
  });

  it('Supports quotes inside unquoted strings', () => {

    expect(parse(`MY_KEY=this "quote"`)).toEqual({
      MY_KEY: 'this "quote"',
    });
  });

  it('Supports multiline values', () => {

    const value = `
    
    a
    
    multiline!
    
    value
    
    `;

    expect(parse(`MY_KEY="${value}"`)).toEqual({
      MY_KEY: value,
    });
  });

  it(r`Supports \n inside strings`, () => {

    expect(parse(r`MY_KEY="\nnewline"`)).toEqual({
      MY_KEY: '\nnewline',
    });

    expect(parse(r`MY_KEY=\nnewline`)).toEqual({
      MY_KEY: '\nnewline',
    });
  });

  it(r`Supports \t inside strings`, () => {

    expect(parse(r`MY_KEY="\t"`)).toEqual({
      MY_KEY: '\t',
    });

    expect(parse(r`MY_KEY=\t`)).toEqual({
      MY_KEY: '\t',
    });
  });

  it(r`Supports \b inside strings`, () => {

    expect(parse(r`MY_KEY="\b"`)).toEqual({
      MY_KEY: '\b',
    });

    expect(parse(r`MY_KEY=\b`)).toEqual({
      MY_KEY: '\b',
    });
  });

  it(r`Supports \r inside strings`, () => {

    expect(parse(r`MY_KEY="\r"`)).toEqual({
      MY_KEY: '\r',
    });

    expect(parse(r`MY_KEY=\r`)).toEqual({
      MY_KEY: '\r',
    });
  });

  it(r`Supports \" inside strings`, () => {

    expect(parse(r`MY_KEY="\""`)).toEqual({
      MY_KEY: '"',
    });

    expect(parse(r`MY_KEY=\"`)).toEqual({
      MY_KEY: '"',
    });
  });

  it(r`Supports \f inside strings`, () => {

    expect(parse(r`MY_KEY="\f"`)).toEqual({
      MY_KEY: '\f',
    });

    expect(parse(r`MY_KEY=\f`)).toEqual({
      MY_KEY: '\f',
    });
  });

  it(r`Supports \\ inside strings`, () => {

    expect(parse(r`MY_KEY="\\backslash"`)).toEqual({
      MY_KEY: '\\backslash',
    });

    expect(parse(r`MY_KEY=\\backslash`)).toEqual({
      MY_KEY: '\\backslash',
    });
  });
});
