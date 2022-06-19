const {
    isValidEmail,
    isValidPassword,
} = require('./isValidEmailPass')

const signUpChecks = async(req, res, next) => {
    try {
        const { name, email, password, confirmPassword, phoneNumber } = req.body;
        if(!(name && email && password && confirmPassword && phoneNumber)){
            return res.status(400).send("Insuffcient information.")
        }
        if(!isValidEmail(email)){
            return res.status(400).send("Please enter a valid email address.")
        }
        if(!isValidPassword(password)){
            return res.status(400).send("Password should contain atleast 8 characters.")
        }
        if(password !== confirmPassword){
            return res.status(400).send("Password does not match.")
        }
        delete req.body.confirmPassword;
    } catch (error) {
        return res.status(404).send({Error: 'Something failed.'})
    }
    next();
};


module.exports = {
    signUpChecks,
}