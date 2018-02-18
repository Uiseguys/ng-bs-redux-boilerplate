"use strict";
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const i18Directory = path.resolve(__dirname, "../src/assets/locales");

const projectUrl =
  "http://18.196.175.166:3000/api/Published/361c9e81-8d78-4fff-b53e-21cdc47846c8";
const version = "Latest";
const languages = ["en", "de"];
const namespaces = ["default"];

languages.forEach(lang => {
  namespaces.forEach(namespace => {
    axios
      .get(`${projectUrl}/${lang}/${namespace}?version=${version}`)
      .then(({ data }) => {
        fs.writeFile(
          `${i18Directory}/${lang}.${namespace}.json`,
          JSON.stringify(data),
          function(err) {
            if (err) {
              return console.log(err);
            }

            console.log(`${lang}-${namespace} saved`);
          }
        );
      });
  });
});
