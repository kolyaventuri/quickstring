const randomTag = /\[?\]$/;

const formatString = (string, args) => {
  const names = Object.keys(args);

  for (const name of names) {
    const regex = new RegExp(`{${name}}`, 'g');
    string = string.replace(regex, args[name]);
  }

  return string;
};

const getPart = parts => {
  let part = parts.shift();
  if (randomTag.test(part)) {
    part = part.split('[?]')[0];
  }

  return part;
};

class StringFormatter {
  constructor(strings) {
    this.strings = strings;

    this.getString = this.getString.bind(this);
  }

  getString(parts, args = {}, stringObj = this.strings, key = null) {
    if (typeof parts === 'string') {
      return this.getString(parts.split('.'), args, stringObj, parts);
    }

    if (typeof stringObj === 'string') {
      return formatString(stringObj, args);
    }

    const part = getPart(parts);
    const subPart = stringObj[part];

    if (typeof subPart === 'undefined') {
      return key;
    }

    if (Array.isArray(subPart)) {
      const randomKey = ~~(Math.random() * subPart.length);
      return this.getString(parts, args, subPart[randomKey], key);
    }

    return this.getString(parts, args, subPart, key);
  }
}

module.exports = StringFormatter;
