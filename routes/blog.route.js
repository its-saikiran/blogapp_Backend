const router = require('express').Router();


const { 
    getBlogs,
    getBlogById,
    getBlogsByBloggerId,
  } = require('../controllers/blog.controller');
  
  
  router.get('/blogs', getBlogs)
  router.get('/blog/:id', getBlogById)
  router.get('/blogs/blogger/:id', getBlogsByBloggerId)
  module.exports = router;