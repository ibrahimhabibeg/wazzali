const adjectives = [
  "Caffeinated",
  "Sleepless",
  "Bookish",
  "Procrastinating",
  "Quizzed-Out",
  "MajorLeague",
  "LabRat",
  "Well-Read",
  "Thesis-Bound",
  "Tech-Savvy"
];

const nouns = [
  "Nighthawk",
  "TextbookTerror",
  "LectureLover",
  "CaffeineCrusader",
  "DormRoomDenizen",
  "LibraryLurker",
  "QuizMaster",
  "NoteNerd",
  "StudyBuddy",
  "Dean'sListDreamer"
];

const randomAdjective = () =>
  adjectives[Math.floor(Math.random() * adjectives.length)];

const randomNoun = () => nouns[Math.floor(Math.random() * nouns.length)];

const randomNumber = () => Math.floor(Math.random() * 100).toString();

const teamContainUsername = (username: string, team: Team) =>
  team.users.reduce((acc, user) => acc || user.username === username, false);
export const generateUsername = (team: Team) => {
  let username: string;
  do {
    username = randomAdjective() + "_" + randomNoun() + "_" + randomNumber();
  } while (teamContainUsername(username, team));
  return username;
};

type Team = {
  users: Array<{ username: string }>;
};
