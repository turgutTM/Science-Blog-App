import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/customErrors.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateScienceInput = withValidationErrors([
  body("name")
    .notEmpty()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters"),
  body("biography").notEmpty().withMessage("Biography is required"),
  body("imageURL").notEmpty().withMessage("Image URL is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid MongoDB ID"),
]);
