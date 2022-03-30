const asyncHandler = require("express-async-handler")

const Note = require("../models/noteModel.js")
const User = require("../models/userModel.js")

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
  res.status(200).json(notes)
})

const setNote = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Not boş olamaz!")
  }
  const note = await Note.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(note)
})

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(400)
    throw new Error("Not bulunamadı!")
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("Kullanıcı bulunamadı!")
  }

  // Check note owner user
  if (note.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Geçersiz işlem!")
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedNote)
})

// @desc Delete note
// @route DELETE  /api/notes/id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(400)
    throw new Error("Not bulunamadı!")
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("Kullanıcı bulunamadı!")
  }

  // Check note owner user
  if (note.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Geçersiz işlem!")
  }

  await note.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
}
