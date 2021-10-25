const AppointmentsConnection = require('../models/appointments/appointments');
const uri = "mongodb+srv://lumbert:mayoga%401990@cluster0.hebw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const Appointment = new AppointmentsConnection(uri);
const { body,validationResult } = require('express-validator');

exports.AddAppointment = async function(req, res) {
    try {
        var errors = validationResult(req);
        var appointment_reason = req.body.appointment_reason;
        var appointment_due_date = req.body.appointment_due_date;
        var appointment_created_date = req.body.appointment_created_date;
        var patient_id = req.body.patient_id;
        var doctor_id = req.body.doctor_id;
        var department_id = req.body.department_id; 
        
        if (errors.isEmpty) {
            var result = await Appointment.placeAppointment(appointment_reason, appointment_due_date, appointment_created_date, patient_id, doctor_id, department_id);
            if (result == true) {
                res.json({"message": "Appointment Placed Successfully"});
            }
            else{
                res.json({"message": "Not Successful"});
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

exports.ApproveAppointmentByDoctor = async function(req, res) {
    try {
        var errors = validationResult(req);
        var appointment_id = req.query.appointment_id;
         
        if (errors.isEmpty) {
            var result = await Appointment.approveAppointmentByDoctor(appointment_id);
            if (result == true) {
                res.json({"message": "Appointment Approved Successfully"});
            }
            else{
                res.json({"message": "Not Approved"});
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

exports.CancellAppointmentByDoctor = async function(req, res) {
    try {
        var errors = validationResult(req);
        var appointment_id = req.query.appointment_id;
         
        if (errors.isEmpty) {
            var result = await Appointment.cancelAppointmentByDoctor(appointment_id);
            if (result == true) {
                res.json({"message": "Appointment Cancelled Successfully"});
            }
            else{
                res.json({"message": "Not Cancelled"});
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

exports.GetAppointmentDate = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var appointment_Id = req.query.appointment_id;
        if (errors.isEmpty()) {
            var result = await Appointment.getAppointmentDate(appointment_Id);
            if (result != null || result != "") {
                res.json({"date": result});
            }
            else{
                res.json({"date": "null"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetAppointmentSummary = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var appointment_Id = req.query.appointment_id;
        if (errors.isEmpty()) {
            var result = await Appointment.getAppointmentSummary(appointment_Id);
            if (result != null) {
                res.json({"summary": result});
            }
            else{
                res.json({"summary": {}});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetPendingAppointmentByDoctor = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var doctor_Id = req.query.doctor_id;
        if (errors.isEmpty()) {
            var result = await Appointment.getPendingAppointmentsByDoctor(doctor_Id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "No data"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetApprovedAppointmentByDoctor = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var doctor_Id = req.query.doctor_id;
        if (errors.isEmpty()) {
            var result = await Appointment.getApprovedAppointmentsByDoctor(doctor_Id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "No data"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetAppointmentByDepartment = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var department_Id = req.query.department_id;
        if (errors.isEmpty()) {
            var result = await Appointment.getAppointmentByDepartment(department_Id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "No data"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetApprovedAppointments = async function(req, res, next) {
    try {
        var result = await Appointment.getApprovedAppointments();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "No data"});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetPendingAppointments = async function(req, res, next) {
    try {
        var result = await Appointment.getPendingAppointments();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "No data"});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.GetAllAppointments = async function(req, res, next) {
    try {
        var result = await Appointment.getAllAppointments();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "No data"});
        }
    } catch (error) {
        console.log(error);
    }
}

//doctors Appointment

exports.AddDoctorAppointmentAvailability = async function(req, res) {
    try {
        var errors = validationResult(req);
        var doctor_id = req.body.doctor_id;
        var date = req.body.date;
        var fromTime = req.body.fromTime;
        var toTime = req.body.toTime;
        var slots = req.body.slots;

        if (errors.isEmpty) {
            var result = await Appointment.setAvailability(doctor_id, date, slots, fromTime, toTime);
            if (result == true) {
                res.json({"message": "Availability Placed Successfully"});
            }
            else{
                res.json({"message": "Not Successful"});
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

exports.GetAvailableSlotsByDate = async function(req, res) {
    try {
        var date = req.query.date;
        var result = await Appointment.getAvailableSlotsByDate(date);
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "No data"});
        }

    } catch (error) {
        console.log(error)
    }
}

exports.GetAvailableSlots = async function(req, res, next) {
    try {
        var result = await Appointment.getAvailableSlots();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "No data"});
        }
    } catch (error) {
        console.log(error);
    }
}