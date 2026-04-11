// Jess-pardy question data — sourced from Jess_pardy_Questions.csv

export type Question = {
  category: string;
  points: number;
  clue: string;
  answer: string;
  link: string;
  isJessChallenge: boolean;
};

export type FinalJeopardyData = {
  clue: string;
  answer: string;
};

export const CATEGORIES = [
  "Hobbies",
  "Gamer Girl",
  "Food & Drink",
  "Music",
  "Did You Know",
] as const;

export const POINT_VALUES = [100, 200, 300, 400, 500] as const;

export const QUESTIONS: Question[] = [
  // Hobbies
  {
    category: "Hobbies",
    points: 100,
    clue: "This interior design style, which Jess used for her home, blends Japanese minimalism with Scandinavian functionality.",
    answer: "Japandi",
    link: "https://en.wikipedia.org/wiki/Japandi",
    isJessChallenge: false,
  },
  {
    category: "Hobbies",
    points: 200,
    clue: "Jess is a 'keeb' who is often still receiving these two keyboard components from orders she placed years ago.",
    answer: "Keycaps and Switches",
    link: "https://www.reddit.com/r/MechanicalKeyboards/",
    isJessChallenge: false,
  },
  {
    category: "Hobbies",
    points: 300,
    clue: "This is Jess's favorite anime, centered around an elven mage and her journey after her hero party disbands.",
    answer: "Frieren: Beyond Journey's End",
    link: "https://www.crunchyroll.com/series/GG5H5XQX4/frieren-beyond-journeys-end",
    isJessChallenge: false,
  },
  {
    category: "Hobbies",
    points: 400,
    clue: "This actor is Jess's absolute favorite to play the titular role in The Phantom of the Opera.",
    answer: "Ramin Karimloo",
    link: "https://www.raminkarimloo.com/",
    isJessChallenge: false,
  },
  {
    category: "Hobbies",
    points: 500,
    clue: "This specific weight-lifting movement is considered Jess's 'signature' exercise at the gym.",
    answer: "Hip Thrust",
    link: "https://www.verywellfit.com/how-to-do-a-hip-thrust-4684534",
    isJessChallenge: false,
  },

  // Gamer Girl
  {
    category: "Gamer Girl",
    points: 100,
    clue: "Jess has logged an impressive 400+ hours in this cozy farming simulator.",
    answer: "Stardew Valley",
    link: "https://www.stardewvalley.net/",
    isJessChallenge: false,
  },
  {
    category: "Gamer Girl",
    points: 200,
    clue: "Jess is currently streaming this spooky genre of video games for her viewers.",
    answer: "Horror games",
    link: "https://www.twitch.tv/directory/game/Horror",
    isJessChallenge: false,
  },
  {
    category: "Gamer Girl",
    points: 300,
    clue: "JESS CHALLENGE: 1v1 Jess in this classic Nintendo racing game. Beat her to win the points!",
    answer: "Mario Kart",
    link: "https://mariokart8.nintendo.com/",
    isJessChallenge: true,
  },
  {
    category: "Gamer Girl",
    points: 400,
    clue: "This League of Legends champion is her favorite because of his thematic connection to the Phantom of the Opera.",
    answer: "Jhin",
    link: "https://www.leagueoflegends.com/en-us/champions/jhin/",
    isJessChallenge: false,
  },
  {
    category: "Gamer Girl",
    points: 500,
    clue: "Her name in her boyfriend's phone is an inverted acronym of this game—the first one they played together.",
    answer: "The Last of Us (L.U.O.)",
    link: "https://www.playstation.com/en-us/games/the-last-of-us-part-i/",
    isJessChallenge: false,
  },

  // Food & Drink
  {
    category: "Food & Drink",
    points: 100,
    clue: "This is the physical reaction Jess gets whenever she consumes alcohol.",
    answer: "Asian Glow (Alcohol Flush)",
    link: "https://en.wikipedia.org/wiki/Alcohol_flush_reaction",
    isJessChallenge: false,
  },
  {
    category: "Food & Drink",
    points: 200,
    clue: "Jess's dog is named after this, which also happens to be her favorite dessert.",
    answer: "Tiramisu",
    link: "https://www.italy24press.com/food/12345.html",
    isJessChallenge: false,
  },
  {
    category: "Food & Drink",
    points: 300,
    clue: "This is the specific boba brand Jess has been loving lately.",
    answer: "Mixue",
    link: "https://www.mxbc.com/",
    isJessChallenge: false,
  },
  {
    category: "Food & Drink",
    points: 400,
    clue: "This is Jess's favorite Chinese restaurant located in New York City.",
    answer: "Mountain House",
    link: "https://www.mountainhousenyc.com/",
    isJessChallenge: false,
  },
  {
    category: "Food & Drink",
    points: 500,
    clue: "Aside from being a great gardener, this is the professional background of Jess's father.",
    answer: "Szechuanese Chef",
    link: "https://en.wikipedia.org/wiki/Sichuan_cuisine",
    isJessChallenge: false,
  },

  // Music
  {
    category: "Music",
    points: 100,
    clue: "Jess grew up playing these two classical instruments.",
    answer: "Flute and Piano",
    link: "",
    isJessChallenge: false,
  },
  {
    category: "Music",
    points: 200,
    clue: "If Jess is at the karaoke mic, she is most likely singing this Disney classic from The Little Mermaid.",
    answer: "Part of Your World",
    link: "https://www.disneyclips.com/lyrics/lyrics8.html",
    isJessChallenge: false,
  },
  {
    category: "Music",
    points: 300,
    clue: "JESS CHALLENGE: Pick a team member to sing a song from Phantom. Jess judges if points are awarded.",
    answer: "Phantom of the Opera",
    link: "https://www.thephantomoftheopera.com/",
    isJessChallenge: true,
  },
  {
    category: "Music",
    points: 400,
    clue: "This band, known for 'The Summoning,' is one of the groups Jess is currently into.",
    answer: "Sleep Token",
    link: "https://www.sleep-token.com/",
    isJessChallenge: false,
  },
  {
    category: "Music",
    points: 500,
    clue: "Origin of Symmetry is Jess's favorite album by this English rock band.",
    answer: "Muse",
    link: "https://www.muse.mu/music/origin-symmetry-26",
    isJessChallenge: false,
  },

  // Did You Know
  {
    category: "Did You Know",
    points: 100,
    clue: "This is Jess's dominant hand.",
    answer: "Left-handed",
    link: "https://www.scientificamerican.com/article/is-it-true-that-left-handed-people-are-smarter/",
    isJessChallenge: false,
  },
  {
    category: "Did You Know",
    points: 200,
    clue: "Jess showed off her tech skills by building this specific piece of hardware for her boyfriend.",
    answer: "Gaming PC",
    link: "https://pcpartpicker.com/",
    isJessChallenge: false,
  },
  {
    category: "Did You Know",
    points: 300,
    clue: "Jess has seen The Phantom of the Opera abroad in this specific city.",
    answer: "London",
    link: "https://www.lwtheatres.co.uk/theatres/his-majestys/",
    isJessChallenge: false,
  },
  {
    category: "Did You Know",
    points: 400,
    clue: "Jess attributes her 'green thumb' to her father, whose own family has this professional background.",
    answer: "Farming",
    link: "",
    isJessChallenge: false,
  },
  {
    category: "Did You Know",
    points: 500,
    clue: "Jess has seen the 'reimagined' Phantom of the Opera experience exactly this many times.",
    answer: "Four (4)",
    link: "https://www.timeout.com/london/theatre/the-phantom-of-the-opera",
    isJessChallenge: false,
  },
];

export const FINAL_JEOPARDY: FinalJeopardyData = {
  clue: "Draw her favorite pokemon. (Teams wager points first!)",
  answer: "Jess confirms (Check if Gengar or Sylveon!)",
};

export function getQuestion(category: string, points: number): Question | undefined {
  return QUESTIONS.find((q) => q.category === category && q.points === points);
}

export function questionKey(category: string, points: number): string {
  return `${category}-${points}`;
}
