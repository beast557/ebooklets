const Comment = require('../models/Comment');
const { validationResult } = require("express-validator");
const User = require('../models/User');
const Book = require('../models/Book');

exports.create_comment = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {id} = req.user
    const {content} = req.body
    const {bookId} = req.params
try{
    const comment = await Comment.create({
        userId:id,
        content,
        bookId
    })
    if(comment){
        return res.send({ msg: [{ msg: "Commented successfully" }]});
    }
    return res.status(400).json({ errors: [{ msg: 'Sorry commenting failed' }] });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
}

exports.delete_comment = async (req,res,next) =>{
    const {id} = req.user
    const {commentId} = req.params
try{
    const comment = await Comment.destroy({
       where:{
           userId:id,
           id:commentId
       }
    })
    if(comment){
        return res.send({ msg: [{ msg: "Commented deleted successfully" }]});
    }
    return res.status(400).json({ errors: [{ msg: 'Sorry failed deleting comment' }] });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
}

exports.show_single_comment = async (req,res,next) =>{
    const {commentId} = req.params
    try {
        const comment = await Comment.findOne({
            where:{
                id:commentId
            },
            attributes:['id','content','createdAt'],
            include:[{
                model:User,
                attributes:['id','username']
            },{
                model:Book,
                attributes:['id','bookname']
            }]
        })
        if(comment){
            return res.send(comment);
        }
        return res.status(400).json({ errors: [{ msg: 'Comment not found' }] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.show_comments = async (req,res,next) =>{
    const {bookId} = req.params
    try {
        const comments = await Comment.findAll({
            where:{
                bookId
            },
            attributes:['id','content','createdAt'],
            include:[{
                model:User,
                attributes:['id','username']
            },{
                model:Book,
                attributes:['id','bookname']
            }]
        })
        if(comments){
            return res.send(comments);
        }
        return res.status(400).json({ errors: [{ msg: 'Comment not found' }] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}