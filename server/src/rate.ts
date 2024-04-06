import {updateTeam} from './utils';

const rate = updateTeam<{userId: string; roleId: string; value: number}>(
  (team, me, {userId, roleId, value}) => {
    return {
      ...team,
      ratings: team.ratings.map(rating =>
        rating.roleId === roleId &&
        rating.from === me.id &&
        rating.to === userId
          ? {...rating, value}
          : rating
      ),
    };
  }
);

export default rate;
