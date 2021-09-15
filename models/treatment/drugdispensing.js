const { MongoClient } = require("mongodb");

class DrugDispensing{
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

    async prescribeDrugs(treatment_id, patient_id, drug_prescription, issue_status = "false"){
        const details = {
            treatment_id: treatment_id,
            patient_id: patient_id,
            drug_prescription: drug_prescription,
            issue_status: issue_status
        }

        let result;

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").insertOne(details);
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

    async issueDrugs(drug_id){
        let result;

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").updateOne({_id: drug_id}, {$set: {issue_status: "true"}});
            if (data.modifiedCount > 0) {
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

    async getPrescribedDrugs(){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").find().sort({last_review: -1});
            const outPut = await data.toArray();
            if (outPut.length > 0) {
                result = outPut;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async getPrescribedDrugsByPatient(patient_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").find({patient_id: patient_id}).sort({last_review: -1});
            const outPut = await data.toArray();
            if (outPut.length > 0) {
                result = outPut;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async getDrugDispensingReport(){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").find().sort({last_review: -1});
            const outPut = await data.toArray();
            if (outPut.length > 0) {
                result = outPut;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async getDrugDispensingReportByPatient(patient_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").find({patient_id: patient_id}).sort({last_review: -1});
            const outPut = await data.toArray();
            if (outPut.length > 0) {
                result = outPut;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    }
}

module.exports = DrugDispensing;