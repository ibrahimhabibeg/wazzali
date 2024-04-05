import {Color} from './index';
import {v4 as uuidv4} from 'uuid';

const adjectives = [
  'Caffeinated',
  'Sleepless',
  'Bookish',
  'Procrastinating',
  'Quizzed-Out',
  'MajorLeague',
  'LabRat',
  'Well-Read',
  'Thesis-Bound',
  'Tech-Savvy',
];

const nouns = [
  'Nighthawk',
  'TextbookTerror',
  'LectureLover',
  'CaffeineCrusader',
  'DormRoomDenizen',
  'LibraryLurker',
  'QuizMaster',
  'NoteNerd',
  'StudyBuddy',
  "Dean'sListDreamer",
];

const descriptions = [
  'Acing classes by day, conquering caffeine by night.',
  'Textbooks? More like terror-books!',
  'Studies by day, slays the dance floor by night.',
  'Lives on ramen and dreams, fueled by a love of learning.',
  'Masters the art of the all-nighter, one quiz at a time.',
  'Their dorm room: a haven for books, brain food, and endless possibilities.',
  'Budget pro, social butterfly, with a degree on the horizon.',
  'Cramming for exams with a smile (and maybe a second cup of coffee).',
  'Tech whiz by day, brainstorming solutions by night.',
  'Thesis in progress, dreams even bigger.',
];

const colors: Array<Color> = ['red', 'blue', 'green', 'yellow'];

const randomAdjective = () =>
  adjectives[Math.floor(Math.random() * adjectives.length)];

const randomNoun = () => nouns[Math.floor(Math.random() * nouns.length)];

const randomNumber = () => Math.floor(Math.random() * 100).toString();

const teamContainUsername = (username: string, team: Team) =>
  team.users.reduce((acc, user) => acc || user.username === username, false);
const generateUsername = (team: Team) => {
  let username: string;
  do {
    username = randomAdjective() + '_' + randomNoun() + '_' + randomNumber();
  } while (teamContainUsername(username, team));
  return username;
};

const generateDescription = () =>
  descriptions[Math.floor(Math.random() * descriptions.length)];

const generateColor = () => colors[Math.floor(Math.random() * colors.length)];

const generateUser = (team: Team) => ({
  id: uuidv4(),
  username: generateUsername(team),
  description: generateDescription(),
  color: generateColor(),
});

type Team = {
  users: Array<{username: string}>;
};

export default generateUser;
