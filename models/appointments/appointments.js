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

    async placeAppointment(appointment_reason, appointment_due_date, appointment_created_date, patient_id, doctor_id, department_id, appointment_created_by, availability_id){
        
        const random = (Math.random() * 10000) + 100;
        const treatment_id = (Math.random() * 1000) + 100;

        const appointmentDetails = {
            appointment_id: random.toString(),
            appointment_reason: appointment_reason,
            appointment_due_date: appointment_due_date,
            appointment_created_date: appointment_created_date,
            appointment_created_by: appointment_created_by,
            patient_id: patient_id,
            doctor_id: doctor_id,
            department_id: department_id,
            treatment_id: treatment_id.toString(),
            expired: "false",
            status: "pending"
        }

        let details;
        try {
            await this.connectToDb();
            var foundAvailability = await this.client.db("KNHDatabase").collection("availability").findOne({doctor_id: availability_id});
            if (foundAvailability != {}) {
                if (parseInt(foundAvailability.slots) > 0) {
                    const pat = await this.client.db("KNHDatabase").collection("appointment").insertOne(appointmentDetails);
                    if (pat.insertedId != null) {
                        var changedSlots = await this.client.db("KNHDatabase").collection("availability").updateOne({doctor_id: availability_id}, {$set: {slots: (parseInt(foundAvailability.slots) - 1).toString()}});
                        if (changedSlots.modifiedCount > 0) {
                            details = true;
                        }
                        else{
                            details = false;
                        }
                    }
                    else{
                        details = false;
                    }
                }
                else{
                    details = false;
                }
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

    async getCancelledAppointments(){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({status: "cancelled"}).sort({last_review: -1});
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
            _id: random.toString(),
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
                let finls = []
                for (let index = 0; index < result.length; index++) {
                    if (parseInt(result[index].slots) > 0) {
                        finls.push(result[index])
                    }
                }
                details = finls;
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
                let finls = []
                for (let index = 0; index < result.length; index++) {
                    if (parseInt(result[index].slots) > 0) {
                        finls.push(result[index])
                    }
                }
                details = finls;
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