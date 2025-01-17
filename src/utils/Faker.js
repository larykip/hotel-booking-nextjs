import { faker } from '@faker-js/faker';

export const generateFakeActivities = (count) => {
  const avatarTypes = ['identicon', 'monsterid', 'wavatar', 'retro', 'robohash'];
  return Array.from({ length: count }).map(() => ({
    user: faker.person.fullName(),
    room: `Room #${faker.number.int({ min: 1000, max: 1500 })}`,
    date: `${faker.date.past().toLocaleDateString()} - ${faker.date.future().toLocaleDateString()}`,
    time: `${faker.number.int({ min: 1, max: 60 })} min`,
    avatar: `https://gravatar.com/avatar/${faker.string.uuid()}?s=400&d=${faker.helpers.arrayElement(avatarTypes)}&r=x`,
    type: faker.helpers.arrayElement(['request', 'cleaning', 'review']),
    message: faker.lorem.sentence(),
  }));
};
