const TreatmentController = require('../models/treatment/treatment');
const LabController = require('../models/treatment/lab');
const HistoryController = require('../models/treatment/medicationhistory');
const DrugController = require('../models/treatment/drugdispensing');
const { validationResult } = require('express-validator');
const uri = "mongodb+srv://lumbert:mayoga%401990@cluster0.hebw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const Treatment = new TreatmentController(uri);
const Lab = new LabController(uri);
const History = new HistoryController(uri);
const Drug = new DrugController(uri);

exports.RecordMetrics = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_id = req.params.patient_id;
        var patient_height = req.body.patient_height;
        var patient_temperature = req.body.patient_temperature;
        var patient_weight = req.body.patient_weight;
        
        if (errors.isEmpty) {
            var result = await Treatment.recordMetrics(patient_id, patient_weight, patient_temperature, patient_height);
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

exports.GetMetrics = async function(req, res) {
    try{
        var errors = validationResult(req);
        var patient_id = req.params.patient_id;

        if (errors.isEmpty) {
            const patientList = await Treatment.getMetrics(patient_id);
            if (patientList.patient_id != null) {
                res.json({"message": "Patients Records available", data : patientList});
            }
            else{
                res.json({"message": "No Patient Records found"});
            }
        }
        else{
            console.log(errors)
        }
        
    }catch(error){
        console.log(error);
    }
}

exports.WriteTreatment = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_id = req.params.patient_id;
        var treatment_notes = req.body.treatment_notes;
        var test_id = req.body.test_id;
        var drug_id = req.body.drug_id;
        var staff_id = req.body.staff_id;
        var treatment_date = req.body.treatment_date;
        var treatment_disease = req.body.treatment_disease;
        
        if (errors.isEmpty) {
            var result = await Treatment.writeTreatment(patient_id, treatment_notes, test_id, drug_id, staff_id, treatment_date, treatment_disease);
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

exports.GetTreatmentSummary = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var treatment_id = req.query.treatment_id;
        if (errors.isEmpty) {
            var result = await patient.getTreatmentSummary(treatment_id);
            if (result.patient_id != null) {
                res.json({"message": "Treatment Details Found", "data": result});
            }
            else{
                res.json({"message": "No Treatment Details Found"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.MakeLabRequests = async function(req, res) {
    try {
        var errors = validationResult(req);
        var patient_id = req.body.patient_id;
        var staff_id = req.body.staff_id;
        var test_notes = req.body.test_notes;
        
        if (errors.isEmpty) {
            var result = await Treatment.makeLabRequests(patient_id, staff_id, test_notes, test_results = "", test_cost = "", lab_test_date = "");
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

exports.GetTreatmentReport = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var patient_id = req.query.patient_id;
        if (errors.isEmpty) {
            var result = await Treatment.GetTreatmentReport(patient_id);
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

//lab

exports.ApproveTests = async function(req, res) {
    try {
        var errors = validationResult(req);
        var lab_test_id = req.query.lab_test_id;
        var test_status = "true";
        
        if (errors.isEmpty) {
            var result = await Lab.approveTest(lab_test_id, test_status);
            if (result == true) {
                res.json({"message": "Approved Successfully"});
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

exports.GetTestCost = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var test_id = req.query.test_id;
        if (errors.isEmpty) {
            var result = await Lab.getTestCost(test_id);
            if (result.test_cost != null) {
                res.json({"message": "Cost Found", "data": result});
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

exports.RecordTestResults = async function(req, res) {
    try {
        var errors = validationResult(req);
        var lab_test_id = req.query.lab_test_id
        var test_cost = req.query.test_cost;
        var test_results = req.query.test_results;
        var today = new Date()
        var lab_test_date = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
        
        if (errors.isEmpty) {
            var result = await Lab.recordTestResults(lab_test_id, test_cost, test_results, lab_test_date);
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

exports.GetLabTestReport = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        var patient_id = req.query.patient_id;
        if (errors.isEmpty) {
            var result = await Lab.getLabTestReport(patient_id);
            if (result.length > 0) {
                res.json({"message": "Report Found", "data": result});
            }
            else{
                res.json({"message": "No Report Found"});
            }
        }
        else{
            console.log(errors.array());
        }
    } catch (error) {
        console.log(error);
    }
    
} 

exports.GetRequestedPatientLabResult = async function(req, res, next) {
    try {
        var errors = validationResult(req)
        if (errors.isEmpty) {
            var patient_id = req.query.patient_id

            var result = await Lab.getRequestedPatientLabResults(patient_id);
            if (result.length > 0) {
                res.json({"message": "Requests Found", "data": result});
            }
            else{
                res.json({"message": "No Request Found"});
            }
        }
        else{
            console.log("Input Error")
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.GetRequestedLabTests = async function(req, res, next) {
    try {
        var result = await Lab.getRequestedLabTests();
        if (result.length > 0) {
            res.json({"message": "Requests Found", "data": result});
        }
        else{
            res.json({"message": "No Request Found"});
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.GetApprovedRequestedLabTests = async function(req, res, next) {
    try {
        var result = await Lab.getApprovedRequestedLabTests();
        if (result.length > 0) {
            res.json({"message": "Requests Found", "data": result});
        }
        else{
            res.json({"message": "No Request Found"});
        }
    } catch (error) {
        console.log(error);
    }
    
}

//history

exports.GetTreatmentHistorySummary = async function(req, res, next) {
    try {
        var result = await History.getTreatmentSummary(req.params.patient_id);
        if (result.length > 0) {
            res.json({"message": "Summary Found", "data": result});
        }
        else{
            res.json({"message": "No Summary Found"});
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.VisitSummary = async function(req, res, next) {
    try {
        var result = await History.visitSummary(req.params.patient_id);
        if (result.length > 0) {
            res.json({"message": "Summary Found", "data": result});
        }
        else{
            res.json({"message": "No Summary Found"});
        }
    } catch (error) {
        console.log(error);
    }
    
}

//drugs
exports.AddDrugs = async function(req, res) {
    try {
        var errors = validationResult(req);
        var drug_name = req.body.drug_name
        var drug_cost = req.body.drug_cost
        var total = req.body.total
        
        if (errors.isEmpty) {
            var result = await Drug.addDrugs(drug_name, drug_cost, total);
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

exports.GetDrugs = async function(req, res, next) {
    try {
        var result = await Drug.getDrugs();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "NotFound"});
        }
    } catch (error) {
        console.log(error);
    }
    
}


//prescription

exports.PrescribeDrugs = async function(req, res) {
    try {
        var errors = validationResult(req);
        var treatment_id = req.body.treatment_id;
        var patient_id = req.body.patient_id;
        var drug = req.body.drug
        var days = req.body.days
        var usage = req.body.usage
        var notes = req.body.notes
        
        if (errors.isEmpty) {
            var result = await Drug.prescribeDrugs(treatment_id, patient_id, drug, days, usage, notes);
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

exports.IssueDrugs = async function(req, res) {
    try {
        var errors = validationResult(req);
        var drug_id = req.query.drug_id;
        
        if (errors.isEmpty) {
            var result = await Drug.issueDrugs(drug_id);
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

exports.GetPrescribedDrugs = async function(req, res, next) {
    try {
        var result = await Drug.getPrescribedDrugs();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "NotFound"});
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.GetPrescribedDrugsByPatient = async function(req, res, next) {
    try {
        var result = await Drug.getPrescribedDrugsByPatient(req.query.patient_id);
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "NotFound"});
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.GetDrugDispensingReport = async function(req, res, next) {
    try {
        var result = await Drug.getDrugDispensingReport();
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "NotFound"});
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.GetDrugDispensingReportByPatient = async function(req, res, next) {
    try {
        var result = await Drug.getDrugDispensingReportByPatient(req.query.patient_id);
        if (result.length > 0) {
            res.json({"message": "Found", "data": result});
        }
        else{
            res.json({"message": "NotFound"});
        }
    } catch (error) {
        console.log(error);
    }
    
}







