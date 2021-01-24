const express = require('express');
const {
  create,
  login,
  getAll,
  getUser,
  editUser,
  deleteone,
  pushFollow,
  pullFollow
} = require('../controllers/user');
const authMiddleware = require('../midelware/auth');
const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//add new user
router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//edit User
router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const user = await editUser(id, body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
//delete User
router.delete('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const users = await deleteone(id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});


router.post('/login', async (req, res, next) => {
  //debugger
  const { body } = req;
  try {

    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.use(authMiddleware);
router.get('/:id', async (req, res, next) => {
  //debugger;
  const { params: { id } } = req;
  try {
    const user = await getUser(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.post('/follow/:targetid', async (req, res, next) => {
  const { params: { targetid }, user: { id } } = req;
  try {
    const users = await pushFollow(targetid, id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post('/unfollow/:targetid', async (req, res, next) => {
  const { params: { targetid }, user: { id } } = req;
  try {
    const users = await pullFollow(targetid, id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
