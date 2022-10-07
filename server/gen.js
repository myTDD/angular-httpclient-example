const faker=require('faker');
/* Generate Images */
const generateImages = (number) => {
  const images = [];
  while (number !== 0) {
    const value = faker.image.image();
    images.push(value);
    number--;
  }
  return images;
};
