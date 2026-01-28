import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Type something: ", input => {
  console.log("You typed:", input);
  rl.close();
});

// tiny test testing again