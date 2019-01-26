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

    for (const part of parts) {
      if (typeof strings[part] === 'string') {
        unformattedString = strings[part];
      } else if (typeof strings[part] === 'undefined') {
        return key;
      }

      strings = strings[part];
    }

    return formatString(unformattedString, args);
  }
}

module.exports = StringFormatter;
