const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");

const addFile = async (file) => {
  const fileName = (await uuid.v4()) + ".jpg";
  file.mv(path.resolve(__dirname, "..", "static", fileName));
  return fileName;
};

const removeFile = async (file) => {
  fs.unlink(path.resolve(__dirname, "..", "static", file), function (err) {
    if (err) throw ApiError.BadRequest();
    console.log("File deleted!");
  });
};

const getValidValues = (values) => {
  const validValues = {};
  for (let [key, value] of Object.entries(values)) {
    if (value && value !== "null") {
      if (Array.isArray(value)) {
        value.length > 0 ? (validValues[key] = value) : null;
      } else {
        validValues[key] = value;
      }
    }
  }
  return validValues;
};

module.exports = { addFile, removeFile, getValidValues };
