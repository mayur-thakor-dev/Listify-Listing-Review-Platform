if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process.env.SECRET);

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing, getCoordinates } = require("../middleware.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");
// const { get } = require("mongoose");

router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index route for listing
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    getCoordinates,
    wrapAsync(listingController.createListing)
  ); // Create listing

router.get("/search", wrapAsync(listingController.index));
router.get("/category/:category", (req, res) => {
  res.redirect(`/listings?category=${encodeURIComponent(req.params.category)}`);
});

// New listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show listing
  .put(
    // Update listing
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    getCoordinates,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Delete listing

// Edit listing form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
