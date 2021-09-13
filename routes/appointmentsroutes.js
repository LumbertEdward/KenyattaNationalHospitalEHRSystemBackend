var express = require('express');
const { AddAppointment, GetAppointmentDate, GetAppointmentSummary, GetAppointmentByDoctor, GetAppointmentByDepartment } = require('../controllers/appointmentscontroller');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false });

//appointments
router.post("/add", urlencodedParser, AddAppointment);
router.get("/date", GetAppointmentDate);
router.get("/summary", GetAppointmentSummary);
router.get("/doctor", GetAppointmentByDoctor);
router.get("/department", GetAppointmentByDepartment);