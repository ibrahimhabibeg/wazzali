import {Team} from './types';
import {createClient} from 'redis';

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export const doesContainTeamCode = async (code: string) => {
  const team = await client.get(`team:${code}`);
  return Boolean(team);
};

export const storeTeam = async (newTeam: Team) => {
  await client.set(`team:${newTeam.code}`, JSON.stringify(newTeam));
};

export const getTeam = async (code: string) => {
  const teamString = await client.get(`team:${code}`);
  const team: Team = JSON.parse(String(teamString));
  return team;
};

export const deleteTeam = async (code: string) => {
  await client.del(`team:${code}`);
};
