const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.user_singin = function (req, res, next) {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            username: user[0].username,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.user_nearby = function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token);
    const user_name = payload.username;

    User.find({ username: user_name })
        .exec()
        .then(
            user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "Invalid request"
                    });
                }
                const user_latitude_below = Number(user[0].latitude) - 10;
                const user_latitude_above = Number(user[0].latitude) + 10;
                const user_longitude_below = Number(user[0].longitude) - 10;
                const user_longitude_above = Number(user[0].longitude) + 10;

                User.find({
                    $and: [
                        {
                            $and: [
                                {
                                    $and: [
                                        { latitude: { $lt: user_latitude_above } },
                                        { latitude: { $ne: Number(user[0].latitude) } }
                                    ]
                                },
                                {
                                    latitude: { $gt: user_latitude_below }
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $and: [
                                        { longitude: { $lt: user_longitude_above } },
                                        { longitude: { $ne: Number(user[0].longitude) } }
                                    ]
                                },
                                {
                                    longitude: { $gt: user_longitude_below }
                                }
                            ]
                        }
                    ]
                })
                    .exec()
                    .then(
                        usr => {
                            if (usr.length < 1) {
                                return res.status(401).json({
                                    message: "You are alone, here!"
                                });
                            }
                            else {
                                var nearbyUser = [];

                                for (u in usr) {
                                    var tempObj = (({ username, place, latitude, longitude }) => ({ username, place, latitude, longitude }))(usr[u]);
                                    nearbyUser.push(tempObj);
                                }
                                return res.status(200).json({
                                    Users: nearbyUser
                                });
                            }
                        }
                    );
            }
        );
};

exports.user_finder = function (req, res, next) {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    User.find({
        $and: [
            { latitude: { $eq: latitude } },
            { longitude: { $eq: longitude } }
        ]
    })
        .exec()
        .then(
            user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "No User found"
                    });
                }
                else {
                    var nearbyUser = [];

                    for (u in user) {
                        var tempObj = (({ username, place, latitude, longitude }) => ({ username, place, latitude, longitude }))(user[u]);
                        nearbyUser.push(tempObj);
                    }
                    return res.status(200).json({
                        Users: nearbyUser
                    });
                }
            }
        );

};