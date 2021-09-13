var express = require('express');
const { RegisterPatient, ViewPatients, CheckPatientByName, CheckPatientById, EditPatientProfile, DeletePatientById, AddPatientInQueue, GetPatientsInQueue, GetPatientsInQueueByDoctor, GetPatientsInQueueBYDepartment, RemovePatientFromQueue, PayBill, GetBillTotal, GetServiceDepartment, GetBillReport } = require('../controllers/patientcontroller');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false });

//Register Patient
router.post('/register', urlencodedParser, RegisterPatient);
router.post('/Profile/EditProfile', urlencodedParser, EditPatientProfile);
router.get('/DeletePatientbyId', DeletePatientById);
//Check Patient
router.get('/CheckPatientbyName', CheckPatientByName);
router.get('/CheckPatientbyId', CheckPatientById);
//viewPatients
router.get('/allpatients', ViewPatients);
//patients queue
router.post('/queue', urlencodedParser, AddPatientInQueue);
router.get('/queue/all', GetPatientsInQueue);
router.get('/queue/:doctor_id/all', GetPatientsInQueueByDoctor);
router.get('/queue/:department_id/all', GetPatientsInQueueBYDepartment);
router.get('/queue/:patient_id/remove', RemovePatientFromQueue);

//Billing
router.post('/billing/pay', urlencodedParser, PayBill);
router.get('/billing/:patient_id/total', GetBillTotal);
router.get('/billing/:service_id/department', GetServiceDepartment);
router.get('/billing/:patient_id/report', GetBillReport);

module.exports = router;
