const Book = require('../models/Book');
const User = require('../models/User');
const UserRole = require('../models/User_role')
const path = require('path')
const { v4  } = require('uuid');
const fs = require('fs');
const { Op } = require("sequelize");

exports.upload_book =  async (req,res,next) =>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ errors: [{ msg: 'Select a pdf first to upload' }] });
      }
      book = req.files.book;
      fileName = v4()+book.name
      uploadPath =  path.join(__dirname, '..','books_upload',fileName );
    
    const {description,author,bookname} = req.body
    const {id} = req.user

    const fileDetails = {
        filename: fileName,
        mimetype: book.mimetype,
        size: (book.size)/1000,
        uploadPath:uploadPath,
        userId: id,
        bookname,
        description,
        author
    }
    if(fileDetails.mimetype !="application/pdf"){
        return res.status(400).json({ errors: [{ msg: 'We currently only support PDF ebook formate' }] });
    }

    try{
        await Book.create(fileDetails)
        await book.mv(uploadPath, function(err) {
            if (err)
              return res.status(500).send(err);
        return res.send({ msg: [{ msg: "Book updated successfully" }]});
        });       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.delete_book =  async (req,res,next) =>{
    const {id} = req.user
    const {bookId} = req.params
    try {
        const userRole = await UserRole.findOne({
            where:{
                userId:id
            }
        })
        let isAdmin = userRole === "admin"
        let book = await Book.findOne({
            where:{
                id:bookId,
                userId:id
            }
        })
        let userOwnThisBook = (book === null?false:true)
        
        if(isAdmin || userOwnThisBook){
            await Book.destroy({
                where: {
                    id: bookId
                },
              });
              fs.unlinkSync(book.uploadPath);
            return res.send({ msg: [{ msg: "Book deleted successfully" }]});
        }
        return res.status(400).json({ errors: [{ msg: 'book deleting failed' }] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.show_book_by_pk =  async (req,res,next) =>{
    const {bookId} = req.params
    try {
        let book = await Book.findOne({
            where:{
                id:bookId
            },
            include:[{
                model:User,
                attributes:['id','username']
            }]
        })
        if(book){
            return res.status(200).send(book)
        }
        return  res.status(404).json({ errors: [{ msg: 'No book found ' }] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
exports.get_books_homepage = async(req,res,next) =>{
    try {
        let books = await Book.findAll()
        if(books){
            return res.status(200).json(books)
        }
        return res.status(404).json({ errors: [{ msg: 'No book found ' }] })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.search_books =  async (req,res,next) =>{
    try {
     const {search_word} = req.params
     let books = await Book.findAll({
         where:{
            [Op.or]: [
            {
                bookname:{
                    [Op.like]:`%${search_word}%`
                }

        },{
            author:{
                [Op.like]:`%${search_word}%`
            }
        }]
         }
     })
    if(book){
        return res.status(200).send(books)

    }
    return res.status(404).json({ errors: [{ msg: 'No book found ' }] })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }        
    }

