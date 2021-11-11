const { MongoClient } = require("mongodb");

class MedicationHistory{
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

    async getTreatmentSummary(patient_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("treatment").find({patient_id: patient_id}).sort({last_review: -1});
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

    async visitSummary(patient_id){
        let result;
        try {
            await this.connectToDb();
            const data = await this.client.db("KNHDatabase").collection("treatment").find({patient_id: patient_id}).sort({last_review: -1});
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

    async getAllTreatmentsSummaryReport(){
        let allIds;
        let foundIds = [];
        let details;
        let finalData = [];
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({status: "approved"}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                allIds = result;
                console.log(allIds);

                for (let i = 0; i < allIds.length; i++) {
                    foundIds[i] = allIds[i].treatment_id;
                }

                if (foundIds.length > 0) {
                    for (let j = 0; j < foundIds.length; j++) {
                        const labData = await this.client.db("KNHDatabase").collection("lab").findOne({test_status: "true", treatment_id: foundIds[i].treatment_id, status: "complete"});
                        const prescriptionData = await this.client.db("KNHDatabase").collection("prescription").findOne({treatment_id: foundIds[i].treatment_id, issue_status: "true"});
                        const billingData = await this.client.db("KNHDatabase").collection("billing").findOne({treatment_id: foundIds[i].treatment_id, status: "true"});
                        const caseData = await this.client.db("KNHDatabase").collection("treatment").findOne({treatment_id: foundIds[i].treatment_id});

                        finalData[j] = {"lab": labData, "prescription": prescriptionData, "billing": billingData, "case": caseData};
                    }

                    console.log(finalData);
                }
                
                console.log(foundIds);
                details = foundIds;
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

module.exports = MedicationHistory;