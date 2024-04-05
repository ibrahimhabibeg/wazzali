import {updateTeam} from './utils';

const editMyData = updateTeam<{
  username: string;
  description: string;
}>((team, me, {username: newUsername, description: newDescription}) => {
  const newMe = {
    ...me,
    username: newUsername,
    description: newDescription,
  };
  return {
    ...team,
    users: [...team.users.filter(user => user.id !== me.id), newMe],
  };
});

export default editMyData;
