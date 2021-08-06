import _ from '../utility/_.js';
import comments from './mock/comments.js';
import posts from './mock/posts.js';
import users from './mock/users.js';

const postBy = (attr) => _.where(posts, attr);

const commentsByPost = _.pipe(_.pluck('id'),
  (postIds) => _.filter(comments, (comment) => _.contains(postIds, comment.post_id)));

const commentBy = (attr) => _.where(comments, attr);

// 1. 특정인의 posts의 모든 comments 거르기
const f1 = _.pipe(postBy, commentsByPost);
console.log(f1({ user_id: 101 }));
// 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
const f2 = _.pipe(f1,
  _.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
  _.unique);
console.log(f2({ user_id: 101 }));
// 3.특정인의 post에 comments를 단 친구들 카운트 정보
const f3 = _.pipe(f1, _.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
  _.countBy(_.identity));
console.log(f3({ user_id: 101 }));
// 4. 특정인이 comments를 단 posts 거르기
const f4 = _.pipe(
  commentBy,
  _.pluck('post_id'),
  _.unique,
  (postIds) => _.filter(posts, (post) => _.contains(postIds, post.id)),
);
console.log(f4({ user_id: 105 }));

// 5. users + posts + comments (indexBy와 groupBy로 효율 높히기)

const efficientUsers = _.indexBy(users, 'id');
const findUserById = (userId) => efficientUsers[userId];

const commentsGroupByPostId = _.go(
  comments,
  _.map(
    (comment) => _.extend({ user: findUserById(comment.user_id) }, comment),
  ),
  _.groupBy(_.get('post_id')),
);
const findCommentByPostId = (commentId) => commentsGroupByPostId[commentId];

const efficientPosts = _.go(posts,
  _.map((post) => _.extend({
    comments: findCommentByPostId(post.id),
    user: findUserById(post.user_id),
  }, post)));
const groupedPosts = _.go(
  efficientPosts,
  _.groupBy(_.get('user_id')),
);
const findPostsByUserId = (userId) => groupedPosts[userId];

console.log(groupedPosts);

const nestedUsers = _.go(
  users,
  _.map((user) => _.extend({
    posts: findPostsByUserId(user.id) ?? [],
  }, user)),
  _.groupBy(_.get('id')),
);
const findNestedUserById = (id) => nestedUsers[id];
console.log(nestedUsers);

// 5-1. 특정인의 posts의 모든 comments 거르기
const f1Efficient = _.pipe(
  findPostsByUserId,
  _.pluck('comments'),
  _.flatten,
);
const f1Efficient2 = _.pipe(
  findNestedUserById,
  _.deepPluck('posts.comments'),
);
console.log(f1Efficient(101));
console.log(f1Efficient2(101));

// 5-2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
const f2Efficient = _.pipe(
  findPostsByUserId,
  _.pluck('comments'),
  _.flatten,
  _.pluck('user'),
  _.pluck('name'),
  _.unique,
);
const f2Efficient2 = _.pipe(
  findPostsByUserId,
  _.deepPluck('comments.user.name'),
  _.unique,
);
console.log(f2Efficient(101));
console.log(f2Efficient2(101));
// 5-3.특정인의 post에 comments를 단 친구들 카운트 정보
const f3Efficient = _.pipe(
  findPostsByUserId,
  _.deepPluck('comments.user'),
  _.countBy(({ name }) => name),
);
console.log(f3Efficient(101));
// 5-4. 특정인이 comments를 단 posts 거르기
const f4Efficient = (userId) => _.filter(efficientPosts,
  (post) => _.findIndex(post.comments, (comment) => comment.user.id === userId) !== -1);
console.log(f4Efficient(105));
