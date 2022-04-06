const fs = require("fs")

function login(req,res){
    res.write("Login")
    res.end()
}

function signup(req,res){
    let signupHtml = fs.readFileSync("./views/Signup.html")
    res.write(signupHtml)
    res.end()
}

function saveUser(req,res){

    console.log(req.body)//

    res.json({
        msg:"done danadone....",
        status:200,
        data:req.body
    })
}

module.exports.login = login
module.exports.signup = signup
module.exports.saveuser = saveUser