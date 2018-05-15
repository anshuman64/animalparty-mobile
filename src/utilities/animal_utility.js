
//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const ANIMAL_SOUNDS = ['Roar', 'Buzz', 'Meow', 'Cluck', 'Chirp', 'Moo', 'Woof', 'Quack', 'Ribbit', 'Hiss', 'Squeak', 'Neigh', 'Hoot', 'Oink', 'Coo', 'Baa']

const ANIMALS = [
  {
    name: 'AdorableAntEater',
    image: require('../assets/images/animals/ant-eater.png'),
  },
  {
    name: 'BubblyBadger',
    image: require('../assets/images/animals/badger.png'),
  },
  {
    name: 'BraveBear',
    image: require('../assets/images/animals/bear.png'),
  },
  {
    name: 'BrilliantBull',
    image: require('../assets/images/animals/bull.png'),
  },
  {
    name: 'CuddlyCamel',
    image: require('../assets/images/animals/camel.png'),
  },
  {
    name: 'CharmingCat',
    image: require('../assets/images/animals/cat.png'),
  },
  {
    name: 'CleverChameleon',
    image: require('../assets/images/animals/chameleon.png'),
  },
  {
    name: 'CuddlyChicken',
    image: require('../assets/images/animals/cock.png'),
  },
  {
    name: 'CuriousCow',
    image: require('../assets/images/animals/cow-1.png'),
  },
  {
    name: 'ClassicCow',
    image: require('../assets/images/animals/cow.png'),
  },
  {
    name: 'CreativeCrocodile',
    image: require('../assets/images/animals/crocodile.png'),
  },
  {
    name: 'DelightfulDeer',
    image: require('../assets/images/animals/deer.png'),
  },
  {
    name: 'DearestDog',
    image: require('../assets/images/animals/dog.png'),
  },
  {
    name: 'DazzlingDolphin',
    image: require('../assets/images/animals/dolphin.png'),
  },
  {
    name: 'DarlingDonkey',
    image: require('../assets/images/animals/donkey.png'),
  },
  {
    name: 'DiligentDuck',
    image: require('../assets/images/animals/duck.png'),
  },
  {
    name: 'ElectricElephant',
    image: require('../assets/images/animals/elephant.png'),
  },
  {
    name: 'FabulousFish',
    image: require('../assets/images/animals/fish.png'),
  },
  {
    name: 'FlashyFox',
    image: require('../assets/images/animals/fox.png'),
  },
  {
    name: 'GraciousGiraffe',
    image: require('../assets/images/animals/giraffe.png'),
  },
  {
    name: 'GigglyGoat',
    image: require('../assets/images/animals/goat.png'),
  },
  {
    name: 'GorgeousGoose',
    image: require('../assets/images/animals/goose.png'),
  },
  {
    name: 'HumbleHedgehog',
    image: require('../assets/images/animals/hedgehog.png'),
  },
  {
    name: 'HandsomeHippo',
    image: require('../assets/images/animals/hippopotamus.png'),
  },
  {
    name: 'HelpfulHorse',
    image: require('../assets/images/animals/horse.png'),
  },
  {
    name: 'KindKangaroo',
    image: require('../assets/images/animals/kangaroo.png'),
  },
  {
    name: 'KeenKoala',
    image: require('../assets/images/animals/koala.png'),
  },
  {
    name: 'LuckyLion',
    image: require('../assets/images/animals/lion.png'),
  },
  {
    name: 'ModestMonkey',
    image: require('../assets/images/animals/monkey.png'),
  },
  {
    name: 'MarvelousMoose',
    image: require('../assets/images/animals/moose.png'),
  },
  {
    name: 'MatureMouse',
    image: require('../assets/images/animals/mouse.png'),
  },
  {
    name: 'ProductivePanda',
    image: require('../assets/images/animals/panda.png'),
  },
  {
    name: 'PopularPanther',
    image: require('../assets/images/animals/panther.png'),
  },
  {
    name: 'PerfectPenguin',
    image: require('../assets/images/animals/penguin.png'),
  },
  {
    name: 'PlayfulPig',
    image: require('../assets/images/animals/pig.png'),
  },
  {
    name: 'RosyRabbit',
    image: require('../assets/images/animals/rabbit.png'),
  },
  {
    name: 'RadiantRaccoon',
    image: require('../assets/images/animals/racoon.png'),
  },
  {
    name: 'ReliableRaven',
    image: require('../assets/images/animals/raven.png'),
  },
  {
    name: 'RealisticRhino',
    image: require('../assets/images/animals/rhinoceros.png'),
  },
  {
    name: 'SwiftSeal',
    image: require('../assets/images/animals/seal.png'),
  },
  {
    name: 'StrongSheep',
    image: require('../assets/images/animals/sheep.png'),
  },
  {
    name: 'StrikingSnail',
    image: require('../assets/images/animals/snail.png'),
  },
  {
    name: 'ShimmeringSnake',
    image: require('../assets/images/animals/snake.png'),
  },
  {
    name: 'StylishSquirrel',
    image: require('../assets/images/animals/squirrel.png'),
  },
  {
    name: 'ThoughtfulTiger',
    image: require('../assets/images/animals/tiger.png'),
  },
  {
    name: 'TruthfulTurtle',
    image: require('../assets/images/animals/turtle.png'),
  },
  {
    name: 'UniqueUnicorn',
    image: require('../assets/images/animals/unicorn.png'),
  },
  {
    name: 'VibrantVulture',
    image: require('../assets/images/animals/vulture.png'),
  },
  {
    name: 'WorldlyWolf',
    image: require('../assets/images/animals/wolf.png'),
  },
  {
    name: 'ZestyZebra',
    image: require('../assets/images/animals/zebra.png'),
  },
  {
    name: 'BelovedBear',
    image: require('../assets/images/animals/bear.png'),
  },
  {
    name: 'CheerfulCat',
    image: require('../assets/images/animals/cat.png'),
  },
  {
    name: 'DaringDog',
    image: require('../assets/images/animals/dog.png'),
  },
  {
    name: 'FunnyFish',
    image: require('../assets/images/animals/fish.png'),
  },
  {
    name: 'GloriousGiraffe',
    image: require('../assets/images/animals/giraffe.png'),
  },
  {
    name: 'PrettyPenguin',
    image: require('../assets/images/animals/penguin.png'),
  },
  {
    name: 'PristinePig',
    image: require('../assets/images/animals/pig.png'),
  },
  {
    name: 'HandyHippo',
    image: require('../assets/images/animals/hippopotamus.png'),
  },
  {
    name: 'HappyHorse',
    image: require('../assets/images/animals/horse.png'),
  },
  {
    name: 'ZanyZebra',
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

export const getOppositeParty = (user) => {
  if (!user || !user.political_party) {
    return 'member of the opposite party';
  } else if (user.political_party === 'DEMOCRAT') {
    return 'Republican';
  } else if (user.political_party === 'REPUBLICAN') {
    return 'Democrat';
  }
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
