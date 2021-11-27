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
            //await this.client.close();
        }
    }

    async addDrugs(drug_name, drug_cost, total, buying_price, drug_description, expiry_date, staff_id){
        const random = Math.random() * 1000000 + 1000;
        const date = new Date();
        const today = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();

        const details = {
            _id: random.toString(),
            drug_name: drug_name,
            drug_cost: drug_cost,
            drug_buying_price: buying_price,
            date_added: today,
            total: total,
            drug_description: drug_description,
            expiry_date: expiry_date,
            staff_id: staff_id
        }

        let result;
        console.log(details)

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("drugs").insertOne(details);
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

    async getDrugs(){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("drugs").find().sort({last_review: -1});
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

    async editDrugs(drug_name, drug_cost, total, buying_price, drug_description, expiry_date, drug_id){
        const details = {
            drug_name: drug_name,
            drug_cost: drug_cost,
            drug_buying_price: buying_price,
            total: total,
            drug_description: drug_description,
            expiry_date: expiry_date,
        }

        let result;
        console.log(details)

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("drugs").updateOne({_id: drug_id}, {$set: details});
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

    async getDrug(drug_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("drugs").findOne({_id:drug_id});
            if (data != null) {
                result = data;
            }
            else{
                result = {};
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async deleteDrug(drug_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("drugs").deleteOne({_id:drug_id});
            if (data.deletedCount > 0) {
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

    async prescribeDrugs(treatment_id, patient_id, drug, days, usage, notes, issue_status = "false"){
        const random = Math.random() * 1000000 + 1000;
        const details = {
            _id: random.toString(),
            treatment_id: treatment_id,
            patient_id: patient_id,
            drug: drug,
            days: days,
            usage_per_day: usage,
            notes: notes,
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
            const data = await this.client.db("KNHDatabase").collection("prescription").find({issue_status: "false"}).sort({last_review: -1});
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
            const data = await this.client.db("KNHDatabase").collection("prescription").find({patient_id: patient_id, issue_status: "false"}).sort({last_review: -1});
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
            const data = await this.client.db("KNHDatabase").collection("prescription").find({issue_status: "true"}).sort({last_review: -1});
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
            const data = await this.client.db("KNHDatabase").collection("prescription").find({patient_id: patient_id, issue_status: "true"}).sort({last_review: -1});
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

    async cancelPrescription(prescription_id){
        let result;

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").updateOne({_id: prescription_id}, {$set: {issue_status: "cancelled"}});
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

    async getCancelledDispensedDrugs(){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("prescription").find({issue_status: "cancelled"}).sort({last_review: -1});
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