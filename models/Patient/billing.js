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
            await this.client.close();
        }
    }

    async payBill(patient_id, service_cost, service_department){
        const details = {
            patient_id: patient_id,
            service_cost: service_cost,
            service_department: service_department
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

    async getBillTotal(patient_id){
        let result;
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
}

module.exports = Billing;