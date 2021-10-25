var express = require('express');
const { AddAppointment, GetAppointmentDate, GetAppointmentSummary, GetAppointmentByDoctor, GetAppointmentByDepartment, ApproveAppointmentByDoctor, GetAllAppointments, GetPendingAppointments, GetApprovedAppointments, AddDoctorAppointmentAvailability, GetAvailableSlots, GetAvailableSlotsByDate, GetPendingAppointmentByDoctor, GetApprovedAppointmentByDoctor, CancellAppointmentByDoctor, GetCancelledAppointmentByDoctor } = require('../controllers/appointmentscontroller');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false });

//appointments
router.post("/add", urlencodedParser, AddAppointment);
router.get("/date", GetAppointmentDate);
router.get("/summary", GetAppointmentSummary);
router.get("/doctor/pending", GetPendingAppointmentByDoctor);
router.get("/doctor/approved", GetApprovedAppointmentByDoctor);
router.get("/doctor/cancelled", GetCancelledAppointmentByDoctor);
router.get("/department", GetAppointmentByDepartment);
router.get("/approve", ApproveAppointmentByDoctor);
router.get("/cancel", CancellAppointmentByDoctor);
router.get("/all", GetAllAppointments);
router.get("/all/pending", GetPendingAppointments);
router.get("/all/activated", GetApprovedAppointments);

//availability
router.post("/doctor/availability", urlencodedParser, AddDoctorAppointmentAvailability);
router.get("/slots/available", GetAvailableSlots);
router.get("/slots/available/date", GetAvailableSlotsByDate);


module.exports = router;