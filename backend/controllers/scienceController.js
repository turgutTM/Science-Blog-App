import Scientist from "../models/Scientist.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import User from "../models/AuthModel.js";

export const getAllScientists = async (req, res) => {
  try {
    const scientists = await Scientist.find();
    res.status(200).json(scientists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScientists = async (req, res) => {
  try {
    const scientist = await Scientist.findById(req.params.id);
    if (!scientist) {
      res.status(404).json({ message: "No scientist" });
      return;
    }
    res.status(200).json(scientist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getRecommendedScientist = async (req, res) => {
  try {
    const recommendedScientist = await Scientist.findOne({
      isRecommended: true,
    });

    if (!recommendedScientist) {
      return res.status(404).json({ error: "Recommended scientist not found" });
    }

    res.json({ recommendedScientist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addFavoriteScientist = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  console.log(req.params.id);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const scientist = await Scientist.findById(req.params.id);
    if (!scientist) {
      return res.status(404).json({ message: "Scientist not found" });
    }

    const isScientistInFavorites = user.favoriteScientists.includes(
      req.params.id
    );

    if (!isScientistInFavorites) {
      user.favoriteScientists.push(req.params.id);
    } else {
      const index = user.favoriteScientists.indexOf(req.params.id);
      user.favoriteScientists.splice(index, 1);
    }

    await user.save();
    res.status(200).json({ message: "Favorite scientist list updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFavoriteScientists = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await User.findById(id).populate("favoriteScientists");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteScientists = user.favoriteScientists;

    res.status(200).json(favoriteScientists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const rateScientist = async (req, res) => {
  const { userId, rating } = req.body;
  const { id } = req.params;

  try {
    const scientist = await Scientist.findById(id);
    if (!scientist) {
      return res.status(404).json({ message: "Scientist not found" });
    }

    const existingRating = scientist.ratings.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      scientist.ratings.push({ userId, rating });
    }

    scientist.calculateAverageRating();

    await scientist.save();
    res.status(200).json({
      message: "Rating submitted",
      averageRating: scientist.averageRating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createScience = async (req, res) => {
  const scientist = new Scientist({
    name: req.body.name,
    field: req.body.field,
    nationality: req.body.nationality,
    biography: req.body.biography,
    imageURL: req.body.imageURL,
  });

  try {
    const newScientist = await scientist.save();
    res.status(201).json(newScientist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateScience = async (req, res) => {
  try {
    const updatedScientist = await Scientist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedScientist) {
      res.status(404).json({ message: "No scientist found" });
      return;
    }
    res.status(200).json(updatedScientist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteScience = async (req, res) => {
  try {
    const deletedScientist = await Scientist.findByIdAndDelete(req.params.id);
    if (!deletedScientist) {
      res.status(404).json({ message: "No scientist found to delete" });
      return;
    }
    res.status(200).json({ message: "Scientist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
