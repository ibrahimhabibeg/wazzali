export type User = { username: string; description: string; isLeader: boolean };
export type Role = unknown;
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
