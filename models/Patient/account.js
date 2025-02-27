const {MongoClient} = require("mongodb");
var Promise = require('bluebird')

class Patient{
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

    async listAllDatabases(){   
        try {
            await this.connectToDb();
            var databaseList = await this.client.db().admin().listDatabases();
            databaseList.databases.forEach(db => {
                console.log(db.name);
            });
        } catch (error) {
            console.log(error);
        }
    }
    

    async registerPatient(firstname, lastname, age, gender, identityNo, country = "Kenya", county, sub_county, village, telephone, weight, height, temperature, pressure){
        const random = Math.random() * 1000000 + 1000;

        const patientDetails = {
            _id: random.toString(),
            firstname: firstname,
            lastname: lastname,
            age: age,
            gender: gender,
            identity_no: identityNo,
            country: country,
            county: county,
            sub_county: sub_county,
            village: village,
            telephone: telephone,
            weight: weight,
            height: height,
            temperature: temperature,
            pressure: pressure
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("patient").insertOne(patientDetails);
            if (pat) {
                details = true;
            }
            else{
                console.log("no")
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    async CheckPatientDetailsByName(firstName){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("patient").find({firstname: firstName}).sort({last_review: -1});
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

    async CheckPatientDetailsById(id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("patient").find({identity_no: id}).sort({last_review: -1});
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

    async viewAllPatients(){
        let lst;
        try{
            await this.connectToDb();
            const check = await this.client.db("KNHDatabase").collection("patient").find().sort({last_review: -1});
            const outL = await check.toArray();
            if (outL.length > 0) {
                lst = outL;
            }
            else{
                lst = [];
            }
        }
        catch(error){
            console.log(error);
        }

        return lst;
    }

    async editPatientProfile(patient_id, firstname, lastname, age, county, sub_county, village, telephone, weight, height, temperature, pressure){
        const patientDetails = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            county: county,
            sub_county: sub_county,
            village: village,
            telephone: telephone,
            weight: weight,
            height: height,
            temperature: temperature,
            pressure: pressure
        }
        console.log(patientDetails)
        let result;
        try {
            await this.connectToDb();
            const check = await this.client.db("KNHDatabase").collection("patient").updateOne({identity_no: patient_id}, {$set: patientDetails});
            if (check.modifiedCount > 0) {
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

    async DeletePatientDetailsById(id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("patient").deleteOne({identity_no: id});
            if (foundList.deletedCount > 0) {
                details = true;
            }
            else{
                details = false;
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }

    async AddNextOfKin(patient_id, NOK_firstname, NOK_lastname, NOK_telephone, gender, county, sub_county, village, national_id){
        const NOKDetails = {
            patient_id: patient_id,
            nok_firstname: NOK_firstname,
            nok_lastname: NOK_lastname,
            nok_telephone: NOK_telephone,
            gender: gender,
            county: county,
            sub_county: sub_county,
            village: village,
            national_id: national_id
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("nok").insertOne(NOKDetails);
            if (pat.insertedId != null) {
                details = true;
            }
            else{
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

}

module.exports = Patient;