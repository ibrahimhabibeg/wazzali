import {updateTeam} from './utils';

const distributeRoles = updateTeam((team, me) => {
  if (!me.isLeader) return;
  const distribution = distributePeopleToRoles(
    team.users.map(user => ({
      id: user.id,
      preference: [...user.rolesPreference],
    })),
    team.roles.map(role => ({
      id: role.id,
      preference: team.users
        .map(user => ({
          userId: user.id,
          averageRating: team.ratings
            .filter(
              rating => rating.to === user.id && rating.roleId === role.id
            )
            .reduce((sum, rating) => sum + rating.value, 0),
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .map(a => a.userId),
    }))
  );
  return {
    ...team,
    distribution: distribution
      .filter(a => a.personId)
      .map(a => ({roleId: a.roleId, userId: a.personId ?? ''})),
  };
});

const distributePeopleToRoles = (
  people: Array<{id: string; preference: Array<string>}>,
  roles: Array<{id: string; preference: Array<string>}>
) =>
  distributePropleToRolesRecursive(
    people,
    roles.map(role => ({...role, peopleApllied: []}))
  );

const distributePropleToRolesRecursive = (
  people: Array<{id: string; preference: Array<string>}>,
  roles: Array<{
    id: string;
    preference: Array<string>;
    peopleApllied: Array<string>;
  }>
): Array<{roleId: string; personId: string | undefined}> => {
  for (const person of people) {
    if (
      roles.reduce(
        (acc, role) => acc || role.peopleApllied.includes(person.id),
        false
      )
    )
      continue;
    const topPreference = person.preference.shift();
    if (topPreference) {
      roles
        .find(role => role.id === topPreference)
        ?.peopleApllied.push(person.id);
    }
  }
  const numberOfRolesWithExtraPeople = roles.reduce(
    (acc, role) => (role.peopleApllied.length > 1 ? acc + 1 : acc),
    0
  );
  if (numberOfRolesWithExtraPeople === 0)
    return roles.map(role => ({
      roleId: role.id,
      personId: role.peopleApllied.pop(),
    }));
  else
    return distributePropleToRolesRecursive(
      people,
      roles.map(role => {
        const favouritePerson = role.peopleApllied
          .map(person => ({
            person,
            invertedRating: role.preference.indexOf(person),
          }))
          .sort((a, b) => a.invertedRating - b.invertedRating)
          .shift()?.person;
        return {
          ...role,
          peopleApllied: favouritePerson ? [favouritePerson] : [],
        };
      })
    );
};

export default distributeRoles;
