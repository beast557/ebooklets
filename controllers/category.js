const {validationResult } = require('express-validator');
const User = require('../models/User')
const Category = require('../models/Category')


exports.create_category = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
      const {type} = req.body
      const {id} = req.user

      try {
          const checkAlreadyCategoryExist = await Category.findOne({
              where:{
                  type
              }
          })
          if(checkAlreadyCategoryExist){
              return res.status(400).json({ errors: [{ msg: 'Category already exists' }] })
          }

          category = await Category.create({
              type,
              userId:id,
            });
          res.json(category);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
    
exports.show_categories = async (req,res,next) =>{

    try {
        categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    }
}

exports.delete_categories = async (req,res,next) =>{
    const {categoryId} = req.params;
    const {id} = req.user
    try {
        const category = await Category.destroy({
            where: {
              id:categoryId,
              userId:id
            },
          });
          if(category){
            return res.status(202).send({ msg: [{ msg: "Category removed successfully" }]})
          }
        return res.status(404).send({ errors: [{ msg: "Category not found" }]});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}