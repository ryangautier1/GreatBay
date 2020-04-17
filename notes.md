# Tables 
    
## Users table
- ID
- First Name
- Last Name
- Street Address 1
- Street Address 2
- City
- State
    
## Items table
- ID
- Item Name
- Item Description

## Auctions table
- ID
- Name
- Start date
- End Date
- Seller ID

## Items in Auction
> This table lists each item and to which auction it belongs. It's the standard way in DBs to avoid having a list of items inside a field. [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
- Listing ID (ID)
- Item ID
- Auction ID
- Initial Price? (or we could just do it as a first bid in the Bids Table... hm...)

## Bids
> Same as the Auctions table. For a high bid on an item, you just SELECT MAX WHERE ItemID = 'x'.
- Bid ID (ID)
- Bidder ID
- Item ID
- Price
