export const services = [
  {
    number: "01",
    title: "Strength Training",
    description: "Build strength and improve your physical performance."
  },
  {
    number: "02",
    title: "Personal Training",
    description: "Work towards your goals with guided fitness sessions."
  },
  {
    number: "03",
    title: "Cardio Fitness",
    description: "Improve stamina, endurance and overall fitness."
  }
];

export const plans = [
  {
    name: "Basic",
    price: "999",
    duration: "per month",
    features: ["Gym access", "Locker facility", "General workout area"],
    popular: false
  },
  {
    name: "Standard",
    price: "1,799",
    duration: "per month",
    features: ["All Basic benefits", "Group fitness sessions", "Fitness assessment"],
    popular: true
  },
  {
    name: "Premium",
    price: "2,999",
    duration: "per month",
    features: ["All Standard benefits", "Personal training sessions", "Priority support"],
    popular: false
  }
];

export const trainers = [
  {
    name: "Rahul Sharma",
    specialty: "Strength & Conditioning",
    experience: "5 years of experience",
    image: "photo-1567013127542-490d757e51fc"
  },
  {
    name: "Priya Verma",
    specialty: "Yoga & Flexibility",
    experience: "4 years of experience",
    image: "photo-1544367567-0f2fcb009e0b"
  },
  {
    name: "Arjun Mehta",
    specialty: "Cardio & Weight Loss",
    experience: "6 years of experience",
    image: "photo-1583454110551-21f2fa2afe61"
  }
];

export const activities = [
  { day: "MON", activity: "Strength Training", duration: "45 min" },
  { day: "WED", activity: "Cardio Workout", duration: "30 min" },
  { day: "FRI", activity: "Full Body Workout", duration: "50 min" }
];
