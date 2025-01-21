import express from 'express';
import {
  commentListGet,
  commentListByMediaIdGet,
  commentListByUserGet,
  commentCountByMediaIdGet,
  commentGet,
  commentPost,
  commentPut,
  commentDelete,
} from '../controllers/commentController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const commentRouter = express.Router();

commentRouter
  .route('/')
  .get(commentListGet)
  .post(
    authenticate,
    body('comment_text')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 1})
      .escape(),
    body('media_id').notEmpty().isInt({min: 1}).toInt(),
    validationErrors,
    commentPost,
  );

commentRouter
  .route('/bymedia/:id')
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    commentListByMediaIdGet,
  );

commentRouter.route('/byuser').get(authenticate, commentListByUserGet);

commentRouter
  .route('/count/:id')
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    commentCountByMediaIdGet,
  );

commentRouter
  .route('/:id')
  .get(param('id').isInt({min: 1}).toInt(), validationErrors, commentGet)
  .put(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    body('comment_text')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 1})
      .escape(),
    validationErrors,
    commentPut,
  )
  .delete(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    commentDelete,
  );

export default commentRouter;
