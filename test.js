import test from 'ava';
import StringFormatter from '.';

const strings = {
  stringA: 'I am a string',
  stringB: 'string {varA} {varB} {varC}',
  data: {
    stringC: 'I am a nested string'
  },
  random: [
    'string1',
    'string2',
    'string3',
    'string4'
  ],
  randomData: [
    {
      data: 'I am random string data'
    }
  ]
};

test('returns strings', t => {
  const {getString} = new StringFormatter(strings);

  const result = getString('stringA');

  t.is(result, strings.stringA);
});

test('formats variables in strings', t => {
  const {getString} = new StringFormatter(strings);

  const result = getString('stringB', {varA: 123, varB: 'some-data'});
  const expected = 'string 123 some-data {varC}';

  t.is(result, expected);
});

test('returns given key if strig does not exist', t => {
  const {getString} = new StringFormatter(strings);

  const key = 'string.no.exist';
  const result = getString(key);

  t.is(result, key);
});

test('returns nested strings', t => {
  const {getString} = new StringFormatter(strings);

  const result = getString('data.stringC');

  t.is(result, strings.data.stringC);
});

test('returns random string if provided an array', t => {
  const {getString} = new StringFormatter(strings);

  const result = getString('random[?]');
  const resultB = getString('random[?]');

  t.true(strings.random.includes(result));
  t.true(strings.random.includes(resultB));
});

test('returns nested data in random string', t => {
  const {getString} = new StringFormatter(strings);

  const result = getString('randomData[?].data');

  t.is(result, strings.randomData[0].data);
});
