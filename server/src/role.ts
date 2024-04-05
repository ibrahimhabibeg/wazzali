import {v4} from 'uuid';
import {Role, RoleIcon} from './types';

const roleIcons: Array<RoleIcon> = [
  'language-c',
  'language-cpp',
  'language-csharp',
  'language-css3',
  'language-fortran',
  'language-go',
  'language-haskell',
  'language-html5',
  'language-java',
  'language-javascript',
  'language-kotlin',
  'language-markdown',
  'language-php',
  'language-python',
  'language-r',
  'language-ruby',
  'language-ruby-on-rails',
  'language-rust',
  'language-swift',
  'language-typescript',
  'language-xaml',
  'aws',
  'microsoft-azure',
  'google-cloud',
  'google',
  'google-maps',
  'google-play',
  'android-studio',
  'android',
  'tea',
  'steam',
  'ab-testing',
  'cash',
];

export const createRole = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): Role => ({
  title,
  description,
  id: v4(),
  icon: roleIcons[Math.floor(Math.random() * roleIcons.length)],
});

export default createRole;
