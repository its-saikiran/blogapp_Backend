const {
    isValidEmail,
    isValidPassword,
} = require('./isValidEmailPass')

const loginChecks = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!(email && password)){
            return res.status(400).send("Insuffcient information.")
        }
        if(!(isValidEmail)){
            return res.status(400).send("Please enter a valid email.")
        }
        if(!(isValidPassword)){
            return res.status(400).send("Password should contain atleast 8 characters.")
        }
    } catch (error) {
        return res.status(400).send("Something failed.")
    }
    next();
};

module.exports = {
    loginChecks
}