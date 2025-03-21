// src/routes/api/thoughtRoutes.ts
import { Router } from 'express';
import {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  getReactions,
  removeReaction,
} from '../../controllers/thoughtController';

const router = Router();

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .get(getReactions)
  .post(addReaction)
  .delete(removeReaction);

export default router;
