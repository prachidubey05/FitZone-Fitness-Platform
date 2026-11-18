
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Trainer = require("../models/Trainer");
const Membership = require("../models/Membership");
const Class = require("../models/Class");

const sampleTrainers = [
  {
    name: "Marcus Vance",
    specialization: "Strength & Conditioning",
    experience: 8,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80",
    description: "CSCS certified strength specialist focusing on powerlifting mechanics, progressive overload, and athlete conditioning."
  },
  {
    name: "Elena Rostova",
    specialization: "Yoga & Flexibility",
    experience: 6,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80",
    description: "Holistic yoga instructor guiding members through vinyasa flows, mindful breathwork, and deep functional mobility."
  },
  {
    name: "David Miller",
    specialization: "HIIT & Functional Fitness",
    experience: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80",
    description: "High-energy coach delivering explosive metabolic conditioning, athletic endurance, and fat-loss circuits."
  },
  {
    name: "Priya Sharma",
    specialization: "Pilates & Core Sculpt",
    experience: 7,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80",
    description: "Dedicated to posture alignment, injury rehabilitation, and toning stabilizer muscles through precise mat & reformer routines."
  }
];

const sampleMemberships = [
  {
    name: "Starter Pass",
    price: 1499,
    duration: "1 Month",
    popular: false,
    features: [
      "Access to main gym floor & cardio machines",
      "Full locker room & shower access",
      "1 complimentary fitness orientation",
      "FitZone mobile companion app"
    ]
  },
  {
    name: "Pro Fitness",
    price: 3499,
    duration: "3 Months",
    popular: true,
    features: [
      "Unlimited 24/7 gym & free weights access",
      "Full access to all scheduled group classes",
      "Steam room, sauna & recovery zone",
      "Custom monthly workout plan",
      "Quarterly body composition review"
    ]
  },
  {
    name: "Elite VIP",
    price: 5999,
    duration: "6 Months",
    popular: false,
    features: [
      "Priority access to all club amenities",
      "All fitness & specialty boutique classes",
      "2 personal coaching sessions / month",
      "Personalized nutrition & diet guidance",
      "1 guest pass per month",
      "Dedicated locker & towel service"
    ]
  },
  {
    name: "Annual All-Access",
    price: 9999,
    duration: "1 Year",
    popular: false,
    features: [
      "Unrestricted VIP access 365 days a year",
      "Unlimited group classes & workshops",
      "Quarterly personal training package",
      "Full access to sauna, steam & recovery lounge",
      "Welcome merchandise & supplement kit",
      "4 guest passes per quarter"
    ]
  }
];

function createFutureDate(daysFromNow, hour, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function seed() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in backend/.env");
  }

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(mongoUri);
  console.log("Connected successfully!");

  // 1. Seed Trainers (4 items)
  console.log("\n--- Seeding Trainers (Keeping 4) ---");
  await Trainer.deleteMany({});
  const createdTrainers = await Trainer.insertMany(sampleTrainers);
  console.log(`Created ${createdTrainers.length} trainers:`);
  createdTrainers.forEach((t) => console.log(` - ${t.name} (${t.specialization})`));

  const trainerMap = new Map();
  createdTrainers.forEach((t) => trainerMap.set(t.name, t._id));

  // 2. Seed Memberships (4 items)
  console.log("\n--- Seeding Membership Plans (Keeping 4) ---");
  await Membership.deleteMany({});
  const createdMemberships = await Membership.insertMany(sampleMemberships);
  console.log(`Created ${createdMemberships.length} membership plans:`);
  createdMemberships.forEach((m) => console.log(` - ${m.name}: ₹${m.price} (${m.duration})${m.popular ? " [POPULAR]" : ""}`));

  // 3. Seed Classes (4 items)
  console.log("\n--- Seeding Class Schedule (Keeping 4) ---");
  await Class.deleteMany({});

  const sampleClasses = [
    {
      title: "Sunrise Power Yoga",
      category: "Yoga",
      trainer: trainerMap.get("Elena Rostova"),
      startsAt: createFutureDate(1, 7, 0),
      durationMinutes: 60,
      capacity: 15,
      description: "Energizing morning vinyasa flow with fluid sun salutations, core postures, and breath integration."
    },
    {
      title: "High Intensity HIIT Burn",
      category: "HIIT",
      trainer: trainerMap.get("David Miller"),
      startsAt: createFutureDate(1, 9, 30),
      durationMinutes: 45,
      capacity: 18,
      description: "High-octane interval conditioning alternating tabata bursts with active recovery to maximize calorie burn."
    },
    {
      title: "Strength & Powerlifting 101",
      category: "Strength",
      trainer: trainerMap.get("Marcus Vance"),
      startsAt: createFutureDate(1, 17, 30),
      durationMinutes: 60,
      capacity: 12,
      description: "Master barbell mechanics in the squat, bench press, and deadlift with individual coaching on form."
    },
    {
      title: "Core & Pilates Sculpt",
      category: "Pilates",
      trainer: trainerMap.get("Priya Sharma"),
      startsAt: createFutureDate(2, 8, 0),
      durationMinutes: 45,
      capacity: 14,
      description: "Low-impact, high-intensity mat workout activating deep core stabilizers, pelvic floor, and postural muscles."
    }
  ];

  const createdClasses = await Class.insertMany(sampleClasses);
  console.log(`Created ${createdClasses.length} upcoming classes:`);
  createdClasses.forEach((c) => {
    console.log(` - [${c.category}] ${c.title} on ${c.startsAt.toLocaleDateString()} at ${c.startsAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} (${c.durationMinutes} min, cap: ${c.capacity})`);
  });

  console.log("\nSeed completed successfully: Exactly 4 items each!");
}

seed()
  .catch((err) => {
    console.error("Error during seeding:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  });