import express from 'express';

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    req.posts = await req.db.collection('posts');

    next();
  } catch (e) {
    next(e);
  }
});

router.route('/')
  .get(async (req, res, next) => {
    const posts = await req.posts.find()/*.sort({date: 1}).skip(2).limit(2)*/.toArray()
    res.send(posts);
  })
  .post(async (req, res, next) => {
    if(!req.session.userName){
      const error = new Error('Not logged in');
      error.statusCode = 401;
      return next(error);
    }
    try {
      req.body.date = new Date();
      req.body.author = req.session.userName; // get from login
      await req.posts.insertOne(req.body);

      req.io.emit('post', req.body);

      res.status(201)
        //.location(`/posts/${req.body.id})
        .send(req.body);
    } catch (e) {
      next(e);
    }
  });

export default router;
