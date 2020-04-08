const usersRouter = require("express").Router();
const users = require("../_data/users.json");

usersRouter.get("/:userId", (req, res) => {
  res.status(200).json({
    success: true,
    data: users[req.params.userId],
  });
});

module.exports = usersRouter;
