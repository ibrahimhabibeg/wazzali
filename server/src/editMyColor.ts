import {Color} from './index';
import {updateTeam} from './utils';

const editMyColor = updateTeam<Color>((team, me, color) => {
  const newMe = {...me, color};
  return {
    ...team,
    users: [...team.users.filter(user => user.id !== me.id), newMe],
  };
});

export default editMyColor;
