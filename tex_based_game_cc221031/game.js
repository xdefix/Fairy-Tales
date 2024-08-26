const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons');

let state = {}

function startGame() {
  state = {}
  showTextNote(0)
}

function showTextNote(textNoteIndex) {
  const textNote = textNotes.find(textNote => textNote.id === textNoteIndex)
  textElement.innerText = textNote.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNote.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNoteId = option.nextText
  if (nextTextNoteId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNote(nextTextNoteId)
}

const textNotes = [
  {
    id: 0,
    text: 'Fairy Tales',
    options: [
      {
        text: 'Enter realm',
        nextText: 1
      }
    ]
  },

  {
    id: 1,
    text: 'You wake up in an enchanted forest. Next to you there is a jar full of fireflies.',
    options: [
      {
        text: 'Pick up the jar',
        setState: { jarofflies: true },
        nextText: 2
      },
      {
        text: 'Leave the jar',
        nextText: 2
      },
      {
        text: 'Break the jar',
        setState: { dust: true },
        nextText: 16
      }
    ]
  },
  {
    id: 2,
    text: "You venture forth in search of answers to where you are when you come across quite the extraordinary character. It's a mouse, the size of a human, pulling a cart with cherries.",
    options: [
      {
        text: 'Trade the jar for cherries',
        requiredState: (currentState) => currentState.jarofflies,
        setState: { jarofflies: false, cherries: true },
        nextText: 3
      },
      {
        text: 'Trade the jar for nectar',
        requiredState: (currentState) => currentState.jarofflies,
        setState: { jarofflies: false, jarofnectar: true },
        nextText: 3
      },
      {
        text: 'Ignore the mouse',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the mouse, you continue to explore and stumble upon a small cabin next to the river.',
    options: [
      {
        text: 'Explore further',
        nextText: 4
      },
      {
        text: 'Swim across the river',
        nextText: 5
      },
      {
        text: 'Enter the cabin',
        nextText: 6
      },
      {
        text: 'Get on the boat that you can now see',
        requiredState: (currentState) => currentState.lantern,
        nextText: 12
      }
    ]
  },
  {
    id: 4,
    text: "You stumble upon a fairy. Unfortunately, she isn't friendly and she casts a spell on you.",
    options: [
      {
        text: "Don't move",
        nextText: 17
      },
      {
        text: 'Fight the fairy',
        requiredState: (currentState) => currentState.dust,
        nextText: 18
      }
    ]
  },
  {
    id: 5,
    text: "While trying to swim across the river, you find yourself in the presence of three gigantic turtles. They see that you are harmless and decide to leave you alone. However, the propulsion power, from them, swimming away, causes sudden swells of water. That gets your head under the surface and you can't swim up. Sadly, you drown.",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "Once inside the cabin, you find yourself surrounded by smoke. When the smoke clears up you see two frogs, making some type of potion in a huge, black pot.",
    options: [
      {
        text: 'Greet them and ask to enter',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'They turn to you and greet you back, allowing your entrance into the cabin. They say you can stay under one condition: to give them the ingredient they need for the potion.',
    options: [
      {
        text: 'Offer the jar of fireflies',
        requiredState: (currentState) => currentState.jarofflies,
        nextText: 8
      },
      {
        text: 'Offer the cherries',
        requiredState: (currentState) => currentState.cherries,
        nextText: 9
      },
      {
        text: 'Offer the jar of nectar',
        requiredState: (currentState) => currentState.jarofnectar,
        nextText: 10
      },
      {
        text: 'Leave the cabin',
        nextText: 22
      }
    ]
  },
  {
    id: 8,
    text: 'Your offer is accepted and the frogs add the contents of the jar to the potion. The fireflies added to it make the pot shine brighter than the sun. This experiment results in all of you being blinded.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'The two frogs accept the fruits and after taking the pits out they put them in the pot. The potion turns out to be a very tasty, homemade jam. You and your newfound friends sit down for supper enjoying some tea, along with the jam and some cookies.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: "When they hear what you offer the frogs aren't interested and they return to brewing their potion without paying attention to you.",
    options: [
      {
        text: 'Look around',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: "You look around and you see a lantern",
    options: [
      {
        text: 'Pick up lantern',
        setState: { lantern: true },
        nextText: 22
      },
      {
        text: 'Leave cabin',
        nextText: 22
      }
    ]
  },
  {
    id: 12,
    text: "You get to the vilage across the river. All around you there are mushroom houses inhabited by fairies.",
    options:[
      {
        text: 'Explore further',
        nextText: 13
      },
      {
        text: 'Go to the nearby merchant',
        nextText: 13
      }
    ]
  },
  {
    id: 13,
    text: "The merchant turns to you and smiles, he offers you his help in exchange of some nectar.",
    options:[
      {
        text: 'Ignore merchant',
        nextText: 14
      },
      {
        text: 'Give him the jar',
        requiredState: (currentState) => currentState.jarofnectar,
        nextText: 15
      }
    ]
  },
  {
    id: 14,
    text: 'When you decide to be rude the merchant attacks you. Soon a fairy, who looks like a guard, comes up to you. Since you are the odd one out you end up in a prison cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },  {
    id: 15,
    text: 'When you take out the jar and hand it over the merchant smiles brightly. He then helps you to find your way back to your realm',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: "After breaking the jar you now find yourself covered in sparkly dust, which glows lightly.",
    options: [
      {
        text: 'Get up',
        nextText: 2
      }
    ]
  },
  {
    id: 17,
    text: "Before you realize it you are already dizzy and it doesn't take long before you faint.",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 18,
    text: "Thanks to the sparkly dust, you were covered in, the spell doesn't affect you. This is of great help because the fairy is quite weak otherwise. You win against her and you pick up the mushroom, she had in her hand.",
    options: [
      {
        text: 'Go further',
        setState: { dust: false, mushroom: true },
        nextText: 19
      }
    ]
  },
  {
    id: 19,
    text: "You see another mouse, wearing an eyepatch and a cloak, at what looks like a dead end. He offers you a trade: the mushroom for a lantern.",
    options: [
      {
        text: 'Hand over the mushroom',
        requiredState: (currentState) => currentState.mushroom,
        setState:{ mushroom: false, lantern: true},
        nextText: 21
      },
      {
        text: 'Refuse the deal',
        nextText: 20
      }
    ]
  },
  {
    id: 20,
    text: "Much like the fairy, you took the mushroom from, the mouse turns out to be unfriendly. This time you can't manage to protect yourself and you are knocked out by the mouse.",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 21,
    text: 'After leaving the mouse you go back.',
    options: [
      {
        text: 'Swim across the river',
        nextText: 5
      },
      {
        text: 'Enter the cabin',
        nextText: 6
      },
      {
        text: 'Get on the boat that you can now see',
        requiredState: (currentState) => currentState.lantern,
        nextText: 12
      }
    ]
  },
  {
    id: 22,
    text: 'After leaving the cabin you continue to explore.',
    options: [
      {
        text: 'Explore further',
        nextText: 4
      },
      {
        text: 'Swim across the river',
        nextText: 5
      },
      {
        text: 'Get on the boat that you can now see',
        requiredState: (currentState) => currentState.lantern,
        nextText: 12
      }
    ]
  },
]

function setPlayer(){
  let beat  = new Audio('./music/bgsound.mp3');
  beat.addEventListener("canplaythrough", () => {
    beat.play().catch(e => {
       window.addEventListener('click', () => {
          beat.play()
       }, { once: true })
    })

 });
}

setPlayer()

startGame()