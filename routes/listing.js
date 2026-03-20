const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

const listingController = require("../controllers/listing.js")

      

//index route
router.get("/",wrapAsync(listingController.index));

 
//new route
router.get("/new", isLoggedIn, listingController.new);

 

// create route
router.post("/listings",upload.single('listing[image]'),validateListing,wrapAsync(listingController.create));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));

router.route("/:id")
      .get(wrapAsync(listingController.show))
      .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync( listingController.update))
      .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroy))

module.exports = router;