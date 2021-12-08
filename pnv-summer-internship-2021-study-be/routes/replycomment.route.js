import * as replyComment from '../app/http/controllers/replycomment.controller.js';
import * as comment from '../app/http/controllers/comment.controller.js';
import * as post from '../app/http/controllers/post.controller.js';
import auth from '../app/http/middleware/auth.js';
import { Router } from 'express';
const router = Router({ mergeParams: true });

/**
 * @api {post} /api/classrooms/:classroomId/posts/:postId/comments/:commentId/replycomments Create a new Reply comment for posts
 * @apiGroup Reply Comment Posts
 * @apiHeader {String} authorization Bearer token.
 * @apiParam {String} ownerId user id of Replier
 * @apiParam {String} ownerName name of Replier
 * @apiParam {String} message content of the Reply Comment
 * @apiSampleRequest off
 */
router.post('/', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  replyComment.checkCommentExist,
  replyComment.create,
]);

/**
 * @api {get} /api/classrooms/:classroomId/posts/:postId/comments/:commentId/replycomments Get all Reply comment of the Post
 * @apiGroup Reply Comment Posts
 * @apiHeader {String} authorization Bearer token.
 * @apiSuccess {String} ownerId user id of Replier
 * @apiSuccess {String} ownerName name of Replier
 * @apiSuccess {String} message content of the Reply Comment
 * @apiSampleRequest off
 */
router.get('/', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  replyComment.checkCommentExist,
  replyComment.findAll,
]);

/**
 * @api {get} /api/classrooms/:classroomId/posts/:postId/comments/:commentId/replycomments/:replyCommentId Get one Reply comment of the Post
 * @apiGroup Reply Comment Posts
 * @apiHeader {String} authorization Bearer token.
 * @apiSuccess {String} ownerId user id of Replier
 * @apiSuccess {String} ownerName name of Replier
 * @apiSuccess {String} message content of the Reply Comment
 * @apiSampleRequest off
 */
router.get('/:replyCommentId', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  replyComment.checkCommentExist,
  replyComment.checkRelyCommentInclude,
  replyComment.findOne,
]);

/**
 * @api {put} /api/classrooms/:classroomId/posts/:postId/comments/:commentId/replycomments/:replyCommentId Update a Reply comment of the Post
 * @apiGroup Reply Comment Posts
 * @apiHeader {String} authorization Bearer token.
 * @apiParam {String} [ownerId] user id of Replier
 * @apiParam {String} [ownerName] name of Replier
 * @apiParam {String} [message] content of the Reply Comment
 * @apiSampleRequest off
 */
router.put('/:replyCommentId', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  replyComment.checkCommentExist,
  replyComment.checkRelyCommentInclude,
  replyComment.update,
]);
/**
 * @api {delete} /api/classrooms/:classroomId/posts/:postId/comments/:commentId/replycomments/:replyCommentId Delete one Reply comment of the Post
 * @apiGroup Reply Comment Posts
 * @apiHeader {String} authorization Bearer token.
 * @apiSampleRequest off
 */
router.delete('/:replyCommentId', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  replyComment.checkCommentExist,
  replyComment.checkRelyCommentInclude,
  replyComment.deleteOne,
]);
/**
 * @api {delete} /api/classrooms/:classroomId/posts/:postId/comments/:commentId/replycomments Delete all Reply comment of the Post
 * @apiGroup Reply Comment Posts
 * @apiHeader {String} authorization Bearer token.
 * @apiSampleRequest off
 */
router.delete('/', [
  auth,
  post.checkClassExist,
  post.checkPostInclude,
  comment.checkPostExist,
  comment.checkCommentInclude,
  replyComment.checkCommentExist,
  replyComment.deleteAll,
]);
export default router;
