const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const { doesNotMatch } = require("assert");
const { pipeline } = require("stream");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      var text = await fs.readFile(QUOTE_FILE,`utf-8`)
      console.log(text)
      line = (text) =>
        text
        .split(`\n`);
      const randomLine = line[Math.floor(Math.random() * line.length)]
      var randomQuote = (randomLine) =>
      randomLine
      .split(`\|`)
      [2];
      console.log(chalk.blue.bgYellowBright(randomLine[randomQuote]))
    } catch (err) {
      console.log(err)
    }
  });

program

  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      // const joinedLine = quoteAuthor.join("\n")
      if (!author) {
        const anonymous = "Anonymous"
        const anonAuthor = fs.appendFile(QUOTE_FILE, ["\n" + quote + "\|" + anonymous], `utf-8`)
        console.log(anonAuthor)
        console.log(chalk.redBright.bgGrey(`quote was added`))
      } else if(author) {
      const quoteAuthor = await fs.appendFile(QUOTE_FILE, ["\n" + quote + "\|" + author], `utf-8`)
      console.log(quoteAuthor)
      console.log(chalk.redBright.bgGrey(`quote was added`))
      }

    } catch (err) {
      console.log(err)
    }
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
  });

program.parse();
