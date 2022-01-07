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

    async registerStaff(firstname, lastname, username, qualification, department_id, access_level, country, county, residence, joining_date, password, added_on, added_by, gender, national_id){
        
        const encryptedpassword = await bcrypt.hash(password, 10);
        const random = Math.random() * 1000000 + 1000;
        
        const staffDetails = {
            _id: random.toString(),
            username: username,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            qualification: qualification,
            department_id: department_id,
            access_level: access_level,
            national_id: national_id,
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
        let userPassword;
        let userDetails;
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
                            userPassword = password;
                            details = final;
                        }
                    }
                    else{
                        userPassword = "";
                        details = {};
                    }
                }
                else{
                    userPassword = "";
                    details = {};
                } 
            }
            else{
                userPassword = "";
                details = {};
            }

        } catch (error) {
            console.log(error);
        }

        userDetails = {"details": details, "password": userPassword};

        return userDetails;
    }

    async updatePassword(national_id, password){
        const encryptedpassword = await bcrypt.hash(password, 10);
        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").updateOne({national_id: national_id}, {$set: {password: encryptedpassword}});
            if (pat.modifiedCount > 0) {
                console.log("success");
                details = true;
            }
            else{
                console.log("Not");
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    async getStaffDetails(national_id){
        const staffDetails = {
            national_id: national_id,
        }

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").findOne(staffDetails);
            if (pat != null) {
                details = pat;
            }
            else{
                details = {};
            }

        } catch (error) {
            details = {};
            console.log(error);
        }

        return details;
    }

    async EditStaffProfile(national_id, username, firstname, lastname, residence, country, county, password){
        const encryptedpassword = await bcrypt.hash(password, 10);

        const staffDetails = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            residence: residence,
            country: country,
            county: county,
            password: encryptedpassword
        }

        console.log(staffDetails)

        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").updateOne({national_id: national_id}, {$set: staffDetails});
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
            var foundList = await this.client.db("KNHDatabase").collection("staff").deleteOne({username: id});
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

    async allPendingStaff(){
        let result;
        try {
            await this.connectToDb();
            const status = await this.client.db("KNHDatabase").collection("staff").find({status: "pending"}).sort({last_review: -1});
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

    async allActivatedStaff(){
        let result;
        try {
            await this.connectToDb();
            const status = await this.client.db("KNHDatabase").collection("staff").find({status: "activated"}).sort({last_review: -1});
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

    async allSuspendedStaff(){
        let result;
        try {
            await this.connectToDb();
            const status = await this.client.db("KNHDatabase").collection("staff").find({status: "suspended"}).sort({last_review: -1});
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

    async activateAccount(username){
        const today = new Date();
        const date = today.getDay() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").updateOne({username: username}, {$set: {status: "activated", added_on: date}});
            if (pat.modifiedCount > 0) {
                console.log("success");
                details = true;
            }
            else{
                console.log("Not");
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    async suspendAccount(username){
        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").updateOne({username: username}, {$set: {status: "suspended"}});
            if (pat.modifiedCount > 0) {
                console.log("success");
                details = true;
            }
            else{
                console.log("Not");
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    async deactivateAccount(username){
        let details;
        try {
            await this.connectToDb();
            const pat = await this.client.db("KNHDatabase").collection("staff").updateOne({username: username}, {$set: {status: "pending"}});
            if (pat.modifiedCount > 0) {
                console.log("success");
                details = true;
            }
            else{
                console.log("Not");
                details = false;
            }

        } catch (error) {
            console.log(error);
        }

        return details;
    }

    //notifications

    async addNotification(receiver_id, sender_id, category, message, time, status = "unread"){
        const date = new Date();
        const today = date.getDay() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        const details = {
            receiver_id: receiver_id,
            sender_id: sender_id,
            category: category,
            message: message,
            time: time,
            today: today,
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
            var foundList = await this.client.db("KNHDatabase").collection("notifications").find({receiver_id: id}).sort({last_review: -1});
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

    //department

    async addDepartment(department_name, added_by){
        const department_id = Math.random() * 1000000 + 1000;
        const today = new Date();
        const added_on = today.getDay() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        let result;

        const details = {
            department_id: department_id.toString(),
            department_name: department_name,
            added_by: added_by,
            added_on: added_on
        }

        try {
            await this.connectToDb();
            const outPut = await this.client.db("KNHDatabase").collection("department").insertOne(details);
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

    async getDepartments(){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("department").find().sort({last_review: -1});
            var result = await foundList.toArray();
            if (result.length > 0){
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

    async getDepartmentById(department_id){
        let details;
        try {
            await this.connectToDb();
            var foundList = await this.client.db("KNHDatabase").collection("department").findOne({department_id: department_id});
            if (foundList._id != null){
                details = foundList;
            }
            else{
                details = {};
            }
        } catch (error) {
            console.log(error);
        }

        return details;
    }
}

module.exports = Staff;