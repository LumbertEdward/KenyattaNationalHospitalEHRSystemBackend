const { MongoClient } = require("mongodb");

class Treatment{
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

    async recordMetrics(patient_id, patient_weight, patient_temperature, patient_height){
        const metrics = {
            patient_id: patient_id,
            patient_height: patient_height,
            patient_temperature: patient_temperature,
            patient_weight: patient_weight
        }

        let result;

        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("metrics").insertOne(metrics);
            if (outPut.insertedId != null) {
                result = true;
            }
            else{
                result = false;
            }
        } catch (error) {
            console.log(error);
        }

        return result;
        
    }

    async getMetrics(patient_id){
        let metric;
        try {
            await this.connectToDb();
            const result = await this.client.db("KNHDatabase").collection("metrics").findOne({patient_id: patient_id});
            if (result.patient_id != null) {
                department = result;
            }
            else{
                department = {};
            }
        } catch (error) {
            console.log(error);
        }

        return metric;

    }

    async writeTreatment(patient_id, treatment_id, treatment_notes, staff_id, treatment_date){
        const random = Math.random() * 1000000 + 1000;
        const treatment = {
            _id: random.toString(),
            patient_id: patient_id,
            treatment_id: treatment_id,
            treatment_notes: treatment_notes,
            staff_id: staff_id,
            treatment_date: treatment_date
        }

        let result;

        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("treatment").insertOne(treatment);
            if (outPut.insertedId != null) {
                result = true;
            }
            else{
                result = false;
            }
        } catch (error) {
            console.log(error);
        }

        return result;
        
    }

    async getTreatmentSummaryByPatient(patient_id){
        let treatment;
        try {
            await this.connectToDb();
            const result = await this.client.db("KNHDatabase").collection("treatment").find({patient_id: patient_id}).sort({last_review: -1});
            const outP = await result.toArray()
            if (outP.length > 0) {
                treatment = outP;
            }
            else{
                treatment = [];
            }
        } catch (error) {
            console.log(error);
        }

        return treatment;

    }

    async getTreatmentSummary(case_id){
        let treatment;
        try {
            await this.connectToDb();
            const result = await this.client.db("KNHDatabase").collection("treatment").findOne({_id: case_id});
            if (result.patient_id != null) {
                treatment = result;
            }
            else{
                treatment = {};
            }
        } catch (error) {
            console.log(error);
        }

        return treatment;

    }

    async makeLabRequests(lab_technician_id, patient_id, treatment_id, staff_id, test_name = "", test_results = "", test_cost = "", lab_test_date = "", test_status = "false"){
        
        const lab_test_id = (Math.random() * 2000) + 200;
        const details = {
            lab_test_id: lab_test_id.toString(),
            treatment_id: treatment_id,
            patient_id: patient_id,
            staff_id: staff_id,
            test_name: test_name,
            test_cost: test_cost,
            test_results: test_results,
            lab_test_date: lab_test_date,
            test_status: test_status,
            lab_technician_id: lab_technician_id,
            status: "incomplete",
            paid: "false"
        }

        let result;

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").insertOne(details);
            if (data.insertedId != null) {
                result = true;
            }
            else{
                result = false;
            }
        } catch (error) {
            console.log(error);
        }

        return result;

    }

    async getTreatmentReport(patient_id){
        let treatment;
        try {
            await this.connectToDb();
            const result = await this.client.db("KNHDatabase").collection("treatment").find({patient_id: patient_id}).sort({last_review: -1});
            const data = await result.toArray();
            if (data.length > 0) {
                department = data;
            }
            else{
                department = [];
            }
        } catch (error) {
            console.log(error);
        }

        return treatment;

    }
}

module.exports = Treatment;