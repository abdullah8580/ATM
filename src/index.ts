#! /usr/bin/env node

// username is client and password is 9731

import inquirer from "inquirer";
import chalk from "chalk";

type userInfo = {
  userName: string;
  userPin: number;
  accountType: string;
  transactionType: string;
  amount: number;
};

console.log(
  chalk.greenBright(
    "<--------------------------Welcome to Bank ATM-------------------------->"
  )
);

const answers: userInfo = await inquirer.prompt([
  // Taking client id as input
  {
    type: "input",
    name: "userName",
    message: chalk.cyanBright("Enter your username please: "),
  },
  // Taking client 4 digit password if username is correct
  {
    type: "number",
    name: "userPin",
    message: chalk.cyanBright("Enter your secret 4 digit PIN: "),
    when(answers) {
      return answers.userName == "client";
    },
  },
  // Selection between different account types if user Pin is correct
  {
    type: "list",
    name: "accountType",
    message: chalk.magentaBright("Select your account type: "),
    choices: ["Saving", "Current"],
    when(answers) {
      return answers.userPin == 9731;
    },
  },
  // Selection of transaction if any account type is selected
  {
    type: "list",
    name: "transactionType",
    message: chalk.magentaBright("Select transaction type: "),
    choices: ["Fast Cash", "Withdraw", "Balance Inquiry"],
    when(answers) {
      return answers.accountType;
    },
  },
  // Selection of fast cash options if fast cash is selected in transaction type
  {
    type: "list",
    name: "amount",
    message: chalk.magentaBright("Select the amount you want to withdraw: "),
    choices: [1000, 3000, 5000, 10000, 15000, 20000],
    when(answers) {
      return answers.transactionType == "Fast Cash";
    },
  },
  // input of amount if withdraw option is selected in actions
  {
    type: "number",
    name: "amount",
    message: chalk.cyanBright("Enter the amount you want to withdraw: "),
    when(answers) {
      return answers.transactionType == "Withdraw";
    },
  },
]);

// console.log(answers);

// If username and password is correct, ATM will start working

if (answers.userName == "client" && answers.userPin == 9731) {
  // Generating random account balance with Math.random function

  let balance = Math.floor(Math.random() * 1000000);
  let enteredAmount = answers.amount;
  // Setting remaining balance after transaction
  let remainigBalance = balance - enteredAmount;
  if (answers.transactionType == "Balance Inquiry") {
    console.log(balance);
  } else if (answers.transactionType != "Balance Inquiry") {
    if (enteredAmount <= balance) {
      console.log(
        chalk.blueBright(
          `You have succesfully withdrawn ${enteredAmount} from your account. The remaining balance is: ${remainigBalance}`
        )
      );
      // Throwing error if entered amount is greater then account balance
    } else {
      console.log(chalk.redBright(`Insufficient Balance: ${balance}`));
    }
  }
}

// Throwing error if username or 4 digit pin is incorrect
else {
  console.log(chalk.redBright("Wrong username or Pin"));
}
