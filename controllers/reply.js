const Comment = require('../models/Comment');
const { validationResult } = require("express-validator");
const User = require('../models/User');
const Reply = require('../models/Reply');

exports.create_reply = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {id} = req.user
    const {content} = req.body
    const {commentId} = req.params
try{
    const reply = await Reply.create({
        userId:id,
        content,
        commentId
    })
    if(reply){
        return res.send({ msg: [{ msg: "Replied successfully" }]});
    }
    return res.status(400).json({ errors: [{ msg: 'Sorry replying to this comment failed' }] });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
}
exports.delete_reply = async (req,res,next) =>{
    const {id} = req.user
    const {replyId} = req.params
try{
    const reply = await Reply.destroy({
       where:{
           userId:id,
           id:replyId
       }
    })
    if(reply){
        return res.send({ msg: [{ msg: "Reply deleted successfully" }]});
    }
    return res.status(400).json({ errors: [{ msg: 'Sorry failed deleting this reply' }] });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
}

exports.show_replies = async (req,res,next) =>{
    const {commentId} = req.params
    try {
        const replies = await Reply.findAll({
            where:{
                commentId
            },
            attributes:['id','content','createdAt'],
            include:[{
                model:User,
                attributes:['id','username']
            }]
        })
        if(replies){
            return res.send(replies);
        }
        return res.status(400).json({ errors: [{ msg: ' no reply found' }] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}