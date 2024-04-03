export type User = {
  username: string;
  description: string;
  isLeader: boolean;
  color: 'blue' | 'red' | 'yellow' | 'green';
};
export type Role = unknown;
export type Team = {
  code: string;
  users: Array<User>;
  roles: Array<Role>;
};
