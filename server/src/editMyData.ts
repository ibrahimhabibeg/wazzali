import {updateTeamAndMe} from './utils';

const editMyData = updateTeamAndMe<{
  username: string;
  description: string;
}>((team, me, {username: newUsername, description: newDescription}) => {
  const newMe = {
    ...me,
    username: newUsername,
    description: newDescription,
  };
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

export default editMyData;
