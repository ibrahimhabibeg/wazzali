import {doesContainTeamCode} from './persistence';

const generateNewTeamCode = async () => {
  let code: string;
  let containTeamCode: boolean;
  do {
    code = Math.random().toString().slice(2, 8);
    containTeamCode = await doesContainTeamCode(code);
  } while (containTeamCode);
  return code;
};

export default generateNewTeamCode;
