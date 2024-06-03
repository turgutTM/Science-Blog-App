import express from "express";
import {
  getAllScientists,
  getScientists,
  createScience,
  updateScience,
  deleteScience,
  addFavoriteScientist,
  getAllFavoriteScientists,
  rateScientist,
} from "../controllers/scienceController.js";
import {
  validateScienceInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import uploadImage from "../controllers/uploadController.js";

const router = express.Router();

router.route("/upload").post(uploadImage);

router.get("/", getAllScientists);
router.get("/:id", validateIdParam, getScientists);
router.post("/", createScience);
router.patch("/:id", validateScienceInput, validateIdParam, updateScience);
router.delete("/:id", validateIdParam, deleteScience);
router.post("/:id/favorite", addFavoriteScientist);
router.get("/getallfavoritescientists/:id", getAllFavoriteScientists);
router.post("/:id/rate", rateScientist);
export default router;
