import {Color} from './index';
import {updateTeamAndMe} from './utils';

const editMyColor = updateTeamAndMe<Color>((team, me, color) => {
  const newMe = {...me, color};
  return {
    team: {
      ...team,
      users: [
        ...team.users.filter(user => user.username !== me.username),
        newMe,
      ],
    },
    me: newMe,
  };
});

export default editMyColor;
