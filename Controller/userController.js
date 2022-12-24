const mongoose = require('mongoose');
const user = require('../model/userSchema')

const createUser = async (req, res, next)=>{
    try{
        const {name, email, mobile, dob} = req.body;

        console.log("birthday", dob);
        if(!name || !email || !mobile || !dob){
            res.json({alert: "Please Fill the Data"})
        }

        const data = new user({
            name, email, mobile, dob : new Date()
        })

        if(data){
            console.log("data : ",data);
            await data.save();
            return res.status(200).json(req.body);   
        }else{
            return res.send("Please try again")
        }
    } 
    catch{(error)=>{
        console.log(error);
    }}
}

const getUserData = async(req, res, next) =>{
    const data = await user.find()

    if(data){
        res.json(data)
    }else{
        return res.status(404).json("Error occurred while getting the data...")
    }
}

const getUserDataByID = async(req, res, next) => {
    const getID = req.params.id;

    const data = await user.findById({_id:getID})
    console.log(data);

    // Date.prototype.yyyymmdd = function() {
    //     var mm = this.getMonth() + 1; // getMonth() is zero-based
    //     var dd = this.getDate();
      
    //     return [this.getFullYear(),
    //             (mm>9 ? '' : '0') + mm,
    //             (dd>9 ? '' : '0') + dd
    //            ].join('');
    //   };
      
    //   var date = new Date();
    //   date.yyyymmdd();

    if(data){
        return res.json(data)
    }else{
        res.status(404).json({Error : 'Entered ID data does not exist....'})
    }
}

exports.createUser = createUser;
exports.getUserData = getUserData;
exports.getUserDataByID = getUserDataByID;
