import inquirer from "inquirer";

type userInfo = {
  userName: string;
  userPin: number;
  accountType: string;
  transactionType: string;
  amount: number;
};

const answers: userInfo = await inquirer.prompt([
  {
    type: "input",
    name: "userName",
    message: "Enter your username please: ",
  },
  {
    type: "number",
    name: "userPin",
    message: "Enter your secret 4 digit PIN: ",
  },
  {
    type: "list",
    name: "accountType",
    message: "Selec your account type: ",
    choices: ["Saving", "Current"],
  },
  {
    type: "list",
    name: "transactionType",
    message: "Selec transaction type: ",
    choices: ["Fast Cash", "Withdraw", "Balance Inquiry"],
    when(answers) {
      return answers.accountType;
    },
  },
  {
    type: "list",
    name: "amount",
    message: "Select the amount you want to withdraw: ",
    choices: [1000, 3000, 5000, 10000, 15000, 20000],
    when(answers) {
      return answers.transactionType == "Fast Cash";
    },
  },
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

if (answers.userName && answers.userPin) {
  let balance = Math.floor(Math.random() * 10000000);
  let enteredAmount = answers.amount;
  let remainigBalance = balance - enteredAmount;
  if (answers.transactionType == "Balance Inquiry") {
    console.log(balance);
  } else if (answers.transactionType != "Balance Inquiry") {
    if (enteredAmount <= balance) {
      console.log(
        `You have succesfully withdrawn ${enteredAmount} from your account. The remaining balance is: ${remainigBalance}`
      );
    } else {
      console.log(`Insufficient Balance: ${balance}`);
    }
  }
}
