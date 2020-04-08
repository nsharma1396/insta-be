const commentsRouter = require("express").Router();
const comments = require("../_data/comments.json");
const posts = require("../_data/posts.json");
const users = require("../_data/users.json");

commentsRouter.get("/:userId/:postId", (req, res) => {
  const userPosts = posts[req.params.userId];
  const currentPostIndex = userPosts.findIndex(
    (post) => post.id === req.params.postId
  );

  if (currentPostIndex !== -1) {
    const currentPost = userPosts[currentPostIndex];
    res.status(200).json({
      success: true,
      data: {
        postData: currentPost,
        commentData: comments,
      },
    });
  } else {
    res.status(400).json({
      success: false,
      data: undefined,
    });
  }
});

commentsRouter.post("/addcomment", (req, res) => {
  let { userId, postId, commentObj } = req.body;
  commentObj = {
    ...commentObj,
    _id: `${new Date().getTime()}`,
    profilePicture: users[userId].profilePicture,
    username: users[userId].username,
    likesCount: 0,
  };
  comments.push(commentObj);
  res.status(200).json({
    success: true,
    data: commentObj,
  });
});

commentsRouter.post("/like/:commentId", (req, res) => {
  const index = comments.findIndex(
    (comment) => comment._id === req.params.commentId
  );
  if (index !== -1) {
    let comment = comments[index];
    if (!req.body.hasLiked) {
      comment.hasLiked = true;
      comment.likesCount = (comment.likesCount || 0) + 1;
    } else {
      comment.hasLiked = false;
      comment.likesCount--;
    }
    res.status(200).json({
      success: true,
      data: comment,
    });
  } else {
    res.status(400).json({
      success: false,
      data: undefined,
    });
  }
});

// commentsRouter.get("/:commentId", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: comments[req.params.commentId],
//   });
// });

module.exports = commentsRouter;
