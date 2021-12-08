import * as comment from '../app/http/controllers/comment.controller.js';
import * as post from '../app/http/controllers/post.controller.js';

import { Router } from 'express';
import auth from '../app/http/middleware/auth.js';

const router = Router({ mergeParams: true });

/**
 * @api {post} /api/classrooms/:classroomId/posts/:postId/comments Create a new comment in a post
 * @apiGroup Comments
 *
 * @apiHeader {String} authorization Bearer token.
 *
 * @apiParam {String} ownerId id of the User who commented.
 * @apiParam {String} ownerName name of commenter.
 * @apiParam {String} message content of the comment.
 * @apiParam {Boolean} [isCommentCorrect] status of the Comment.
 * @apiParam {String} listReply list id of Reply Comment for the Comment.
 *
 * @apiSampleRequest off
 */

router.post('/', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.create,
]);

/**
 * @api {get} /api/classrooms/:classroomId/posts/:postId/comments Get all comment in the post
 * @apiGroup Comments
 *
 * @apiHeader {String} authorization Bearer token.
 *
 * @apiSuccess {String} id id of the Comment.
 * @apiSuccess {String} ownerId id of the User who commented.
 * @apiSuccess {String} ownerName name of commenter.
 * @apiSuccess {String} message content of the comment.
 * @apiSuccess {Boolean} isCommentCorrect status of the Comment.
 * @apiSuccess {String} listReply list id of Reply Comment for the Comment.
 *
 * @apiSampleRequest off
 */

router.get('/', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.findAll,
]);

/**
 * @api {get} /api/classrooms/:classroomId/posts/:postId/comments/:commentId Get one comment in the post
 * @apiGroup Comments
 *
 * @apiHeader {String} authorization Bearer token.
 *
 * @apiSuccess {String} id id of the Comment.
 * @apiSuccess {String} ownerId id of the User who commented.
 * @apiSuccess {String} ownerName name of commenter.
 * @apiSuccess {String} message content of the comment.
 * @apiSuccess {Boolean} isCommentCorrect status of the Comment.
 * @apiSuccess {String} listReply list id of Reply Comment for the Comment.
 *
 * @apiSampleRequest off
 */

router.get('/:commentId', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  comment.findOne,
]);

/**
 * @api {put} /api/classrooms/:classroomId/posts/:postId/comments/:commentId Update a comment in a post
 * @apiGroup Comments
 *
 * @apiHeader {String} authorization Bearer token.
 *
 * @apiParam {String} [ownerId] id of the User who commented.
 * @apiParam {String} [ownerName] name of commenter.
 * @apiParam {String} [message] content of the comment.
 * @apiParam {Boolean} [isCommentCorrect] status of the Comment.
 * @apiParam {String} [listReply] list id of Reply Comment for the Comment.
 *
 * @apiSampleRequest off
 */

router.put('/:commentId', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  comment.update,
]);

/**
 * @api {delete} /api/classrooms/:classroomId/posts/:postId/comments/:commentId Delete a comment in the post
 * @apiGroup Comments
 *
 * @apiHeader {String} authorization Bearer token.
 *
 * @apiSampleRequest off
 */

router.delete('/:commentId', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  comment.deleteOne,
]);

/**
 * @api {delete} /api/classrooms/:classroomId/posts/:postId/comments/ Delete all comments in the post
 * @apiGroup Comments
 *
 * @apiHeader {String} authorization Bearer token.
 *
 * @apiSampleRequest off
 */

router.delete('/', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.deleteAll,
]);

export default router;
