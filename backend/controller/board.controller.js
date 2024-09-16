// controllers/boardController.js
const Board = require("../model/board.schema");

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Board title is required" });
    }

    const board = new Board({
      title,
      // userId: req.user.id, // Assuming the user is authenticated and `req.user` is populated
    });

    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error creating board", error });
  }
};

// (Optional) Get all boards for a user
exports.getUserBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching boards", error });
  }
};

// (Optional) Delete a board
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findById(id);
    if (!board || board.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Board not found" });
    }

    await board.remove();
    res.status(200).json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting board", error });
  }
};
