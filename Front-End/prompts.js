// Protocol
const inquirer = require("inquirer");

// Function of prompts if user chooses to post 
const post = function() {
    inquirer.prompt([
        {
            type: "input",
            message: "What would you like to post?",
            name: "item"
        },
        {
            type: "input",
            message: "How much do you want the starting bid to be?",
            name: "startingBid"
        }
    ])
}

// Function of prompts if user chooses bid
const bidding = function() {
    inquirer.prompt([
        {
            type: "input",
            message: "What item would you like to bid?",
            name: "bitItem"
        },
        {
            type: "input",
            message: "How much would do you want to bid?",
            name: "bid"
        }        
    ])
}

// Welcome prompts user with choice to post or bid item
inquirer.prompt([
    {
        type: "list",
        message: "Welcome to Great Bay!",
        name: "stack",
        choices: [
            "POST AN ITEM",
            "BID ON AN ITEM"
        ]
    }
])


