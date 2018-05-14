
//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const ANIMAL_SOUNDS = ['Roar', 'Buzz', 'Meow', 'Cluck', 'Chirp', 'Moo', 'Woof', 'Quack', 'Ribbit', 'Hiss', 'Squeak', 'Neigh', 'Hoot', 'Oink', 'Coo', 'Baa']


// TODO: add silly adjectives
const ANIMALS = [
  {
    name: 'AntEater',
    image: require('../assets/images/animals/ant-eater.png'),
  },
  {
    name: 'Badger',
    image: require('../assets/images/animals/badger.png'),
  },
  {
    name: 'Bear',
    image: require('../assets/images/animals/bear.png'),
  },
  {
    name: 'Bull',
    image: require('../assets/images/animals/bull.png'),
  },
  {
    name: 'Camel',
    image: require('../assets/images/animals/camel.png'),
  },
  {
    name: 'Cat',
    image: require('../assets/images/animals/cat.png'),
  },
  {
    name: 'Chameleon',
    image: require('../assets/images/animals/chameleon.png'),
  },
  {
    name: 'Chicken',
    image: require('../assets/images/animals/cock.png'),
  },
  {
    name: 'CuriousCow',
    image: require('../assets/images/animals/cow-1.png'),
  },
  {
    name: 'Cow',
    image: require('../assets/images/animals/cow.png'),
  },
  {
    name: 'Crocodile',
    image: require('../assets/images/animals/crocodile.png'),
  },
  {
    name: 'Deer',
    image: require('../assets/images/animals/deer.png'),
  },
  {
    name: 'Dog',
    image: require('../assets/images/animals/dog.png'),
  },
  {
    name: 'Dolphin',
    image: require('../assets/images/animals/dolphin.png'),
  },
  {
    name: 'Donkey',
    image: require('../assets/images/animals/donkey.png'),
  },
  {
    name: 'Duck',
    image: require('../assets/images/animals/duck.png'),
  },
  {
    name: 'Elephant',
    image: require('../assets/images/animals/elephant.png'),
  },
  {
    name: 'Fish',
    image: require('../assets/images/animals/fish.png'),
  },
  {
    name: 'Fox',
    image: require('../assets/images/animals/fox.png'),
  },
  {
    name: 'Giraffe',
    image: require('../assets/images/animals/giraffe.png'),
  },
  {
    name: 'Goat',
    image: require('../assets/images/animals/goat.png'),
  },
  {
    name: 'Goose',
    image: require('../assets/images/animals/goose.png'),
  },
  {
    name: 'Hedgehog',
    image: require('../assets/images/animals/hedgehog.png'),
  },
  {
    name: 'Hippo',
    image: require('../assets/images/animals/hippopotamus.png'),
  },
  {
    name: 'Horse',
    image: require('../assets/images/animals/horse.png'),
  },
  {
    name: 'Kangaroo',
    image: require('../assets/images/animals/kangaroo.png'),
  },
  {
    name: 'Koala',
    image: require('../assets/images/animals/koala.png'),
  },
  {
    name: 'Lion',
    image: require('../assets/images/animals/lion.png'),
  },
  {
    name: 'Monkey',
    image: require('../assets/images/animals/monkey.png'),
  },
  {
    name: 'Moose',
    image: require('../assets/images/animals/moose.png'),
  },
  {
    name: 'Mouse',
    image: require('../assets/images/animals/mouse.png'),
  },
  {
    name: 'Panda',
    image: require('../assets/images/animals/panda.png'),
  },
  {
    name: 'Panther',
    image: require('../assets/images/animals/panther.png'),
  },
  {
    name: 'Penguin',
    image: require('../assets/images/animals/penguin.png'),
  },
  {
    name: 'Pig',
    image: require('../assets/images/animals/pig.png'),
  },
  {
    name: 'Rabbit',
    image: require('../assets/images/animals/rabbit.png'),
  },
  {
    name: 'Raccoon',
    image: require('../assets/images/animals/racoon.png'),
  },
  {
    name: 'Raven',
    image: require('../assets/images/animals/raven.png'),
  },
  {
    name: 'Rhino',
    image: require('../assets/images/animals/rhinoceros.png'),
  },
  {
    name: 'Seal',
    image: require('../assets/images/animals/seal.png'),
  },
  {
    name: 'Sheep',
    image: require('../assets/images/animals/sheep.png'),
  },
  {
    name: 'Snail',
    image: require('../assets/images/animals/snail.png'),
  },
  {
    name: 'Snake',
    image: require('../assets/images/animals/snake.png'),
  },
  {
    name: 'Squirrel',
    image: require('../assets/images/animals/squirrel.png'),
  },
  {
    name: 'Tiger',
    image: require('../assets/images/animals/tiger.png'),
  },
  {
    name: 'Turtle',
    image: require('../assets/images/animals/turtle.png'),
  },
  {
    name: 'Unicorn',
    image: require('../assets/images/animals/unicorn.png'),
  },
  {
    name: 'Vulture',
    image: require('../assets/images/animals/vulture.png'),
  },
  {
    name: 'Wolf',
    image: require('../assets/images/animals/wolf.png'),
  },
  {
    name: 'Zebra',
    image: require('../assets/images/animals/zebra.png'),
  },
  {
    name: 'Bear',
    image: require('../assets/images/animals/bear.png'),
  },
  {
    name: 'Cat',
    image: require('../assets/images/animals/cat.png'),
  },
  {
    name: 'Dog',
    image: require('../assets/images/animals/dog.png'),
  },
  {
    name: 'Fish',
    image: require('../assets/images/animals/fish.png'),
  },
  {
    name: 'Giraffe',
    image: require('../assets/images/animals/giraffe.png'),
  },
  {
    name: 'Penguin',
    image: require('../assets/images/animals/penguin.png'),
  },
  {
    name: 'Pig',
    image: require('../assets/images/animals/pig.png'),
  },
  {
    name: 'Hippo',
    image: require('../assets/images/animals/hippopotamus.png'),
  },
  {
    name: 'Horse',
    image: require('../assets/images/animals/horse.png'),
  },
  {
    name: 'Zebra',
    image: require('../assets/images/animals/zebra.png'),
  }
]

export const getUsername = (user) => {
  if (!user) {
    return 'AnonymousAardvark';
  }

  let date = new Date(user.created_at);
  let index = date.getSeconds();
  return ANIMALS[index].name + user.id;
}

export const getAvatar = (user) => {
  if (!user) {
    return null;
  }

  let date = new Date(user.created_at);
  let index = date.getSeconds();
  return ANIMALS[index].image;
}

export const getMessagePreview = (message, clientId) => {
  let messagePreview = 'Send a message...';

  if (message) {
    if (message.body) {
      messagePreview = message.body;
    } else {
      if (message.author_id === clientId) {
        messagePreview = 'You sent an image.';
      } else {
        messagePreview = 'They sent an image.';
      }
    }
  }

  return messagePreview;
}
