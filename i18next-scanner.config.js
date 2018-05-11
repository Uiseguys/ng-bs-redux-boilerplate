var fs = require('fs');
var chalk = require('chalk');
var sha1 = require('sha1');

module.exports = {
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t'],
      extensions: ['.js', '.html']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      extensions: ['.js', '.html'],
      fallbackKey: function(ns, value) {
        // Returns a hash value as the fallback key
        return sha1(value);
      }
    },
    lngs: ['en', 'de'],
    ns: ['common'],
    defaultLng: 'en',
    defaultNs: 'common',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'src/assets/locales/{{lng}}.{{ns}}.json',
      savePath: 'src/assets/locales/{{lng}}.{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: ':', // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  transform: function customTransform(file, enc, done) {
    'use strict';
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(
      content,
      { list: ['i18next._', 'i18next.__'] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: ':',
            keySeparator: false
          })
        );
        ++count;
      }
    );

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
    }

    done();
  }
};
