const express = require("express");
const router = express.Router();
const {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController.js");

const { protect } = require("../middleware/authMiddleware.js");

router.route("/").get(protect, getNotes).post(protect, setNote);
router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;
