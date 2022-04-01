const mockProfessions = require('../mock/professions.json');
const mockQualities = require('../mock/qualities.json');
const Profession = require('../models/Profession');
const Quality = require('../models/Quality');

const createInitialEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
};

module.exports = async () => {
  const professions = await Profession.find();

  if (professions.length !== mockProfessions.length) {
    await createInitialEntity(Profession, mockProfessions);
  }

  const qualities = await Quality.find();

  if (qualities.length !== mockQualities.length) {
    await createInitialEntity(Quality, mockQualities);
  }
};
