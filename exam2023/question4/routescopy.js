const Book = require("../models/book")
const Purchase = require("../models/purchase")
const router = require('express').Router();

router.route("/ListAllBooks").get((req, res) => {
    try{
        let books = Book.find().select("title author price availability");
        res.status(200).json(books);
    }catch(error){
        console.log(error);
    }
})


router.route("/searchBook/:key").get( async (req,res) => {
    try{
        let result = await Book.find({
            "$or": [
                {
                    title: {$regex : req.body.key}
                },
                {
                    author: {$regex: req.body.key}
                },
                {
                    genre: {$regex: req.body.key}
                }
            ]
        })
        res.status(200).json(result);
    }catch(error){
        console.error(error);
    }

})