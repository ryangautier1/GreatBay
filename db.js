var mysql = require("mysql");

const _DB_NAME = "greatBay";
const _USERTABLE_NAME = "users";
const _ITEMTABLE_NAME = "items";
const _AUCTIONTABLE_NAME = "auctions";
const _BIDTABLE_NAME = "bids";
const _AUCTIONCONTENT_NAME = "itemsInAuction";

function User(firstName, lastName = "", streetAddress1 = "", streetAddress2 = "", city = "", state = "") {
    return {
        firstname: firstName,
        lastname: lastName,
        streetaddress1: streetAddress1,
        streetaddress2: streetAddress2,
        city: city,
        state: state
    };
};

function SaleItem(item, description = "", price = 0.00, quantity = 0) {
    return {
        item: item,
        description: description,
        price: price,
        quantity: quantity
    };
};

function Auction(name, sellerID, startDate = new Date(), endDate = new Date()) {
    return {
        name: name,
        startdate: startDate,
        enddate: endDate,
        sellerid: sellerID
    };
};

function Bid(bidderID, itemId, price) {
    return {
        bidderid: bidderID,
        itemid: itemId, 
        price: price
    };
};

function AuctionItem(itemID, auctionID, startingPrice = 0.00) {
    return {
        itemid: itemID,
        auctionid: auctionID,
        startingprice: startingPrice
    };
};

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: _DB_NAME
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

function createUser(userName = "") {
    console.log("Inserting a new user...\n");
    var query = connection.query(
        "INSERT INTO " + _USERTABLE_NAME + " SET ?",
        new User(userName),
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " user(s) added.\n");
        });
    console.log(query.sql);
};

function createItem(itemName = "") {
    console.log("Inserting a new item...\n");
    var query = connection.query(
        "INSERT INTO " + _ITEMTABLE_NAME + " SET ?",
        new SaleItem(itemName),
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " item(s) added.\n");
        });
    console.log(query.sql);
};

function createAuction(auctionName = "") {
    console.log("Inserting a new auction...\n");
    var query = connection.query(
        "INSERT INTO " + _AUCTIONTABLE_NAME + " SET ?",
        new Auction(itemName),
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " auction(s) added.\n");
        });
    console.log(query.sql);
};

function createBid(bidderID, itemID, price) {
    console.log("Inserting a new bid...\n");
    var query = connection.query(
        "INSERT INTO " + _BIDTABLE_NAME + " SET ?",
        new Bid(bidderID, itemID, price),
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " bid(s) added.\n");
        });
    console.log(query.sql);
};

function addItemToAuction(auctionID, itemID, startingPrice) {
    console.log("Inserting a new item...\n");
    var query = connection.query(
        "INSERT INTO " + _AUCTIONCONTENT_NAME + " SET ?",
        new AuctionItem(auctionID, itemID, startingPrice),
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " item(s) added.\n");
        });
    console.log(query.sql);
}

function updateTable(tableName, whereFieldValuePairs, setFieldValuePairs) {
    console.log("Updating " + tableName + " table...\n");
    var query = connection.query(
        "UPDATE " + tableName + " SET ? WHERE ?",
        [
            whereFieldValuePairs,
            setFieldValuePairs
        ],
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " row(s) updated1\n");
        });
        console.log(query.sql);
};

function updateUser(userName, setFieldValuePairs) {
    console.log("Updating " + _USERTABLE_NAME + " table...\n");
    var query = connection.query(
        "UPDATE " + _USERTABLE_NAME + " SET ? WHERE ?",
        [
            { name: userName },
            setFieldValuePairs
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " row(s) updated!\n");
        });
        console.log(query.sql);
};

function deleteRows(tableName, whereFieldValuePairs) {
    console.log("Deleting from table " + tableName);
    var query = connection.query(
        "DELETE FROM " + tableName + " WHERE ?",
        whereFieldValuePairs,
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " rows deleted!\n");
        });
    console.log(query.sql);
};

function readTable(tableName, whereFieldValuePairs = null) {
    console.log("Selecting from table " + tableName + "...\n");
    
    function catchQuery(err, res) {
        if (err) throw err;
        console.log(res);
    };

    if (whereFieldValuePairs) {
        connection.query(
            "SELECT * FROM " + tableName + " WHERE ?",
            whereFieldValuePairs,
            catchQuery
        );    
    } else {
        connection.query(
            "SELECT * FROM " + tableName + ";",
            catchQuery
        );    
    };
};
