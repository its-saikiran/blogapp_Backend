const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { saltCode } = require('../auth/config');

const bcrypt = require('bcrypt');

const { sendOtp } = require('../services/otp.service')
const { authentication } = require('../auth/jwt');


const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUserExist = await prisma.user.count({
            where: { email }
        })
        if (isUserExist > 0) {
            return res.status(400).send("Email already exists.")
        }
        req.body.password = await bcrypt.hash(password, parseInt(saltCode))
        const otp = await sendOtp(email)
        if (!otp) {
            return res.status(400).send("Something failed.")
        }
        // console.log('>>>>',otp);
        req.body.otp = otp;
        const result = await prisma.user.create({ data: req.body })
        res.status(201).send({
            id: result.id,
            msg: "verify your account with your received otp along with this id."
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
};



const otpEnter = async (req, res) => {
    const { id, otp } = req.body;
    try {
        const isValid = await prisma.user.findUnique({
            where: { id }
        })
        if (otp !== isValid.otp) {
            return res.status(400).send("Invalid otp.")
        }
        await prisma.user.update({
            where: { id },
            data: { verified: true }
        })
        res.status(201).send({
            status: "Account verified.",
            msg: "You can log in now."
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
};



const checkUserExist = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            return res.status(400).send("Please register first.")
        }
        const decrypted = await bcrypt.compare(password, user.password)
        if (!decrypted) {
            return res.status(400).send("Incorrect Password.")
        }
        user.id = parseInt(user.id);
        return user;
    } catch (error) {
        return res.status(400).send('Something failed.')
    }
};



const login = async (req, res) => {
    try {
        const user = await checkUserExist(req, res)
        const { id, email, role } = user;
        if (!user.verified) {
            try {
                const otp = await sendOtp(email)
                const sendUpdate = await prisma.user.update({
                    where: { id },
                    data: { otp }
                })
                if (sendUpdate === true) {
                    return res.status(200).send({
                        id,
                        msg: "Verify your account with this id by sending otp."
                    })
                }
                return res.status(500).send(sendUpdate)
            } catch (error) {
                return res.status(400).send(error.message)
            }
        }
        const token = await authentication({ id, role })
        await prisma.user.update({
            where: { id },
            data: { token }
        })
        res.status(200).cookie("authToken", token).send("Logged in successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
};


const updateProfile = async (req, res) => {
    const { id, email } = req.body;
    if (email) {
        return res.status(400).send("You can't change your Email.")
    }
    try {
        await prisma.user.update({
            where: { id },
            data: req.body
        })
        res.status(200).cookie("authToken", req.body.token).send("Profile updated successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
};



const logOut = async (req, res) => {
    const { id, token } = req.body;
    try {
        const sendUpdate = await prisma.user.update({
            where: { id },
            data: { token }
        })
        res.status(200).clearCookie().send("Signed out successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
};



const signOut = async (req, res) => {
    const { id } = req.body;
    try {
        await prisma.user.delete({
            where: { id }
        })
        res.status(200).send("Account deleted successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
};


module.exports = {
    signUp,
    otpEnter,
    login,
    updateProfile,
    logOut,
    signOut
}




