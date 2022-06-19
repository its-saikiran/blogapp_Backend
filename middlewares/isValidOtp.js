const isValidOtp = async(req, res, next) => {
    try {
        const { id, otp } = req.body;
        if(!(id && otp)){
            return res.status(400).send("Insufficient information.")
        }
        if(otp.length !== 6){
            return res.status(400).send("Invalid otp.")
        } 
        req.body.id = parseInt(id);
    } catch (error) {
        res.status(400).send("Something failed.")
    }
    next();
};


module.exports = {
    isValidOtp
}