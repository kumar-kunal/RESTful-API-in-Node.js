const csvtojson = require("csvtojson");
const bcrypt = require("bcrypt");
const fs = require("fs");

const User = require('../models/user');




exports.upload_post = function (req, res, next) {
     const file = req.files.CSV_FILE;
     var csvUserData = file[0].data.toString('utf8');
     file[0].mv("uploads/"+file[0].name, function(err) {
        if (err)
          console.log(err)
        else{
            console.log("uploaded" + file[0])
        }
      });
     for(var i= 1;i<file.length;i++)
     {
        csvUserData = csvUserData +'\n'+ file[i].data.toString('utf8').split('\n').splice(1).join('\n');
        file[i].mv("uploads/"+file[i].name, function(err) {
            if (err)
              console.log(err)
            else{
                console.log("uploaded")
            }
          });
     }
     
    
    return csvtojson().fromString(csvUserData).then(json => {
        for (i = 0; i < json.length; i++) {
            const jsonConst = json[i];
            bcrypt.hash(jsonConst.password,10, (err, hash)=>{
                const user = new User({
                    username: jsonConst.username,
                    password: hash,
                    place: jsonConst.place,
                    latitude: Number(jsonConst.latitude),
                    longitude: Number(jsonConst.longitude)
                });
    
                const userData = jsonConst;
                User.find({ username: jsonConst.username })
                    .exec()
                    .then(usr => {
                        if (usr.length > 0) {
                            var myquery = { username: userData.username };
                            var newValues = {
                                username: userData.username,
                                password: hash,
                                place: userData.place,
                                latitude: Number(userData.latitude),
                                longitude: Number(userData.longitude)
                            };
    
                            User.updateOne(myquery, newValues, function (err, res) {
                                console.log(newValues);
                                if (err) throw err;
                                //console.log(newValues);
                                console.log("Updated Successfully");
                            });
    
                        }
                        else {
    
                            user.save().then(result => {
                                console.log(result);
                            })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                        }
    
                    });
    
            });
            


        }
        return res.status(201).json({
            jsonUserData: json
        })
    });
}