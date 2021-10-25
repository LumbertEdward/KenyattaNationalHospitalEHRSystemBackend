const { MongoClient } = require("mongodb");

class Appointments{
    constructor(uri){
        this.client = new MongoClient(uri);
    }

    async connectToDb(){
        try {
            await this.client.connect();
        } catch (error) {
            console.log(error);
        } finally{
            //await this.client.close();
        }
    }

    async placeAppointment(appointment_reason, appointment_due_date, appointment_created_date, patient_id, doctor_id, department_id){
        
        const random = (Math.random() * 10000) + 100;

        const appointmentDetails = {
            appointment_id: random.toString(),
            appointment_reason: appointment_reason,
            appointment_due_date: appointment_due_date,
            appointment_created_date: appointment_created_date,
            patient_id: patient_id,
            doctor_id: doctor_id,
            department_id: department_id,
            status: "pending"
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("appointment").insertOne(appointmentDetails);
            if (pat.insertedId != null) {
                details = true;
            }
            else{
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    async getAppointmentDate(appointment_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").findOne({_id: appointment_id});
            if (foundList) {
                details = foundList.appointment_due_date;
            }
            else{
                details = "";
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getAppointmentSummary(appointment_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").findOne({_id: appointment_id});
            if (foundList) {
                details = foundList;
            }
            else{
                details = {};
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getPendingAppointmentsByDoctor(doctor_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({doctor_id: doctor_id, status: "pending"}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getApprovedAppointmentsByDoctor(doctor_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({doctor_id: doctor_id, status: "approved"}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getCancelledAppointmentsByDoctor(doctor_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({doctor_id: doctor_id, status: "cancelled"}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async approveAppointmentByDoctor(appointment_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").updateOne({appointment_id: appointment_id}, {$set: {status: "approved"}});
            if (foundList.modifiedCount > 0) {
                details = true;
            }
            else{
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        console.log(details)
        return details;
    }

    async cancelAppointmentByDoctor(appointment_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").updateOne({appointment_id: appointment_id}, {$set: {status: "cancelled"}});
            if (foundList.modifiedCount > 0) {
                details = true;
            }
            else{
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        console.log(details)
        return details;
    }

    async getAppointmentByDepartment(department_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({department_id: department_id}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getApprovedAppointments(){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({status: "approved"}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getPendingAppointments(){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({status: "pending"}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getAllAppointments(){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find().sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    //doctor Appointment

    async setAvailability(doctor_id, date, slots, fromTime, toTime){
        const random = Math.random() * 1000000 + 1000;

        const availability = {
            _id: random,
            doctor_id: doctor_id,
            date: date,
            slots: slots,
            available: slots,
            from_time: fromTime,
            to_time: toTime,
            status: "available"
        }
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("availability").insertOne(availability);
            if (foundList.insertedId != null) {
                details = true;
            }
            else{
                details = false;
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getAvailableSlots(){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("availability").find().sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async getAvailableSlotsByDate(date){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("availability").find({date: date}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                details = result;
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }
}

module.exports = Appointments;