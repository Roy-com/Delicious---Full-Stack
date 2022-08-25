const express = require("express");
const mongoose = require("mongoose");

const galleryHeadingSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  headingSpan: {
    type: String,
    required: true,
  },
  headingPara: {
    type: String,
    required: true,
  },
});

const galleryImgUrlSchema = new mongoose.Schema({
  galleryImageurl: {
    type: String,
    required: true,
  },
});
const GalleryHeading = new mongoose.model(
  "galleryHeading",
  galleryHeadingSchema
);
const GalleryImgUrl = new mongoose.model("galleryUrl", galleryImgUrlSchema);
module.exports = {
  GalleryHeading: GalleryHeading,
  GalleryImgUrl: GalleryImgUrl,
};
