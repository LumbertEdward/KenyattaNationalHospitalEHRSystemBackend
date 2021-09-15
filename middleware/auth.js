const jwt = require("jsonwebtoken");

const verifyToken = function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.json({"message": "Token Needed"});
    }
    else{
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (error) {
            return res.json({"Message": "Invalid Token"});
        }
    }

    return next();
    
};

module.exports = verifyToken;