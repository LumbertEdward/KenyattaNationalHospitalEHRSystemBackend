const { validationResult } = require('express-validator');
const StaffConnection = require('../models/Staff/staff');
const uri = "mongodb+srv://lumbert:mayoga%401990@cluster0.hebw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const Staff = new StaffConnection(uri);

exports.RegisterStaff = async function(req, res) {
    try {
        var errors = validationResult(req);
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var gender = req.body.gender;
        var qualification = req.body.qualification;
        var department_id = req.body.department_id;
        var country = req.body.country;
        var county = req.body.county;
        var access_level = req.body.access_level;
        var residence = req.body.residence;
        var joining_date = req.body.joining_date;
        var password = req.body.password;
        var added_on = req.body.added_on;
        var added_by = req.body.added_by;

        if (errors.isEmpty) {           
           const check = await Staff.checkStaffUsername(username);
            if (check == true) {
                var result = await Staff.registerStaff(firstname, lastname, username, qualification, department_id, access_level, country, county, residence, joining_date, password, added_on, added_by, gender);
                if (result == true) {
                    res.json({"message": "Inserted Successfully"});
                }
                else{
                    res.json({"message": "Not Inserted"});
                }
            }
            else{
                res.json({"message": "Username Exists"});
            }

        }
        else{

        }

    }
    catch(error){
        console.log(error);
    }
    
}

exports.LoginStaff = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var username = req.query.username;
        var password = req.query.password;

        if (errors.isEmpty) {
            const result = await Staff.loginStaff(username, password);
            if (result._id != null) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "Not Found"});
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports.EditStaffDetails = async function(req, res) {
    try {
        var errors = validationResult(req);
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var qualification = req.body.qalification;
        var department_id = req.body.department_id;
        var country = req.body.country;
        var county = req.body.county;
        var access_level = req.body.access_level;
        var residence = req.body.residence;
        var joining_date = req.body.joining_date;
        var password = req.body.password;

        if (errors.isEmpty) {
            var result = await Staff.EditStaffProfile(firstname, lastname, qualification, department_id, country, county, residence);
            if (result == true) {
                res.json({"message": "Updated Successfully"});
            }
            else{
                res.json({"message": "Not Updated"});
            }
        }
        else{
            res.json({error: errors.array()});
            console.log(errors);
        }
        
    } 
    catch (error) {
        console.log(error);
    }
}

exports.ActivateAccount = async function(req, res) {
    try {
        var errors = validationResult(req);
        var username = req.query.username;

        if (errors.isEmpty) {
            var result = await Staff.activateAccount(username);
            if (result == true) {
                res.json({"message": "Activated"});
            }
            else{
                res.json({"message": "Not Activated"});
            }
        }
        else{
            res.json({error: errors.array()});
            console.log(errors);
        }
        
    } 
    catch (error) {
        console.log(error);
    }
}

exports.SuspendAccount = async function(req, res) {
    try {
        var errors = validationResult(req);
        var username = req.query.username;

        if (errors.isEmpty) {
            var result = await Staff.suspendAccount(username);
            if (result == true) {
                res.json({"message": "Suspended"});
            }
            else{
                res.json({"message": "Not Suspended"});
            }
        }
        else{
            res.json({error: errors.array()});
            console.log(errors);
        }
        
    } 
    catch (error) {
        console.log(error);
    }
}

exports.DeactivateAccount = async function(req, res) {
    try {
        var errors = validationResult(req);
        var username = req.query.username;

        if (errors.isEmpty) {
            var result = await Staff.deactivateAccount(username);
            if (result == true) {
                res.json({"message": "Deactivated"});
            }
            else{
                res.json({"message": "Not Deactivated"});
            }
        }
        else{
            res.json({error: errors.array()});
            console.log(errors);
        }
        
    } 
    catch (error) {
        console.log(error);
    }
}

exports.DeleteStaffById = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var staff_Id = req.query.staff_id;
        if (errors.isEmpty()) {
            var result = await Staff.DeleteStaffById(staff_Id);
            if (result == true) {
                res.json({"message": "Deleted"});
            }
            else{
                res.json({"message": "Not Deleted"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
}

exports.AllStaff = async function(req, res, next) {
    try {
        var result = await Staff.allStaff();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "Not Found"});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.AddNotifications = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var message = req.query.message;
        var sender_username = req.query.sender_username;
        var category = req.query.category;
        var receiver_username = req.query.receiver_username;
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        if (errors.isEmpty) {
            const result = await Staff.addNotification(receiver_username, sender_username, category, message, time);
            if (result == true) {
                res.json({"message": "Added"});
            }
            else{
                res.json({"message": "Not Added"});
            }
        }
    } catch (error) {
        console.log(error);
    }
}


exports.GetNotifications = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var id = req.query.id;
            var result = await Staff.getNotificationById(id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "Not Found"});
            }

        }
    } catch (error) {
        console.log(error);
    }
}