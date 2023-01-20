const router = require("express").Router();
const Post = require("../models/Post");

// Retrieve all posts
router.get("/", async (req, res) => {
  Post.find((err, foundDoc) => {
    if (!err) {
      res.status(200).json(foundDoc);
    } else {
      res.status(500).json("No post found");
    }
  });
});

// Create new post
router.post("/", async (req, res) => {
  try {
    let newPost = new Post(req.body);
    const newlySavedPost = await newPost.save();
    res.status(200).json(newlySavedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieve single post 
router.get("/:id", async (req, res) => {
  Post.findById(req.params.id, (err, foundDoc) => {
    if (!err) {
      res.status(200).json(foundDoc);
    } else {
      res.status(500).json("No post found");
    }
  });
});

// delete a post 
router.delete("/", async (req, res) => {
  const {id} = req.body
  console.log(req.body); 
  Post.findById(id, (err, foundDoc) => {
    if (!err) {
      Post.findByIdAndDelete(id, (err) => {
        if (err) {
          res.status(500).json(err);
        }
      });
      res.status(200).json("Post Deleted successfully!!!");
    } else {
      res.status(400).json(err);
    }
  });
});

module.exports = router;
