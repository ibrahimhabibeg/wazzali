import {updateTeam} from './utils';

const editRole = updateTeam<{
  title: string;
  role: {title: string; description: string};
}>((team, user, {title, role: {title: newTitle, description}}) => {
  if (!user.isLeader) return;
  const role = team.roles.find(val => val.title === title);
  if (!role) return;
  const roleWithSameTitle = team.roles.find(val => val.title === newTitle);
  if (newTitle !== title && roleWithSameTitle) return;
  return {
    ...team,
    roles: [
      ...team.roles.filter(val => val.title !== title),
      {...role, title: newTitle, description},
    ],
  };
});

export default editRole;
