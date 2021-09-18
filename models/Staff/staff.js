const {MongoClient} = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
            //await this.client.close();
        }
    }

    async registerStaff(firstname, lastname, username, qualification, department_id, access_level, country, county, residence, joining_date, password, added_on, added_by, gender){
        
        const encryptedpassword = await bcrypt.hash(password, 10);
        const random = Math.random() * 1000000 + 1000;
        
        const staffDetails = {
            _id: random,
            username: username,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            qualification: qualification,
            department_id: department_id,
            access_level: access_level,
            country: country,
            county: county,
            residence: residence,
            joining_date: joining_date,
            password: encryptedpassword,
            added_on: added_on,
            added_by: added_by,
            token: "",
            status: "pending"
        }

        
        let details;

        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").insertOne(staffDetails);
            if (pat.insertedId != null) {
                const settoken = jwt.sign({staff_id: pat.insertedId}, "KNH", {expiresIn: "2h"});
                if (settoken != null) {
                    const check = await this.client.db("KNHDatabase").collection("staff").updateOne({_id: pat.insertedId}, {$set: {token: settoken}});
                    if (check.modifiedCount > 0) {
                        details = true;
                    }
                    else{
                        details = false;
                    } 
                }
                else{
                    details = false;
                }
            }
            else{
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    async checkStaffUsername(username){
        let result;
        try {
            await this.connectToDb();
            const status = await this.client.db("KNHDatabase").collection("staff").findOne({username: username});
            if (status == null) {
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

    async loginStaff(username, password){
        const staffDetails = {
            username: username,
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").findOne(staffDetails);
            if (pat && await bcrypt.compare(password, pat.password)) {
                const setToken = jwt.sign({staff_id: pat._id}, "KNH", {expiresIn: "2h"});
                if (setToken != null) {
                    const updateToken = await this.client.db("KNHDatabase").collection("staff").updateOne({_id: pat._id}, {$set: {token: setToken}});
                    if (updateToken) {
                        const final = await this.client.db("KNHDatabase").collection("staff").findOne({_id: pat._id});
                        if (final) {
                            details = final;
                        }
                    }
                    else{
                        details = {};
                    }
                }
                else{
                    details = {};
                } 
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

    async allStaff(){
        let result;
        try {
            await this.connectToDb();
            const status = await this.client.db("KNHDatabase").collection("staff").find().sort({last_review: -1});
            const data = await status.toArray();
            if (data.length > 0) {
                result = data;
            }
            else{
                result = [];
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    //notifications

    async addNotification(receiver_username, sender_username, category, message, time, status = "unread"){
        const details = {
            receiver_username: receiver_username,
            sender_username: sender_username,
            category: category,
            message: message,
            time: time,
            status: status
        }

        let result;

        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("notifications").insertOne(details);
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

    async getNotificationById(id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("notifications").find({receiver_username: id}).sort({last_review: -1});
            var data = await foundList.toArray();
            if (data.length > 0) {
                details = data;
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

module.exports = Staff;