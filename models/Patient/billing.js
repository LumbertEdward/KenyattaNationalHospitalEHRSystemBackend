const { MongoClient } = require("mongodb");

class Billing{
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

    async setBill(treatment_id, patient_id, service_name, service_cost, service_department, added_on, added_by, status = "false"){
        const random = Math.random() * 1000000 + 1000;
        const details = {
            _id: random.toString(),
            treatment_id: treatment_id,
            patient_id: patient_id,
            service_name: service_name,
            service_cost: service_cost,
            service_department: service_department,
            added_on: added_on,
            added_by: added_by,
            status: status
        }

        let result;

        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("billing").insertOne(details);
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

    async payBill(bill_id, status = "true"){
        const details = {
            status: status
        }

        let result;

        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("billing").updateOne({_id: bill_id}, {$set: details});
            if (outPut.modifiedCount > 0) {
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

    async getBillTotal(patient_id){
        let result;
        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("billing").find({patient_id: patient_id, status: "false"}).sort({last_review: -1});
            const data = await outPut.toArray();
            if (data.length > 0) {
                result = data;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }
        return result

    }

    async getServiceDepartment(service_id){
        let department;
        try {
            await this.connectToDb();
            const result = await this.client.db("KNHDatabase").collection("billing").findOne({_id: service_id});
            if (result.service_department != null) {
                department = result.service_department;
            }
            else{
                department = "";
            }
        } catch (error) {
            console.log(error);
        }

        return department;
    }

    async getBillReport(patient_id){
        let report;
        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("billing").find({patient_id: patient_id}).sort({last_review: -1});
            const data = await outPut.toArray();
            if (data.length > 0) {
                result = data;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return report;
    }

    async getCompletedBillReport(){
        let report;
        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("billing").find({status: "true"}).sort({last_review: -1});
            const data = await outPut.toArray();
            if (data.length > 0) {
                result = data;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return report;
    }

    async getPendingBillReport(){
        let report;
        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("billing").find({status: "false"}).sort({last_review: -1});
            const data = await outPut.toArray();
            if (data.length > 0) {
                result = data;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return report;
    }
}

module.exports = Billing;