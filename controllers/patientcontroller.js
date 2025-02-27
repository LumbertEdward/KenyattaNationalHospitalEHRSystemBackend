const MongoUrl = require('../middleware/baseUrl');
const PatientConnection = require('../models/Patient/account');
const PatientQueueConnection = require('../models/Patient/patientqueue');
const PatientBilling = require('../models/Patient/billing');
const url = new MongoUrl()
const uri = url.getMongoUrl();
const patient = new PatientConnection(uri);
const PatientQueue = new PatientQueueConnection(uri);
const Bill = new PatientBilling(uri);
const { body,validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.RegisterPatient = async function(req, res) {
    try {
        var errors = validationResult(req);
        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var age = req.body.age;
        var gender = req.body.gender;
        var identityNo = req.body.identityNo;
        var country = "Kenya";
        var county = req.body.county;
        var sub_county = req.body.sub_county;
        var village = req.body.village;
        var telephone = req.body.telephone;
        var weight = req.body.weight;
        var height = req.body.height;
        var temperature = req.body.temperature;
        var pressure = req.body.pressure;
        if (errors.isEmpty) {
            var result = await patient.registerPatient(firstName, lastName, age, gender, identityNo, country, county, sub_county, village, telephone, weight, height, temperature, pressure);
            if (result == true) {
                res.json({"message": "Inserted Successfully"});
            }
            else{
                res.json({"message": "Not Inserted"});
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

exports.RegisterNextOfKin = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_id = req.body.patientId
        var NOK_firstName = req.body.firstname;
        var NOK_lastName = req.body.lastname;
        var NOK_telephone = req.body.telephone;
        var gender = req.body.gender;
        var county = req.body.county;
        var sub_county = req.body.sub_county;
        var village = req.body.village;
        var national_id = req.body.national_id; 
        if (errors.isEmpty) {
            var result = await patient.AddNextOfKin(patient_id, NOK_firstName, NOK_lastName, NOK_telephone, gender, county, sub_county, village, national_id);
            if (result == true) {
                res.json({"message": "Inserted Successfully"});
            }
            else{
                res.json({"message": "Not Inserted"});
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

exports.EditPatientProfile = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_Id = req.body.patient_Id;
        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var age = req.body.age;
        var county = req.body.county;
        var sub_county = req.body.sub_county;
        var village = req.body.village;
        var telephone = req.body.telephone;
        var weight = req.body.weight;
        var height = req.body.height;
        var temperature = req.body.temperature;
        var pressure = req.body.pressure;
        if (errors.isEmpty) {
            const result = await patient.editPatientProfile(patient_Id, firstName, lastName, age, county, sub_county, village, telephone, weight, height, temperature, pressure);
            if (result == true) {
                res.json({"message": "Edited Successfully"});
            }
            else{
                res.json({"message": "Not Edited"});
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
            res.json({"message": "Patients Records available", data : patientList});
        }
        else{
            res.json({"message": "No Patient Records found"});
        }
    }catch(error){
        console.log(error);
    }
}

exports.CheckPatientByName = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var patientName = req.query.firstname;
        if (errors.isEmpty()) {
            var result = await patient.CheckPatientDetailsByName(patientName);
            if (result.length > 0) {
                res.json({"message": "Patient Details Found", "data": result});
            }
            else{
                res.json({"message": "No Patient Details Found"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.CheckPatientById = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var patient_id = req.query.patient_id;
        if (errors.isEmpty()) {
            var result = await patient.CheckPatientDetailsById(patient_id);
            if (result.length > 0) {
                res.json({"message": "Patient Details Found", "data": result});
            }
            else{
                res.json({"message": "No Patient Details Found"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.DeletePatientById = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var patient_Id = req.query.patient_id;
        if (errors.isEmpty()) {
            var result = await patient.DeletePatientDetailsById(patient_Id);
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

//patient Queue

exports.AddPatientInQueue = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_Id = req.post.patient_id;
        var doctor_Id = req.post.doctor_id;
        var department_Id = req.post.department_id;

        if (errors.isEmpty) {
            const result = await PatientQueue.addPatientInQueue(patient_Id, department_Id, doctor_Id);
            if (result == true) {
                res.json({"message": "Added to Queue"});
            }
            else{
                res.json({"message": "Not Added"});
            }
        }
    } catch (error) {
        console.log(errors);
    }
}

exports.GetPatientsInQueue = async function(req, res) {
    try {
        const result = await PatientQueue.getPatientsInQueue();
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

exports.GetPatientsInQueueByDoctor = async function(req, res) {
    try {
        var errors = validationResult(req);
        var doctor_Id = req.params.doctor_id;

        if (errors.isEmpty) {
            const result = await PatientQueue.getPatientsInQueueByDoctor(doctor_Id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "Not Found"});
            }
        }
        else{
            res.json({"message": errors.array});
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.GetPatientsInQueueBYDepartment = async function(req, res) {
    try {
        var errors = validationResult(req);
        var department_Id = req.params.department_id;

        if (errors.isEmpty) {
            const result = await PatientQueue.getPatientsInQueueBYDepartment(department_Id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "Not Found"});
            }
        }
        else{
            res.json({"message": errors.array});
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.RemovePatientFromQueue = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_Id = req.params.patient_id;

        if (errors.isEmpty) {
            const result = await PatientQueue.removePatientFromQueue(patient_Id);
            if (result == true) {
                res.json({"message": "Removed"});
            }
            else{
                res.json({"message": "Not Removed"});
            }
        }
        else{
            res.json({"message": errors.array});
        }
        
    } catch (error) {
        console.log(error);
    }
}


//Billing

exports.SetBill = async function(req, res) {
    try {
        var errors = validationResult(req);
        var treatment_id = req.body.treatment_id
        var patient_id = req.body.patient_id;
        var service_name = req.body.service_name;
        var service_cost = req.body.service_cost;
        var service_department = req.body.service_department;
        var today = new Date();
        var time = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        var added_on = time;
        var added_by = req.body.added_by;

        if (errors.isEmpty) {
            const result = await Bill.setBill(treatment_id, patient_id, service_name, service_cost, service_department, added_on, added_by);
            if (result == true) {
                res.json({"message": "Added to Bill"});
            }
            else{
                res.json({"message": "Not Added"});
            }
        }
    } catch (error) {
        console.log(errors);
    }
}

exports.MakeStripePayment = async function(req, res) {
    const { product, token } = req.body;
    const idempotencyKey = uuidv4()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
        customer: customer.id, // set the customer id
        amount: product.amount * 100, // 25
        currency: 'usd',
        receipt_email: token.email,
        description: 'Payments',
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(error => console.error(error));
    
}

exports.PayBill = async function(req, res) {
    try {
        var errors = validationResult(req);
        var bill_id = req.query.bill_id;

        if (errors.isEmpty) {
            const result = await Bill.payBill(bill_id);
            if (result == true) {
                res.json({"message": "Bill Payed"});
            }
            else{
                res.json({"message": "Not Added"});
            }
        }
    } catch (error) {
        console.log(errors);
    }
}

exports.GetBillTotal = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_id = req.params.patient_id;

        if (errors.isEmpty) {
            const result = await Bill.getBillTotal(patient_id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "Not Found"});
            }
        }
        else{
            res.json({"message": errors.array});
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.GetServiceDepartment = async function(req, res) {
    try {
        var errors = validationResult(req);
        var service_id = req.params.service_id;

        if (errors.isEmpty) {
            const result = await Bill.getServiceDepartment(service_id);
            if (result != "") {
                res.json({"message": "Found", "department": result});
            }
            else{
                res.json({"message": "Not Found"});
            }
        }
        else{
            res.json({"message": errors.array});
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.GetBillReport = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_id = req.params.patient_id;

        if (errors.isEmpty) {
            const result = await Bill.getBillReport(patient_id);
            if (result.length > 0) {
                res.json({"message": "Found", "data": result});
            }
            else{
                res.json({"message": "Not Found"});
            }
        }
        else{
            res.json({"message": errors.array});
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.GetCompletedBillReport = async function(req, res) {
    try {
        const result = await Bill.getCompletedBillReport()
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            console.log(result)
            res.json({"message": "Not Found"});
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.GetPendingBillReport = async function(req, res) {
    try {
        const result = await Bill.getPendingBillReport()
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

