const postsRouter = require("express").Router();
const posts = require("../_data/posts.json");

postsRouter.get("/:userId/:postId", (req, res) => {
  const userPosts = posts[req.params.userId];
  const currentPostIndex = userPosts.findIndex(
    (post) => post.id === req.params.postId
  );
  if (currentPostIndex !== -1) {
    const currentPost = userPosts[currentPostIndex];
    res.status(200).json({
      success: true,
      data: currentPost,
    });
  } else {
    res.status(400).json({
      success: false,
      data: undefined,
    });
  }
});

postsRouter.post("/like/:userId/:postId", (req, res) => {
  const userPosts = posts[req.params.userId];
  const currentPostIndex = userPosts.findIndex(
    (post) => post.id === req.params.postId
  );
  if (currentPostIndex !== -1) {
    const currentPost = userPosts[currentPostIndex];
    if (!req.body.hasLiked) {
      currentPost.hasLiked = true;
      currentPost.likesCount = (currentPost.likesCount || 0) + 1;
    } else {
      currentPost.hasLiked = false;
      currentPost.likesCount--;
    }
    res.status(200).json({
      success: true,
      data: currentPost,
    });
  } else {
    res.status(400).json({
      success: false,
      data: undefined,
    });
  }
});

module.exports = postsRouter;
