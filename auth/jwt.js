const jwt = require('jsonwebtoken')
const { secretKey } = require('../auth/config');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// // // AUTHENTICATION 
const authentication = async(token) => {
    try {
        return await jwt.sign({
                data: token
              }, secretKey, { expiresIn: '24h' });
    } catch (error) {
        return error.message
    }
};


// // // AUTHORIZE TOKEN FROM DATABASE
const authorize = async(req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const userData = await prisma.user.findUnique({
            where: { id }
        })
        if(!(userData)){
            return res.status(400).send("Please register first.")
        }
        if(!(userData.token)){
            return res.status(400).send('Please log in first.')
        }
        req.body.id = id;
        req.body.token = userData.token;
    } catch (error) {
        return res.status(400).send('Something failed.')
    }
    next();
};


module.exports = {
    authentication,
    authorize
}