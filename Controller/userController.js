const mongoose = require('mongoose');
const user = require('../model/userSchema')

const createUser = async (req, res, next) => {
    try {
        const { name, email, mobile, dob } = req.body;


        if (!name || !email || !mobile || !dob) {
            res.json({ alert: "Please Fill the Data" })
        }
        //check user already exist or not

        const data = new user({
            name, email, mobile, dob: new Date(dob)
        })

        if (data) {
            const xyz = await data.save();
            if (xyz) {
                res.status(200).json({
                    status: "Success",
                    message: "user created."
                });
                return;

            } else {
                res.status(200).json({
                    status: "FAILED",
                    message: "failed to create user. Please try again."
                });
                return;
            }
        } else {
            res.status(200).json({
                status: "FAILED",
                message: "failed to create user. Please try again."
            });
            return;
        }
    }
    catch {
        (error) => {
            res.json({
                status: "FAILED",
                message: error.message
            });
            return;
        }
    }
}

const getUserData = async (req, res, next) => {
    //fetch records from db
    let data = await user.find();
      let  userData = data;
     await userData.forEach((element) => {
        delete element.name;
        //calculate the age 
       const age = calculateAge(new Date(11/12/2000))
      element["age"]= age;
       
    });
    
    if (userData[0].age) {
        res.status(200).json({
            status: "Success",
            message: "data fetch successfully",
            userData
        });
        return;
    } else {
        return res.status(404).json("Error occurred while getting the data...")
    }
}

const getUserDataByID = async (req, res, next) => {
    const getID = req.params.id;

    const data = await user.findById({ _id: getID })
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

    if (data) {
        return res.json(data)
    } else {
        res.status(404).json({ Error: 'Entered ID data does not exist....' })
    }
}

exports.createUser = createUser;
exports.getUserData = getUserData;
exports.getUserDataByID = getUserDataByID;



//helper function to calculate age

function calculateAge(dateString) {
   
    var now = new Date();

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    var dob = new Date(dateString.getFullYear(),
        dateString.getMonth(),
        dateString.getDate()
    );

    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};


    var monthAge;
    var dateAge;

    let yearAge = yearNow - yearDob;

    if (monthNow >= monthDob) {
        monthAge = monthNow - monthDob;
    }
    else {
        yearAge--;
        monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob) {
        dateAge = dateNow - dateDob;
    }
    else {
        monthAge--;
        dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };
    return age
}