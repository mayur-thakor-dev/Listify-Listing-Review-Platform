// 1. Load environment variables at the very top!
// If index.js is inside a subfolder (e.g., roots/init/index.js), use { path: "../.env" } or "../../.env"
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") }); 

let mongoose = require("mongoose");
let initData = require("./data");
const Listing = require("../model/listing");
const Review = require("../model/review");
const User = require("../model/user");

// 2. Verified fallback check
const MONGO_URL = process.env.ATLASDB_URL;

if (!MONGO_URL) {
  console.error("❌ Error: ATLASDB_URL is not defined in your .env file!");
  process.exit(1);
}

main()
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully.");
    return initDB(); // Run initialization ONLY after connecting
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Review.deleteMany({});

    let demoOwner = await User.findOne({ username: "wanderlust_demo" });
    if (!demoOwner) {
      demoOwner = new User({
        username: "wanderlust_demo",
        email: "demo@wanderlust.local",
      });
      await User.register(demoOwner, "wanderlust123");
    }

    const listings = initData.data.map((listing) => ({
      ...listing,
      owner: demoOwner._id,
    }));

    await Listing.insertMany(listings);
    console.log(`Database initialized with ${listings.length} curated listings`);
  } catch (error) {
    console.error("Seeding Error:", error);
  } finally {
    // Ensure connection always closes cleanly
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};