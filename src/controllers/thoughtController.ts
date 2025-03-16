// src/controllers/thoughtController.ts
import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    // Create a new thought
    const thought = await Thought.create(req.body);
    // Push the created thought's _id to the associated user's thoughts array field
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    // Remove the thought reference from the associated user
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getReactions = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).select('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought.reactions);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
