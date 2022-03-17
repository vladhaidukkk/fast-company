import { professionsObject as professions } from './professions.api';
import { qualitiesObject as qualities } from './qualities.api';

const users = [
  {
    id: '67rdca3eeb7f6fgeed471815',
    name: 'Джон Дориан',
    email: 'Jony7351@tw.com',
    gender: 'male',
    profession: professions.doctor,
    qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: true,
  },
  {
    id: '67rdca3eeb7f6fgeed471816',
    name: 'Кокс',
    email: 'white4571@twipet.com',
    gender: 'male',
    profession: professions.doctor,
    qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed471817',
    name: 'Боб Келсо',
    email: 'bob007@tw.com',
    gender: 'male',
    profession: professions.doctor,
    qualities: [qualities.buller],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed471818',
    name: 'Рэйчел Грин',
    email: 'green7311@fam.biz',
    gender: 'female',
    profession: professions.waiter,
    qualities: [qualities.uncertain],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed471819',
    name: 'Шелдон Купер',
    email: 'mindgames6878@phis.tech',
    gender: 'male',
    profession: professions.physics,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed471820',
    name: 'Леонард Хофстедтер',
    email: 'mindes000@phis.tech',
    gender: 'male',
    profession: professions.physics,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed471821',
    name: 'Говард Воловиц',
    email: 'gov1903@phis.tech',
    gender: 'male',
    profession: professions.engineer,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: true,
  },
  {
    id: '67rdca3eeb7f6fgeed471822',
    name: 'Никола Тесла',
    email: 'electro@underground.tech',
    gender: 'male',
    profession: professions.engineer,
    qualities: [qualities.handsome],
    completedMeetings: 72,
    rate: 5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed471823',
    name: 'Моника Геллер',
    email: 'mono@super.com',
    gender: 'female',
    profession: professions.cook,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed471824',
    name: 'Рататуй',
    email: 'ratatatata@underground.com',
    gender: 'male',
    profession: professions.cook,
    qualities: [qualities.handsome, qualities.buller],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed47181f',
    name: 'Джоуи Триббиани',
    email: 'joe@trib.com',
    gender: 'male',
    profession: professions.actor,
    qualities: [qualities.uncertain, qualities.strange],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false,
  },
  {
    id: '67rdca3eeb7f6fgeed47181r',
    name: 'Брэд Питт',
    email: 'superstar@star.com',
    gender: 'male',
    profession: professions.actor,
    qualities: [qualities.handsome],
    completedMeetings: 434,
    rate: 5,
    bookmark: false,
  },
];

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users));
}

const getAll = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(localStorage.getItem('users')));
    }, 500);
  });

const getById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users'));
      const user = users.find((user) => user.id === id);
      if (user) {
        resolve(user);
      }
      reject(new Error("UserLayout wasn't found"));
    }, 500);
  });

const patch = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = { ...users[userIndex], ...data };
    localStorage.setItem('users', JSON.stringify(users));
    resolve(users[userIndex]);
  });

export default {
  getAll,
  getById,
  patch,
};
