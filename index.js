const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try{
      var text = await fs.readFile(QUOTE_FILE, `utf-8`) 
      console.log(text)

      const line = text.split("\n")
      console.log(line)

      const randomQuote = line[Math.floor(Math.random() * line.length)]

      const dataBreak = line.split("\\|")
      console.log(dataBreak)
      console.log(chalk.blue.bgYellowBright(randomQuote))
    } catch(err) { 
      console.log(err)
    }
  });

program
  
    .command("addQuote <quote> [author]")
    .description("adds a quote to the quote file")
    .action(async (quote, author) => {
      try{
       const quoteAuthor = await fs.writeFile(QUOTE_FILE, `utf-8`, [quote, author])
      // const joinedLine = quoteAuthor.join("\n")
      if(!author) {
        const anonymous = `Anonymous`
        fs.writeFile(QUOTE_FILE, `utf-8`, [quote, anonymous])
        console.log(chalk.redBright.bgGrey(`quote was added`))
      }
       const joinedDataAuth = quoteAuthor.join("\\|")
        console.log(joinedDataAuth)
        console.log(chalk.redBright.bgGrey(`quote was added`))

      } catch(err) {
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
