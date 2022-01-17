export const qualitiesObject = {
  tedious: {
    id: '67rdca3eeb7f6fgeed471198',
    name: 'Нудила',
    color: 'primary',
  },
  strange: {
    id: '67rdca3eeb7f6fgeed471100',
    name: 'Странный',
    color: 'secondary',
  },
  buller: {
    id: '67rdca3eeb7f6fgeed4711012',
    name: 'Троль',
    color: 'success',
  },
  alcoholic: {
    id: '67rdca3eeb7f6fgeed471101',
    name: 'Алкоголик',
    color: 'danger',
  },
  handsome: {
    id: '67rdca3eeb7f6fgeed471102',
    name: 'Красавчик',
    color: 'info',
  },
  uncertain: {
    id: '67rdca3eeb7f6fgeed471103',
    name: 'Неуверенный',
    color: 'dark',
  },
};

const getAll = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(qualitiesObject);
  }, 500);
});

export default { getAll };
