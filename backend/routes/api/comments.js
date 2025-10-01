/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * @summary Retrieve all comments.
    * @route GET /
    * @returns {Array<Object>} 200 - An array of comment objects.
    * @returns {Object} 500 - Error message if fetching comments fails.
    */

 /**
    * POST /
    * @summary Create a new comment.
    * @route POST /
    * @param {Object} req.body - The comment data to create.
    * @returns {Object} 201 - The created comment object.
    * @returns {Object} 500 - Error message if creating comment fails.
    */

 /**
    * DELETE /:id
    * @summary Delete a comment by its ID.
    * @route DELETE /:id
    * @param {string} req.params.id - The ID of the comment to delete.
    * @returns {Object} 200 - Success message if comment is deleted.
    * @returns {Object} 404 - Error message if comment is not found.
    * @returns {Object} 500 - Error message if deleting comment fails.
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router; 

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }});

  // add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        await comment.remove();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});
