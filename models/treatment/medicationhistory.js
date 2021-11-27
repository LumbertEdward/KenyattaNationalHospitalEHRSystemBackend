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

                for (let i = 0; i < allIds.length; i++) {
                    foundIds[i] = allIds[i].treatment_id;
                }

                if (foundIds.length > 0) {
                    for (let j = 0; j < foundIds.length; j++) {
                        await this.connectToDb();
                        const labData = await this.client.db("KNHDatabase").collection("lab").findOne({test_status: "true", treatment_id: foundIds[j], status: "complete"});
                        const prescriptionData = await this.client.db("KNHDatabase").collection("prescription").findOne({treatment_id: foundIds[j], issue_status: "true"});
                        const billingData = await this.client.db("KNHDatabase").collection("billing").findOne({treatment_id: foundIds[j], status: "true"});
                        const caseData = await this.client.db("KNHDatabase").collection("treatment").findOne({treatment_id: foundIds[j]});

                        //get drug
                        const data = await this.client.db("KNHDatabase").collection("drugs").find().sort({last_review: -1});
                        const drugList = await data.toArray();
                        let drugDet;

                        for (let d = 0; d < drugList.length; d++) {
                            if (prescriptionData.drug == drugList[d]._id) {
                                drugDet = drugList[d];
                            } 
                            else{
                                drugDet = {};
                            }
                        }

                        //getpatient
                        const patList = await this.client.db("KNHDatabase").collection("patient").find().sort({last_review: -1});
                        const  pat = await patList.toArray();
                        let patDetails;

                        for (let p = 0; p < pat.length; p++) {
                            if (labData.patient_id == pat[p].identity_no) {
                                patDetails = pat[p];
                            }
                            else {
                                patDetails = {};
                            }
                            
                        }
                        //print
                        finalData[j] = {"patientdetails": patDetails, "lab": labData, "prescription": prescriptionData, "drugdetails": drugDet, "billing": billingData, "case": caseData};
                    }

                    details = finalData;
                }
                
                details = [];
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }

        return finalData;
    }

    //report by date

    async getAllTreatmentsSummaryReportByDates(startdate, enddate){
        let allIds;
        let foundIds = [];
        let details;
        let finalData = [];
        let appDate = [];
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("appointment").find({status: "approved"}).sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0) {
                allIds = result;

                for (let i = 0; i < allIds.length; i++) {
                    foundIds[i] = allIds[i].treatment_id;
                    if(new Date(allIds[i].appointment_due_date) < enddate && new Date(allIds[i].appointment_due_date) > startdate){
                        appDate[i] = allIds[i].appointment_due_date;
                    }
                }

                if (foundIds.length > 0) {
                    for (let j = 0; j < foundIds.length; j++) {
                        await this.connectToDb();
                        const labData = await this.client.db("KNHDatabase").collection("lab").findOne({test_status: "true", treatment_id: foundIds[j], status: "complete"});
                        const prescriptionData = await this.client.db("KNHDatabase").collection("prescription").findOne({treatment_id: foundIds[j], issue_status: "true"});
                        const billingData = await this.client.db("KNHDatabase").collection("billing").findOne({treatment_id: foundIds[j], status: "true"});
                        const caseData = await this.client.db("KNHDatabase").collection("treatment").findOne({treatment_id: foundIds[j]});

                        //get drug
                        const data = await this.client.db("KNHDatabase").collection("drugs").find().sort({last_review: -1});
                        const drugList = await data.toArray();
                        let drugDet;

                        for (let d = 0; d < drugList.length; d++) {
                            if (prescriptionData.drug == drugList[d]._id) {
                                drugDet = drugList[d];
                            } 
                            else{
                                drugDet = {};
                            }
                        }

                        //getpatient
                        const patList = await this.client.db("KNHDatabase").collection("patient").find().sort({last_review: -1});
                        const  pat = await patList.toArray();
                        let patDetails;

                        for (let p = 0; p < pat.length; p++) {
                            if (labData.patient_id == pat[p].identity_no) {
                                patDetails = pat[p];
                            }
                            else {
                                patDetails = {};
                            }
                            
                        }
                        //print
                        finalData[j] = {"patientdetails": patDetails, "lab": labData, "prescription": prescriptionData, "drugdetails": drugDet, "billing": billingData, "case": caseData};
                    }

                    details = finalData;
                }
                
                details = [];
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }

        
        console.log(appDate);

        return finalData;
    }

    async getAllTreatmentsSummaryReportByPatient(patient_id){
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

                for (let i = 0; i < allIds.length; i++) {
                    foundIds[i] = allIds[i].treatment_id;
                }

                if (foundIds.length > 0) {
                    for (let j = 0; j < foundIds.length; j++) {
                        await this.connectToDb();
                        const labData = await this.client.db("KNHDatabase").collection("lab").findOne({test_status: "true", treatment_id: foundIds[j], status: "complete", patient_id: patient_id});
                        const prescriptionData = await this.client.db("KNHDatabase").collection("prescription").findOne({treatment_id: foundIds[j], issue_status: "true", patient_id: patient_id});
                        const billingData = await this.client.db("KNHDatabase").collection("billing").findOne({treatment_id: foundIds[j], status: "true", patient_id: patient_id});
                        const caseData = await this.client.db("KNHDatabase").collection("treatment").findOne({treatment_id: foundIds[j], patient_id: patient_id});

                        //get drug
                        const data = await this.client.db("KNHDatabase").collection("drugs").find().sort({last_review: -1});
                        const drugList = await data.toArray();
                        let drugDet;

                        for (let d = 0; d < drugList.length; d++) {
                            if (prescriptionData.drug == drugList[d]._id) {
                                drugDet = drugList[d];
                            } 
                            else{
                                drugDet = {};
                            }
                        }

                        //print
                        finalData[j] = {"lab": labData, "prescription": prescriptionData, "drugdetails": drugDet, "billing": billingData, "case": caseData};
                    }

                    details = finalData;
                }
                
                details = [];
            }
            else{
                details = [];
            }

        } catch (error) {
            console.log(error);
        }
        return finalData;
    }
}

module.exports = MedicationHistory;