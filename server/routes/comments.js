import express from "express";
import { addComment, deleteComment, getComments,
  updateComment,
} from "../controllers/crud.js";
import { authorizeToken } from "../middleware/authorizeToken.js";

const router = express.Router();
router.post("/", authorizeToken, addComment);
router.delete("/:id", authorizeToken, deleteComment);
router.put("/:id", authorizeToken, updateComment);
router.get("/:id", getComments);

export default router;