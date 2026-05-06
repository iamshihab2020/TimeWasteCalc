// Catalog of relatable equivalents in HOURS
export type Comparison = {
  id: string;
  label: string;
  unit: string;
  unitPlural: string;
  hoursEach: number;
  emoji: string;
};

export const COMPARISONS: Comparison[] = [
  { id: "sleep", label: "full nights of sleep", unit: "night", unitPlural: "nights", hoursEach: 8, emoji: "🛌" },
  { id: "tokyo", label: "flights to Tokyo", unit: "flight", unitPlural: "flights", hoursEach: 14, emoji: "✈️" },
  { id: "books", label: "novels read", unit: "book", unitPlural: "books", hoursEach: 6, emoji: "📚" },
  { id: "marathons", label: "marathons run", unit: "marathon", unitPlural: "marathons", hoursEach: 4.5, emoji: "🏃" },
  { id: "movies", label: "feature films watched", unit: "movie", unitPlural: "movies", hoursEach: 2, emoji: "🎬" },
  { id: "albums", label: "albums listened to", unit: "album", unitPlural: "albums", hoursEach: 0.75, emoji: "🎧" },
  { id: "workouts", label: "gym workouts", unit: "workout", unitPlural: "workouts", hoursEach: 1, emoji: "🏋️" },
  { id: "dinners", label: "long dinners with friends", unit: "dinner", unitPlural: "dinners", hoursEach: 3, emoji: "🍝" },
  { id: "meals", label: "home-cooked meals", unit: "meal", unitPlural: "meals", hoursEach: 1, emoji: "🍳" },
  { id: "concerts", label: "live concerts", unit: "concert", unitPlural: "concerts", hoursEach: 3, emoji: "🎤" },
  { id: "roadtrips", label: "weekend road trips", unit: "trip", unitPlural: "trips", hoursEach: 16, emoji: "🚗" },
  { id: "calls", label: "phone calls with someone you love", unit: "call", unitPlural: "calls", hoursEach: 0.5, emoji: "📞" },
  { id: "sunsets", label: "sunsets watched, no phone", unit: "sunset", unitPlural: "sunsets", hoursEach: 0.5, emoji: "🌅" },
  { id: "yoga", label: "yoga classes", unit: "class", unitPlural: "classes", hoursEach: 1, emoji: "🧘" },
  { id: "workweeks", label: "full 40-hour work weeks", unit: "week", unitPlural: "weeks", hoursEach: 40, emoji: "💼" },
  { id: "vacations", label: "week-long vacations", unit: "vacation", unitPlural: "vacations", hoursEach: 112, emoji: "🏖️" },
  { id: "fulldays", label: "entire 24-hour days", unit: "day", unitPlural: "days", hoursEach: 24, emoji: "📆" },
  { id: "podcasts", label: "podcast episodes", unit: "episode", unitPlural: "episodes", hoursEach: 1.25, emoji: "🎙️" },
  { id: "boardgames", label: "board game nights", unit: "night", unitPlural: "nights", hoursEach: 3, emoji: "🎲" },
  { id: "kidbedtimes", label: "bedtime stories with a kid", unit: "story", unitPlural: "stories", hoursEach: 0.5, emoji: "📖" },
];

// Skills you could learn — hours to "passable / conversational" mastery
export const SKILLS = [
  { id: "spanish", label: "Become conversational in Spanish", hours: 600, emoji: "🇪🇸" },
  { id: "guitar", label: "Play guitar at a campfire level", hours: 300, emoji: "🎸" },
  { id: "piano", label: "Play piano (intermediate)", hours: 500, emoji: "🎹" },
  { id: "novel", label: "Write a novel (first draft)", hours: 500, emoji: "✍️" },
  { id: "cook", label: "Master 50 recipes from scratch", hours: 200, emoji: "🍳" },
  { id: "code", label: "Build a real side project", hours: 150, emoji: "💻" },
  { id: "fit", label: "Get genuinely fit (gym 4×/wk for a year)", hours: 200, emoji: "💪" },
  { id: "draw", label: "Learn to draw competently", hours: 400, emoji: "🎨" },
  { id: "meditate", label: "Establish a daily meditation habit", hours: 100, emoji: "🧘" },
  { id: "photo", label: "Become a decent photographer", hours: 200, emoji: "📷" },
  { id: "chess", label: "Reach 1500 ELO at chess", hours: 300, emoji: "♟️" },
  { id: "marathonprep", label: "Train for and run a marathon", hours: 300, emoji: "🏃" },
  { id: "publicspeak", label: "Become a confident public speaker", hours: 75, emoji: "🎤" },
  { id: "woodwork", label: "Build furniture in your garage", hours: 250, emoji: "🪚" },
  { id: "garden", label: "Grow a year-round veggie garden", hours: 150, emoji: "🌱" },
  { id: "salsa", label: "Learn to salsa dance", hours: 100, emoji: "💃" },
  { id: "videos", label: "Make a YouTube channel (100 videos)", hours: 300, emoji: "🎥" },
  { id: "climb", label: "Climb a 5.10 outdoors", hours: 200, emoji: "🧗" },
  { id: "volunteer", label: "Volunteer weekly for a cause you care about", hours: 200, emoji: "🤝" },
  { id: "calc", label: "Learn calculus from scratch", hours: 200, emoji: "📐" },
  { id: "bake", label: "Bake bread every weekend for 2 years", hours: 100, emoji: "🍞" },
  { id: "classics", label: "Read 50 classic novels", hours: 300, emoji: "📚" },
];
