const fs = require("fs")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const UserModel = require("../Model/user-model")

/*
module.exports.login(req, res) {
    res.write("Login")
    res.end()
}
module.exports.signup(req, res) {
    let signupHtml = fs.readFileSync("./views/Signup.html")
    res.write(signupHtml)
    res.end()
}
module.exports.saveuser(req, res) {
    console.log(req.body)
    res.json({ msg: "Data Done...", status: 200, data: res.body })
}*/
function sendOTP(req, res) {
    let emailParam = req.body.email
   // console.log(emailParam);
    UserModel.find({ email: emailParam }, function (err, data) {
        if (err) {
            res.json({ status: -1, msg: "Something Wrong!", data: err })
        } else {
            if (data.length != 0) {
                let myOTP = parseInt(Math.random() * 1000000)
                UserModel.updateOne({ email: emailParam }, { OTP: myOTP }, function (err, success) {
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: "bugtracking.helpdesk@gmail.com",
                            pass: "BugTrackingSystem#123"
                        }
                    });

                    let info = {
                        from: "bugtracking.helpdesk@gmail.com",
                        to: emailParam,
                        subject: "Forgot Password",
                        text: "Hey, Your Forgot Password OTP is : " + myOTP,
                        //html: "<b>Hello world?</b>",
                    };

                    transporter.sendMail(info, function (err, data) {
                        if (err) {
                            console.log(err)
                            res.json({ status: -1, msg: "Something Wrong!", data: err })
                        } else {
                            res.json({ status: 200, msg: "OTP sent to Your Email!", data: data })
                        }
                    });
                })

            } else {
                res.json({ status: -1, msg: "Invalid Email", data: err })
            }
        }
    })
}

function otpVerification(req, res) {
    let emailParam = req.body.email
    let optParam = req.body.otp
    let passParam = req.body.pass
    let cpassParam = req.body.cpass
    UserModel.findOne({ email: emailParam }, function (err, data) {
        // console.log(optParam)
        if (err) {
            res.json({ status: -1, msg: "Something Wrong!", data: err })
        }
        else {
            //console.log(data)
            //console.log(data.OTP)
            //console.log(optParam)
            if (data.OTP == optParam) {

                if (passParam == cpassParam) {
                    let encPassword = bcrypt.hashSync(passParam, 10)
                    UserModel.updateOne({ email: emailParam }, { OTP: "", password: encPassword }, function (err, success) {
                        res.json({ status: 200, msg: "Password Changed!", data: "" })
                    })
                }
                else {
                    res.json({ status: -1, msg: "Password and Confirm Password Not Matched!", data: err })
                }
            }
            else {
                res.json({ status: -1, msg: "Invalid OTP", data: err })
            }
        }
    })
}

module.exports.sendOTP = sendOTP
module.exports.otpVerification = otpVerification