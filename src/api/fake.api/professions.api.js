export const professionsObject = {
  doctor: { id: '67rdca3eeb7f6fgeed471818', name: 'Доктор' },
  waiter: { id: '67rdca3eeb7f6fgeed471820', name: 'Официант' },
  physics: { id: '67rdca3eeb7f6fgeed471814', name: 'Физик' },
  engineer: { id: '67rdca3eeb7f6fgeed471822', name: 'Инженер' },
  actor: { id: '67rdca3eeb7f6fgeed471824', name: 'Актер' },
  cook: { id: '67rdca3eeb7f6fgeed471829', name: 'Повар' },
};

export const professionsArray = [
  { id: '67rdca3eeb7f6fgeed471818', name: 'Доктор' },
  { id: '67rdca3eeb7f6fgeed471820', name: 'Официант' },
  { id: '67rdca3eeb7f6fgeed471814', name: 'Физик' },
  { id: '67rdca3eeb7f6fgeed471822', name: 'Инженер' },
  { id: '67rdca3eeb7f6fgeed471824', name: 'Актер' },
  { id: '67rdca3eeb7f6fgeed471829', name: 'Повар' },
];

const getAll = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(professionsArray);
  }, 500);
});

export default {
  getAll,
};
