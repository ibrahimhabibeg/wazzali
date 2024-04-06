import {deleteTeam} from './persistence';
import {updateTeam} from './utils';

const disonnect = updateTeam((team, me) => {
  const filteredUsers = team.users.filter(user => user.id !== me.id);
  if (filteredUsers.length === 0) {
    deleteTeam(team.code);
    return;
  }
  const newLeader =
    filteredUsers.find(user => user.isLeader) ??
    filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
  return {
    ...team,
    users: filteredUsers.map(user =>
      user.id === newLeader.id ? {...user, isLeader: true} : user
    ),
    ratings: team.ratings.filter(
      rating => rating.from !== me.id && rating.to !== me.id
    ),
    distribution: team.distribution
      ? team.distribution.filter(({userId}) => userId !== me.id)
      : null,
  };
});

export default disonnect;
