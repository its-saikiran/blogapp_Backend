const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generators')

const { 
    nodemailerEmail,
    nodemailerPassword,
    lengthOfOtp
 } = require('../auth/config');

const sendOtp = async (to) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: nodemailerEmail,
            pass: nodemailerPassword
        }
    })

    const otpNumber = otpGenerator.generate(lengthOfOtp, { 
        alphabets: false, 
        upperCase: false, 
        specialChar: false
     });
    
    const mailOption = {
        from: 'E-Commerce app',
        to,
        subject: 'otp verification',
        text: `verify your account ${otpNumber}`
    }


    transporter.sendMail(mailOption, (err, info) => {
        if(err) console.log(err.message);
        console.log(`--->`,info);
    })


    return otpNumber
}


module.exports = {
    sendOtp
}