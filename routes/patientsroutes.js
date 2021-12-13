var express = require('express');
const { RegisterPatient, ViewPatients, CheckPatientByName, CheckPatientById, EditPatientProfile, DeletePatientById, AddPatientInQueue, GetPatientsInQueue, GetPatientsInQueueByDoctor, GetPatientsInQueueBYDepartment, RemovePatientFromQueue, PayBill, GetBillTotal, GetServiceDepartment, GetBillReport, SetBill, RegisterNextOfKin, GetPendingBillReport, GetCompletedBillReport, MakeStripePayment } = require('../controllers/patientcontroller');
const { SendPayment } = require('../controllers/paymentcontroller');
const { RecordMetrics, GetMetrics, WriteTreatment, GetTreatmentSummary, MakeLabRequests, GetTreatmentReport, GetTestCost, RecordTestResults, GetLabTestReport, GetRequestedLabTests, GetTreatmentHistorySummary, VisitSummary, PrescribeDrugs, IssueDrugs, GetPrescribedDrugs, GetPrescribedDrugsByPatient, GetDrugDispensingReport, GetDrugDispensingReportByPatient, GetRequestedPatientLabResult, ApproveTests, GetApprovedRequestedLabTests, AddDrugs, GetDrugs, SetCancelledPrescription, GetCancelledDispensingReport, GetSearchedLabTestReport, GetLabTestReportByPatient, GetAllTreatmentSummaryReport, GetAllTreatmentSummaryReportByPatient, GetAllTreatmentSummaryReportByDates, SearchDrugs, EditDrugs, DeleteDrugs, GetTreatmentSummaryByPatient } = require('../controllers/treatment');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false });

//Register Patient
router.post('/register', urlencodedParser, RegisterPatient);
router.post('/Profile/EditProfile', urlencodedParser, EditPatientProfile);
router.post('/register/nok', urlencodedParser, RegisterNextOfKin);
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
router.post('/billing/set', urlencodedParser, SetBill);
router.get('/billing/pay', PayBill);
router.get('/billing/:patient_id/total', GetBillTotal);
router.get('/billing/:service_id/department', GetServiceDepartment);
router.get('/billing/:patient_id/report', GetBillReport);
router.get('/billing/pendingbills/report/all', GetPendingBillReport);
router.get('/billing/completedbills/report/all', GetCompletedBillReport);

//stripe
router.post('/create-checkout-session', MakeStripePayment)

//treatment
router.post('/metrics/add', urlencodedParser, RecordMetrics);
router.get('/metrics/:patient_id', GetMetrics);
router.post('/treatment/add', urlencodedParser, WriteTreatment);
router.get('/treatment/summary', GetTreatmentSummary);
router.get('/treatment/summary/patient', GetTreatmentSummaryByPatient);
router.post('/treatment/labrequest', urlencodedParser, MakeLabRequests);
router.get('/treatment/labrequest/approve', ApproveTests);
router.get('/treatment/report', GetTreatmentReport);
router.get('/treatment/report/all', GetAllTreatmentSummaryReport);
router.get('/treatment/report/patient', GetAllTreatmentSummaryReportByPatient);
router.get('/treatment/report/all/dates', GetAllTreatmentSummaryReportByDates);

//lab
router.get('/lab/tests/cost', GetTestCost);
router.get('/lab/tests/results/add', RecordTestResults);
router.get('/lab/tests/report', GetLabTestReport);
router.get('/lab/tests/report/patient', GetLabTestReportByPatient);
router.get('/lab/tests/requests/patient', GetRequestedPatientLabResult);
router.get('/lab/tests/requests', GetRequestedLabTests);
router.get('/lab/tests/requests/approved', GetApprovedRequestedLabTests);
router.get('/lab/tests/requests/patient/report', GetSearchedLabTestReport);

//medicalhistory
router.get('/treatment/:patient_id/history', GetTreatmentHistorySummary);
router.get('/treatment/:patient_id/visit', VisitSummary);

//drugs
router.post('/drugs/add', urlencodedParser, AddDrugs);
router.get('/drugs/all', GetDrugs);
router.get('/drugs/retrieve', SearchDrugs)
router.post('/drugs/edit', urlencodedParser, EditDrugs);
router.get('/drugs/delete', DeleteDrugs)

//prescription
router.post('/drugs/prescribe', urlencodedParser, PrescribeDrugs);
router.get('/drugs/issue', IssueDrugs);
router.get('/drugs/prescribed/all', GetPrescribedDrugs);
router.get('/drugs/prescribed/patient', GetPrescribedDrugsByPatient);
router.get('/drugs/dispensingreport', GetDrugDispensingReport);
router.get('/drugs/dispensingreport/patient', GetDrugDispensingReportByPatient);
router.get('/drugs/cancel', SetCancelledPrescription);
router.get('/drugs/dispensingreport/cancelled', GetCancelledDispensingReport);

module.exports = router;
