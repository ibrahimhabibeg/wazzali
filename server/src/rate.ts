import {updateTeam} from './utils';

const rate = updateTeam<{userId: string; roleId: string; value: number}>(
  (team, user, {userId, roleId, value}) => {
    console.log({userId, roleId, value});
    return {
      ...team,
      ratings: [
        ...team.ratings.filter(
          rating => rating.to !== userId || rating.from !== user.id
        ),
        {
          from: user.id,
          to: userId,
          roleId,
          value,
        },
      ],
    };
  }
);

export default rate;
