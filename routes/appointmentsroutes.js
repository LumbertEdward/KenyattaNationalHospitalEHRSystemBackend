var express = require('express');
const { AddAppointment, GetAppointmentDate, GetAppointmentSummary, GetAppointmentByDoctor, GetAppointmentByDepartment, ApproveAppointmentByDoctor, GetAllAppointments, GetPendingAppointments, GetApprovedAppointments } = require('../controllers/appointmentscontroller');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false });

//appointments
router.post("/add", urlencodedParser, AddAppointment);
router.get("/date", GetAppointmentDate);
router.get("/summary", GetAppointmentSummary);
router.get("/doctor", GetAppointmentByDoctor);
router.get("/department", GetAppointmentByDepartment);
router.get("/approve", ApproveAppointmentByDoctor);
router.get("/all", GetAllAppointments);
router.get("/all/pending", GetPendingAppointments);
router.get("/all/activated", GetApprovedAppointments);


module.exports = router;