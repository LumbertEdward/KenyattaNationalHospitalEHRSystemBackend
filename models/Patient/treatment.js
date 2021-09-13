const { MongoClient } = require("mongodb");

class Treatment{
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


    async writeCaseNotes(){

    }

    async writePrescription(){
        
    }

    async makeLabRequests(){
        
    }

    async getTreatmentReport(){
        
    }
}

module.exports = Treatment;