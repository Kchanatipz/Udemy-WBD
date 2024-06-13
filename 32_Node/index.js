const colors = require("colors");
const franc = require("franc");
const langs = require("langs");

const inputs = process.argv[2];
// console.log(inputs);

const langCode = franc(inputs);
// console.log(langCode);

if (langCode === "und") {
  console.log("Sorry, couldn't figure out the language!".red);
} else {
  const language = langs.where("3", langCode);
  console.log(`The language is : ${language.name}`.green);
}
