const MongoUrl = require('../middleware/baseUrl');
const { validationResult } = require('express-validator');
const StaffConnection = require('../models/Staff/staff');
const url = new MongoUrl()
const uri = url.getMongoUrl();
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
        var national_id = req.body.national_id;
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
                var result = await Staff.registerStaff(firstname, lastname, username, qualification, department_id, access_level, country, county, residence, joining_date, password, added_on, added_by, gender, national_id);
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
            if (result.password != "") {
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

exports.UpdateStaffPassword = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var national_id = req.query.national_id;
        var password = req.query.password

        if (errors.isEmpty) {
            const result = await Staff.updatePassword(national_id, password);
            if (result == true) {
                res.json({"message": "Updated"});
            }
            else{
                res.json({"message": "Not Updated"});
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetStaffDetails = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var national_id = req.query.national_id;

        if (errors.isEmpty) {
            const result = await Staff.getStaffDetails(national_id);
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
        var national_id = req.query.national_id;
        var username = req.query.username;
        var firstname = req.query.firstname;
        var lastname = req.query.lastname;
        var residence = req.query.residence;
        var country = req.query.country;
        var county = req.query.county;
        var password = req.query.password;

        if (errors.isEmpty) {
            var result = await Staff.EditStaffProfile(national_id, username, firstname, lastname, residence, country, county, password);
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
        var staff_Id = req.query.username;
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

exports.AllPendingStaff = async function(req, res, next) {
    try {
        var result = await Staff.allPendingStaff();
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

exports.AllActivatedStaff = async function(req, res, next) {
    try {
        var result = await Staff.allActivatedStaff();
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

exports.AllSuspendedStaff = async function(req, res, next) {
    try {
        var result = await Staff.allSuspendedStaff();
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
        var sender_id = req.query.sender_id;
        var category = req.query.category;
        var receiver_id = req.query.receiver_id;
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        if (errors.isEmpty) {
            const result = await Staff.addNotification(receiver_id, sender_id, category, message, time);
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

//departments 

exports.AddDepartment = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var department_name = req.body.department_name;
        var added_by = req.body.added_by;

        if (errors.isEmpty) {
            const result = await Staff.addDepartment(department_name, added_by);
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

exports.GetDepartments = async function(req, res, next) {
    try {
        var result = await Staff.getDepartments();
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

exports.GetDepartmentById = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var department_id = req.params.department_id;
            var result = await Staff.getDepartmentById(department_id);
            if (result != {}) {
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