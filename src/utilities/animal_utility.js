
//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const ANIMAL_SOUNDS = ['Roar', 'Buzz', 'Meow', 'Cluck', 'Chirp', 'Moo', 'Woof', 'Quack', 'Ribbit', 'Hiss', 'Squeak', 'Neigh', 'Hoot', 'Oink', 'Coo', 'Baa']


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
