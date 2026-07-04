const sampleListings = [
  {
    title: "Glass Villa Over Pawna Lake",
    description:
      "A quiet lake-facing villa with floor-to-ceiling views, a private deck, and warm evening lighting for weekend stays near Pune.",
    image: {
      filename: "pawna-glass-villa",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    price: 7200,
    location: "Pawna Lake",
    country: "India",
    category: "house",
    geometry: {
      type: "Point",
      coordinates: [73.4886, 18.6787],
    },
  },
  {
    title: "Jaipur Heritage Haveli Suite",
    description:
      "A restored haveli stay with carved arches, courtyard seating, and easy access to Jaipur's old city markets.",
    image: {
      filename: "jaipur-haveli-suite",
      url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4800,
    location: "Jaipur",
    country: "India",
    category: "iconic cities",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124],
    },
  },
  {
    title: "A-Frame Cabin in Manali Pines",
    description:
      "A compact wooden cabin surrounded by pine trees, mountain air, and a cozy loft bedroom for slow travel.",
    image: {
      filename: "manali-aframe-cabin",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3600,
    location: "Manali",
    country: "India",
    category: "mountains",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2432],
    },
  },
  {
    title: "Goa Boutique Pool Stay",
    description:
      "A bright boutique stay with a palm-lined pool, breezy rooms, and quick access to North Goa cafes and beaches.",
    image: {
      filename: "goa-pool-stay",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    },
    price: 6500,
    location: "Calangute",
    country: "India",
    category: "amazing pool",
    geometry: {
      type: "Point",
      coordinates: [73.7553, 15.5439],
    },
  },
  {
    title: "Udaipur Lake View Palace Room",
    description:
      "A premium room with lake views, traditional decor, rooftop dining, and a romantic old-city atmosphere.",
    image: {
      filename: "udaipur-palace-room",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    },
    price: 8900,
    location: "Udaipur",
    country: "India",
    category: "hotel",
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854],
    },
  },
  {
    title: "Rishikesh Riverside Camp",
    description:
      "A scenic camp stay near the river with bonfire nights, adventure activities, and simple comfortable tents.",
    image: {
      filename: "rishikesh-riverside-camp",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2400,
    location: "Rishikesh",
    country: "India",
    category: "camping",
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0869],
    },
  },
  {
    title: "Alleppey Backwater Houseboat",
    description:
      "A private houseboat with calm backwater routes, local meals, and sunrise views from the upper deck.",
    image: {
      filename: "alleppey-houseboat",
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    },
    price: 9800,
    location: "Alleppey",
    country: "India",
    category: "ships",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981],
    },
  },
  {
    title: "Coorg Coffee Estate Cottage",
    description:
      "A peaceful cottage inside a coffee estate with plantation walks, homemade food, and cool hill weather.",
    image: {
      filename: "coorg-coffee-cottage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4100,
    location: "Coorg",
    country: "India",
    category: "farms",
    geometry: {
      type: "Point",
      coordinates: [75.7400, 12.3375],
    },
  },
  {
    title: "Jaisalmer Desert Dome",
    description:
      "A luxury dome stay in the desert with sunset dunes, cultural performances, and a clear night sky.",
    image: {
      filename: "jaisalmer-desert-dome",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    },
    price: 5600,
    location: "Jaisalmer",
    country: "India",
    category: "domes",
    geometry: {
      type: "Point",
      coordinates: [70.9083, 26.9157],
    },
  },
  {
    title: "Mumbai Sea-Facing Studio",
    description:
      "A modern compact studio for city stays with sea views, workspace, and easy access to Bandra and South Mumbai.",
    image: {
      filename: "mumbai-sea-studio",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    },
    price: 5200,
    location: "Mumbai",
    country: "India",
    category: "rooms",
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.0760],
    },
  },
  {
    title: "Mysore Royal Garden Stay",
    description:
      "A calm garden stay inspired by Mysore heritage with spacious rooms, breakfast seating, and palace access nearby.",
    image: {
      filename: "mysore-garden-stay",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3900,
    location: "Mysore",
    country: "India",
    category: "castles",
    geometry: {
      type: "Point",
      coordinates: [76.6394, 12.2958],
    },
  },
  {
    title: "Ladakh Snow View Retreat",
    description:
      "A high-altitude retreat with simple warm interiors, mountain views, and peaceful stays for offbeat travelers.",
    image: {
      filename: "ladakh-snow-retreat",
      url: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1200&q=80",
    },
    price: 6200,
    location: "Leh",
    country: "India",
    category: "arctic",
    geometry: {
      type: "Point",
      coordinates: [77.5770, 34.1526],
    },
  },
];

module.exports = { data: sampleListings };
