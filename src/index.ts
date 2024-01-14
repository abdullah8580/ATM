import { log } from "console";
import inquirer from "inquirer";

type userInfo = {
  userName: string;
  userPin: number;
  accountType: string;
  transactionType: string;
  amount: number;
};

const answers: userInfo = await inquirer.prompt([
  // Taking client id as input
  {
    type: "input",
    name: "userName",
    message: "Enter your username please: ",
  },
  // Taking client 4 digit password if username is correct
  {
    type: "number",
    name: "userPin",
    message: "Enter your secret 4 digit PIN: ",
    when(answers) {
      return answers.userName == "client";
    },
  },
  // Selection between different account types if user Pin is correct
  {
    type: "list",
    name: "accountType",
    message: "Selec your account type: ",
    choices: ["Saving", "Current"],
    when(answers) {
      return answers.userPin == 9731;
    },
  },
  // Selection of transaction if any account type is selected
  {
    type: "list",
    name: "transactionType",
    message: "Select transaction type: ",
    choices: ["Fast Cash", "Withdraw", "Balance Inquiry"],
    when(answers) {
      return answers.accountType;
    },
  },
  // Selection of fast cash options if fast cash is selected in transaction type
  {
    type: "list",
    name: "amount",
    message: "Select the amount you want to withdraw: ",
    choices: [1000, 3000, 5000, 10000, 15000, 20000],
    when(answers) {
      return answers.transactionType == "Fast Cash";
    },
  },
  // input of amount if withdraw option is selected in actions
  {
    type: "number",
    name: "amount",
    message: "Enter the amount you want to withdraw: ",
    when(answers) {
      return answers.transactionType == "Withdraw";
    },
  },
]);

// console.log(answers);

// If username and password is correct, ATM will start working

if (answers.userName == "client" && answers.userPin == 9731) {
  // Generating random account balance with Math.random function

  let balance = Math.floor(Math.random() * 10000000);
  let enteredAmount = answers.amount;
  // Setting remaining balance after transaction
  let remainigBalance = balance - enteredAmount;
  if (answers.transactionType == "Balance Inquiry") {
    console.log(balance);
  } else if (answers.transactionType != "Balance Inquiry") {
    if (enteredAmount <= balance) {
      console.log(
        `You have succesfully withdrawn ${enteredAmount} from your account. The remaining balance is: ${remainigBalance}`
      );
      // Throwing error if entered amount is greater then account balance
    } else {
      console.log(`Insufficient Balance: ${balance}`);
    }
  }
}

// Throwing error if username or 4 digit pin is incorrect
else {
  console.log("Wrong username or Pin");
}
