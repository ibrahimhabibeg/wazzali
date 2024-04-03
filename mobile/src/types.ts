export type User = {
  username: string;
  description: string;
  isLeader: boolean;
  color: Color;
};
export type Role = unknown;
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
export type Color = 'blue' | 'red' | 'yellow' | 'green';
