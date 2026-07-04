const Listing = require("../model/listing");

// index Route

module.exports.index = async (req, res) => {
  const { q, category, minPrice, maxPrice, sort } = req.query;
  const query = {};

  if (q && q.trim()) {
    const searchText = q.trim();
    query.$or = [
      { title: { $regex: searchText, $options: "i" } },
      { location: { $regex: searchText, $options: "i" } },
      { country: { $regex: searchText, $options: "i" } },
      { category: { $regex: searchText, $options: "i" } },
      { description: { $regex: searchText, $options: "i" } },
    ];
  }

  if (category && category !== "all") {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortOptions = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    newest: { createdAt: -1 },
  };

  const listings = await Listing.find(query)
    .populate("reviews")
    .sort(sortOptions[sort] || { _id: -1 });

  res.render("listing/index", {
    listings,
    filters: { q, category, minPrice, maxPrice, sort },
    currUser: res.locals.currUser,
  });
};

// Route for render form for add new listing

module.exports.renderNewForm = (req, res) => {
  res.render("listing/new", { currUser: res.locals.currUser });
};
// Route for create Listing

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  } else {
    newListing.image = {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      filename: "default-listing-image",
    };
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Route for Show Listing

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  res.render("listing/show", { listing, currUser: res.locals.currUser });
};

// Route for edit listing which are exist..
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  // if (!listing) throw new ExpressError(404, "Listing Not Found");
  res.render("listing/edit", { listing, originalImageUrl, currUser: res.locals.currUser });
};

// update listing ( after edit listing updating the listing)
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const data = req.body.listing;
  let listing = await Listing.findByIdAndUpdate(id, { ...data });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.path;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// delete listing
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

