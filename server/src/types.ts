export type User = {
  id: string;
  username: string;
  description: string;
  isLeader: boolean;
  color: Color;
  rolesPreference: Array<string>;
};
export type Role = {
  id: string;
  title: string;
  description: string;
};
export type Rating = {
  roleId: string;
  from: string;
  to: string;
  value: number;
};
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
  ratings: Array<Rating>;
};
export type Color = 'blue' | 'red' | 'yellow' | 'green';
