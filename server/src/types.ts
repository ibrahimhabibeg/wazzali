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
  icon: RoleIcon;
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
export type RoleIcon =
  | 'language-c'
  | 'language-cpp'
  | 'language-csharp'
  | 'language-css3'
  | 'language-fortran'
  | 'language-go'
  | 'language-haskell'
  | 'language-html5'
  | 'language-java'
  | 'language-javascript'
  | 'language-kotlin'
  | 'language-markdown'
  | 'language-php'
  | 'language-python'
  | 'language-r'
  | 'language-ruby'
  | 'language-ruby-on-rails'
  | 'language-rust'
  | 'language-swift'
  | 'language-typescript'
  | 'language-xaml'
  | 'aws'
  | 'microsoft-azure'
  | 'google-cloud'
  | 'google'
  | 'google-maps'
  | 'google-play'
  | 'android-studio'
  | 'android'
  | 'tea'
  | 'steam'
  | 'ab-testing'
  | 'cash';
