const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getBlogs = async(req, res) => {
    const { offset=0, limit=5, orderBy='asc' } = req.params;
    let conditions = {
        skip: parseInt(offset),
        take: parseInt(limit)
    };
    try {
        const data = await prisma.blog.findMany(conditions)
        res.status(200).send(data.length === 0? "There are no blogs.": data)
    } catch (error) {
        res.status(500).send(error.message)
    }
};



const getBlogById = async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const data = await prisma.blog.findUnique({
            where: { id }
        })
        res.status(200).send(data? data: "There is no blog with this id")
    } catch (error) {
        res.status(500).send(error.message)
    }
};



const getBlogsByBloggerId = async(req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const data = await prisma.blog.findMany({
            where: { userId }
        })
        res.status(200).send(data.length === 0? "There are no blog with this blogger id." : data)
    } catch (error) {
        res.status(500).send(error.message)
    }
};



module.exports = {
    getBlogs,
    getBlogById,
    getBlogsByBloggerId
}