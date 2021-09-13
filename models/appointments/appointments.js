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
            await this.client.close();
        }
    }

    async placeAppointment(appointment_reason, appointment_due_date, appointment_created_date, patient_id, doctor_id, department_id){
        const appointmentDetails = {
            appointment_reason: appointment_reason,
            appointment_due_date: appointment_due_date,
            appointment_created_date: appointment_created_date,
            patient_id: patient_id,
            doctor_id: doctor_id,
            department_id: department_id
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
            if (foundList != null) {
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
            if (foundList != null) {
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

    async getAppointmentByDoctor(doctor_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({doctor_id: doctor_id}).sort({last_review: -1});
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
}

module.exports = Appointments;