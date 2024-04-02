import {doesContainTeamCode} from './persistence';

const generateNewTeamCode = () => {
  let code: string;
  do {
    code = Math.random().toString().slice(2, 8);
  } while (doesContainTeamCode(code));
  return code;
};

export default generateNewTeamCode;
