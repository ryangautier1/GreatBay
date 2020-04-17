var inquirer = require("inquirer");

const actionQuestion = [{
    type: "list",
    message: "What would you like to do?",
    choices: ["POST", "BID", "EXIT"],
    name: "action"
}];

// Define questions
const postQuestions = [
    {
        type: "input",
        message: "What is your first name?",
        name: "firstname"
    },
    {
        type: "input",
        message: "What is your last name?",
        name: "lastname"
    },
    {
        type: "input",
        message: "What would you like to post?",
        name: "item"
    },
    {
        type: "input",
        message: "Please enter a description of the item:",
        name: "description"
    },
    {
        type: "number",
        message: "What would you like the starting bid to be?",
        name: "startingBid"
    },
    {
        type: "number",
        message: "What is the item quantity?",
        name: "quantity"
    }
];


bidQuestions = [
    {
        type: "input",
        message: "Question",
        name: "bid"
    }
]
// async function for all processes
async function auction() {

    // initialize action
    var action = {
        action: "cont"
    };

    try {
        while (action.action !== "EXIT") {
            action = await inquirer.prompt(actionQuestion);

            // get unique data based on action
            if (action.action === "POST") {
                var post = await inquirer.prompt(postQuestions);
                // add post info to database
                console.log("Adding post...");
                var query = connection.query("INSERT INTO items SET ?",
                    {
                        item: post.item,
                        description: post.description,
                        price: post.startingBid,
                        quantity: post.quantity
                    }, function (err) {
                        if (err) {
                            throw err;
                        }
                    });

            }
            else if (action.action === "BID") {
                var bid = await inquirer.prompt(bidQuestions);
                // check if bid is high enough

                // update database if it is high enough

            }
        }
    } catch (err) {
        console.log(err);
    }

}

auction();