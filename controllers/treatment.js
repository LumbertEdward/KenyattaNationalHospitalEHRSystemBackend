const TreatmentController = require('../models/treatment/treatment');
const LabController = require('../models/treatment/lab');
const HistoryController = require('../models/treatment/medicationhistory');
const DrugController = require('../models/treatment/drugdispensing');
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
        var patient_id = req.params.patient_id;
        var treatment_id = req.body.treatment_id;
        var staff_id = req.body.staff_id;
        
        if (errors.isEmpty) {
            var result = await Treatment.makeLabRequests(treatment_id, patient_id, staff_id, test_name = "", test_results = "", test_cost = "", lab_test_date = "");
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
        var test_name = req.body.test_name;
        var test_cost = req.body.test_cost;
        var test_results = req.body.test_results;
        var lab_test_date = req.body.lab_test_date;
        var test_status = "true";
        
        if (errors.isEmpty) {
            var result = await Lab.recordTestResults(test_name, test_cost, test_results, lab_test_date, test_status);
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

//prescription

exports.PrescribeDrugs = async function(req, res) {
    try {
        var errors = validationResult(req);
        var treatment_id = req.body.treatment_id;
        var patient_id = req.body.patient_id;
        var drug_prescription = req.body.drug_prescription;
        
        if (errors.isEmpty) {
            var result = await Drug.prescribeDrugs(treatment_id, patient_id, drug_prescription);
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
        var result = await History.getPrescribedDrugs();
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
        var result = await History.getPrescribedDrugsByPatient(req.query.patient_id);
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
        var result = await History.getDrugDispensingReport();
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
        var result = await History.getDrugDispensingReportByPatient(req.query.patient_id);
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







