const PatientConnection = require('../models/Patient/account');
const uri = "mongodb+srv://lumbert:mayoga%401990@cluster0.hebw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const patient = new PatientConnection(uri);
const { body,validationResult } = require('express-validator')

exports.LoginPatient = async function(req, res, next) {
    
}

exports.RegisterPatient = async function(req, res) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var firstName = req.body.firstname;
            var lastName = req.body.lastname;
            var age = req.body.age;
            var gender = req.body.gender;
            var identityNo = req.body.identityNo;
            var country = req.body.country;
            var county = req.body.county;
            var sub_county = req.body.sub_county;
            var village = req.body.village;
            var telephone = req.body.telephone;
            var result = patient.registerPatient(firstName, lastName, age, gender, identityNo, country, county, sub_county, village, telephone);
            if (result == true) {
                console.log("Inserted Successfully");
            }
            else{
                console.log("Not Inserted");
            }
        }
        else{
            res.json({error: errors.array()});
            console.log(errors);
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.ViewPatients = async function(req, res) {
    try{
        const patientList = await patient.viewAllPatients();
        if (patientList.length > 0) {
            console.log(patientList)
            res.json({"data": patientList});
        }
    }catch(error){
        console.log("Not Found");
    }
}