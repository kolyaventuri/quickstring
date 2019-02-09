const randomTag = /\[?\]$/;

const formatString = (string, args) => {
  const names = Object.keys(args);

  for (const name of names) {
    const regex = new RegExp(`{${name}}`, 'g');
    string = string.replace(regex, args[name]);
  }

  return string;
};

class StringFormatter {
  constructor(strings) {
    this.strings = strings;

    this.getString = this.getString.bind(this);
  }

  getString(key, args = {}) {
    const parts = key.split('.');
    let unformattedString = '';
    let {strings} = this;

    for (let part of parts) {
      let randomKey = null;
      if (randomTag.test(part)) {
        part = part.split('[?]')[0];
      }

      if (typeof strings[part] === 'string') {
        unformattedString = strings[part];
      } else if (Array.isArray(strings[part])) {
        randomKey = ~~(Math.random() * strings[part].length);
        unformattedString = strings[part][randomKey];
      } else if (typeof strings[part] === 'undefined') {
        return key;
      }

      strings = randomKey === null ? strings[part] : strings[part][randomKey];
    }

    return formatString(unformattedString, args);
  }
}

module.exports = StringFormatter;
