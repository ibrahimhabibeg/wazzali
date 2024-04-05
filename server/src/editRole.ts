import {updateTeam} from './utils';

const editRole = updateTeam<{
  id: string;
  role: {title: string; description: string};
}>((team, user, {id, role: {title, description}}) => {
  if (!user.isLeader) return;
  const role = team.roles.find(val => val.id === id);
  if (!role) return;
  const roleWithSameTitle = team.roles.find(val => val.title === title);
  if (roleWithSameTitle && roleWithSameTitle?.id !== id) return;
  return {
    ...team,
    roles: [
      ...team.roles.filter(val => val.id !== id),
      {...role, title, description},
    ],
  };
});

export default editRole;
