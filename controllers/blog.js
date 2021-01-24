const Blog = require('../models/Blog');
const multer=require('multer');
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){
    cb(null,file.filename+'-'+Date.now())
  }
});
const upload=multer({storage:storage}).single('blogimage');

const create = (blog) => Blog.create(blog);

const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();

const getAll = () => Blog.find({}).exec();

const getuserBlogs = (query) => Blog.find(query).exec();

const getById = (id) => Blog.findById(id).exec();

const deleteone=(id) => Blog.findOneAndDelete({'_id':id}); 

const getblogtags=(_tag) =>Blog.find({tags:{$elemMatch:{tag:_tag}}}).exec();
const getauther =(_ather)=>Blog.find({auther:_ather}).exec();
const gettitle =(_title)=>Blog.find({title:_title}).exec();

module.exports = {
  create,
  editOne,
   getAll,
   getById,
   getuserBlogs,
  deleteone,
  getblogtags,
  gettitle,
  getauther,
  upload
};
