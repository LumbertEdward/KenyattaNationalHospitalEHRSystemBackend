const { MongoClient } = require("mongodb");

class PatientQueue{
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

    async addPatientInQueue(patient_id, department_id, doctor_id){
        const details = {
            patient_id: patient_id,
            department_id: department_id,
            doctor_id: doctor_id
        }

        let status;

        try {
            await this.connectToDb();
            const result = await this.client.db("KNHDatabase").collection("patientqueue").insertOne(details);
            if (result.insertedId != null) {
                status = true;
            }
            else{
                status = false;
            }
        } catch (error) {
            console.log(error);
        }

        return status;
    }

    async getPatientsInQueue(){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("patientqueue").find().sort({last_review: -1});
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

    async getPatientsInQueueByDoctor(doctor_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("patientqueue").find({doctor_id: doctor_id}).sort({last_review: -1});
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

    async getPatientsInQueueBYDepartment(department_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("patientqueue").find({department_id: department_id}).sort({last_review: -1});
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

    async removePatientFromQueue(patient_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("patientqueue").deleteOne({patient_id: patient_id});
            if (foundList.deletedCount > 0) {
                details = true;
            }
            else{
                details = true;
            }

        } catch (error) {
            console.log(error);
        }
        return details;
        
    }
}

module.exports = PatientQueue;