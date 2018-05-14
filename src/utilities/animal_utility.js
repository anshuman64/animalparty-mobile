
//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const ANIMAL_SOUNDS = ['Roar', 'Buzz', 'Meow', 'Cluck', 'Chirp', 'Moo', 'Woof', 'Quack', 'Ribbit', 'Hiss', 'Squeak', 'Neigh', 'Hoot', 'Oink', 'Coo', 'Baa']

const ANIMAL_NAMES = [
  'Dog',
  'Cat',
  'Lion',
  'Tiger',
  'Rabbit',
  'Goat',
  'Sheep',
  'Cow',
  'Pig',
  'Parrot',
  'Bear',
  'Bull',
  'Rooster',
  'Chicken',
  'Monkey',
  'Snake',
  'Seal',
  'Crab',
  'Dolphin',
  'Shark',
  'Mouse',
  'Rat',
  'Alligator',
  'Crocodile',
  'Octopus',
  'Bird',
  'Whale',
  'Panda',
  'Penguin',
  'Walrus',
  'Giraffe',
  'Deer',
  'Wolf',
  'Fox',
  'Frog',
  'Moose',
  'Skunk',
  'Fish',
  'Rhino',
  'Hippo',
  'Crab',
  'Llama',
  'Hamster',
  'Bat',
  'Beaver',
  'Owl',
  'Jellyfish',
  'Ostrich',
  'Gorilla',
  'Peacock',
  'Sloth',
  'Kangaroo',
  'Turkey',
  'Crow',
  'Lizard',
  'Spider',
  'Swan',
  'Buffalo',
  'Horse',
  'Duck'
]

export const getUsername = (user) => {
  let date = new Date(user.created_at);
  let index = date.getSeconds();
  return ANIMAL_NAMES[index] + user.id;
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
