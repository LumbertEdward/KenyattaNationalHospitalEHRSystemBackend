const { MongoClient } = require("mongodb");

class Lab{
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

    async getTestCost(test_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").findOne({_id: test_id});
            if (data.test_cost != null) {
                result = result;
            }
            else{
                result = {};
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    async recordTestResults(test_name, test_cost, test_results, lab_test_date, test_status){
        const details = {
            test_name: test_name,
            test_cost: test_cost,
            test_results: test_results,
            lab_test_date: lab_test_date,
            test_status: test_status
        }

        let result;

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").updateOne({_id: test_id}, {$set: details});
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

    async getLabTestReport(patient_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").find({patient_id: patient_id}).sort({last_review: -1});
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

    async getRequestedLabTests(){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").find({test_status: "false"}).sort({last_review: -1});
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

module.exports = Lab;