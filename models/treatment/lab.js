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

    async approveTest(lab_test_id, test_status){
        const details = {
            test_status: test_status
        }

        let result;

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").updateOne({lab_test_id: lab_test_id}, {$set: details});
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

    async recordTestResults(lab_test_id, test_cost, test_results, lab_test_date){
        const details = {
            test_cost: test_cost,
            test_results: test_results,
            lab_test_date: lab_test_date,
            status: "complete"
        }

        let result;

        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").updateOne({lab_test_id: lab_test_id}, {$set: details});
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

    async getLabTestReport(){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").find({test_status: "true", status: "complete"}).sort({last_review: -1});
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

    async getLabTestReportByPatient(patient_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").find({patient_id: patient_id, status: "complete"}).sort({last_review: -1});
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

    async getRequestedPatientLabResults(patient_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").find({test_status: "true", patient_id: patient_id, status: "complete"}).sort({last_review: -1});
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

    async getApprovedRequestedLabTests(){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").find({test_status: "true", status: "incomplete"}).sort({last_review: -1});
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

    async getSearchedLabTestsReport(startdate, enddate){
        let result;
        const details = {
            lab_test_date: {$lt: (new Date(enddate)), $gte: (new Date(startdate))},
            test_status: "true",
            status: "incomplete"
        }
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("lab").find(details).sort({last_review: -1});
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