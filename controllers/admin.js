const User = require('../models/User');
const UserRole = require('../models/User_role')

exports.changeRole = async(req,res,next) =>{
    const {id} = req.user
    const {role,userId} = req.params
    try {
        let isUserAdmin =  await UserRole.count({where:{
            userId:id,
            name:"admin"
        }})
        if(isUserAdmin){
            await UserRole.update({name:role},{
                where:{
                    userId
                }
            })
            // return res.json(isUserAdmin)
            return res.send({ msg: [{ msg: "User role changed" }]});
        }
        return res.status(400).json({ errors: [{ msg: 'You must be admin to change others role' }] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}