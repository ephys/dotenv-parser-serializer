import serialize from './serialize';

describe('serialize', () => {

  it('Supports simple { key: value } objects', () => {

    expect(serialize({
      MY_KEY: 'value',
    })).toEqual(`MY_KEY="value"`);
  });

  it('Supports { key: { value } } objects', () => {

    expect(serialize({
      MY_KEY: {
        value: 'value',
      },
    })).toEqual(`MY_KEY="value"`);
  });

  it('Supports { key: { value, description } } objects', () => {

    expect(serialize({
      MY_KEY: {
        value: 'value',
        description: 'My key',
      },
    })).toEqual(`# My key
MY_KEY="value"`);
  });

  it('Supports multiline descriptions', () => {

    expect(serialize({
      MY_KEY: {
        value: 'value',
        description: 'My key\ngenerate it at xxx',
      },
    })).toEqual(`# My key
# generate it at xxx
MY_KEY="value"`);
  });
});
