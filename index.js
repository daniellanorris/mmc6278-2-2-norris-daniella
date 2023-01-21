const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
// const { doesNotMatch } = require("assert");
// const { pipeline } = require("stream");
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
      const line = text.split(`\n`);
      console.log(line)
      const randomLine = line[Math.floor(Math.random() * line.length)]
      var randomQuote = 
      randomLine
      .split(`|`)
      [0];
      console.log(chalk.blue.bgYellowBright(randomQuote))
    } catch (err) {
      console.log(err)
    }
  });

program

  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
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
  });

program.parse();
