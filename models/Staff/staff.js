const {MongoClient} = require("mongodb");

class Staff{
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

    async registerStaff(firstname, lastname, username, qualification, department_id, access_level, country, county, residence, joining_date, profile, password){
        const staffDetails = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            qualification: qualification,
            department_id: department_id,
            access_level: access_level,
            country: country,
            county: county,
            residence: residence,
            joining_date: joining_date,
            profile: profile,
            password: password
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").insertOne(staffDetails);
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

    async loginStaff(username, password){
        const staffDetails = {
            username: username,
            password: password
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").findOne(staffDetails);
            if (pat._id != null) {
                details = pat;
            }
            else{
                details = {};
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    async EditStaffProfile(staff_id, firstname, lastname, qualification, department_id, country, county, residence){
        const staffDetails = {
            firstname: firstname,
            lastname: lastname,
            qualification: qualification,
            department_id: department_id,
            country: country,
            county: county,
            residence: residence,
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").updateOne({_id: staff_id}, {$set: staffDetails});
            if (pat.modifiedCount > 0) {
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

    async DeleteStaffById(id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("staff").deleteOne({_id: id});
            if (foundList.deletedCount > 0) {
                details = true;
            }
            else{
                details = true;
            }

        } catch (error) {
            console.log(error);
        }
        return details;
    }
}

module.exports = Staff;