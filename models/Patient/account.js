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
            //this.client.close();
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
    

    async registerPatient(firstname, lastname, age, gender, identityNo, country, county, sub_county, village, telephone){
        const patientDetails = {
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
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("patient").insertOne(patientDetails);
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

    async loginPatient(firstname, lastname){
        try {
            await this.connectToDb();
            const pat = await this.client.db("new").collection("thecustomers").insertOne({name: firstname, age: lastname});
            if (pat.insertedId != null) {
                console.log(pat.name);
            }
            else{
                console.log("not inserted");
            }

        } catch (error) {
            console.log(error);
        }
    }

    async viewAllPatients(){
        let lst;
        try{
            await this.connectToDb();
            const check = await this.client.db("new").collection("thecustomers").find().sort({last_review: -1});
            const outL = await check.toArray();
            if (outL.length > 0) {
                lst = outL;
                //console.log(outL);
            }
            else{
                console.log("None");
            }
        }
        catch(error){
            console.log(error);
        }

        return lst;
    }

}

module.exports = Patient;