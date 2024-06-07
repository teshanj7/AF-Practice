let Book = require("../models/course");
let Payment = require("../models/Payment");
let router = require("express").Router();

//list all available books
router.route("/listAllBooks").get( (req, res) => {
    try{
        let books = Book.find().select("title author price availablity");
        res.status(200).json(books);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error!"});
    }
})

// search
router.route("/searchBook/:key").get( async (req, res) => {
    try{
        let result = await Book.find({
            "$or": [
                {
                    title : {$regex : req.params.key}
                },
                {
                    author: {$regex : req.params.key}
                },
                {
                    genre : {$regex : req.params.key}
                }
            ]
        })
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error with searching data!"});
    }
})

//purchase book
router.route("/purchaseBook/:id").post( (req, res) => {
    let bookId = req.params.id;
    const { noOfBooks, price } = req.body;
    let total = noOfBooks * price;

    const newPurchase = new Payment({
        bookId,
        noOfBooks,
        price,
        total
    })

    try{
        newPurchase.save();
        res.status(200).json({message: "Purchase approved, now proceeding to payment..."});
    }catch(error){
        console.log(error);
    }
})

