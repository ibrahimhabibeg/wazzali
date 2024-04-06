import {updateTeam} from './utils';

const resetDistribution = updateTeam((team, me) => {
  if (!me.isLeader) return;
  return {
    ...team,
    distribution: null,
  };
});

export default resetDistribution;
