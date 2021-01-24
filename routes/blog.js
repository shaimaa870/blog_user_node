const express = require('express');
const authMiddleware = require('../midelware/auth');
const {
  create,
  getAll,
  getById,
  editOne,
  deleteone,
  getuserBlogs,
  getblogtags,
  gettitle,
  getauther,
  upload
} = require('../controllers/blog');

const router = express.Router();

//get All Blogs
router.get('/', async (req, res, next) => {
  try {
    //debugger;
    const blog = await getAll();
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

router.use(authMiddleware);
//create Blog
router.post('/', async (req, res, next) => {
  
  const { body, user: { id } } = req;
  try {
    
    const blog = await create({ ...body, auther: id });
    blog.photo=upload(req,res,function(err){
      if(err){
        console.log('no image');
      }
      console.log('there is image');
    });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//get All User Blogs
router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
  try {
    const blog = await getuserBlogs({ auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//get Blog By ID
router.get('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const blog = await getById(id);
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//Update Blog
router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const blogs = await editOne(id, body);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//Delete By ID
router.delete('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const blogs = await deleteone(id);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
router.get('/authers/:auther', async (req, res, next) => {
  const { params: { auther } } = req;
  try {
    const blogs = await getauther(auther);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
router.get('/tags/:tag', async (req, res, next) => {
  const { params: { tag } } = req;
  try {
    console.log(tag);
    const blogs = await getblogtags(tag);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

router.get('/title/:title', async (req, res, next) => {
  const { params: { title } } = req;
  try {
    const blogs = await gettitle(title);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
