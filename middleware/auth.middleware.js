const jwt = require("jsonwebtoken")

const auth = (req,res, next)=> {
    const token = req.headers.authorization?.split(" ")[1];
       if(token){
        const decoded = jwt.verify(token, "masai");
           if(decoded){
            req.body.userID = decoded.userID;
            req.body.createdBy = decoded.username; 
            next();
           } else {
            res.send({msg: "you are not authorizated to this route", "error" :error});
           }
       }
     else {
        res.send({msg: "Please log in to continue"});
       } 
}

module.exports = {
    auth
}