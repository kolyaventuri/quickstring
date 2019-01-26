import test from 'ava';
import StringFormatter from '.';

const strings = {
  stringA: 'I am a string',
  stringB: 'string {varA} {varB} {varC}',
  data: {
    stringC: 'I am a nested string'
  }
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

test('returns nested strings', t => {
  const {getString} = new StringFormatter(strings);

  const result = getString('data.stringC');

  t.is(result, strings.data.stringC);
});
