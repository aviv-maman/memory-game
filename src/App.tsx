import { useEffect, useState } from 'react';
import './App.css';
import Card, { CardType } from './components/Card';

const cardsImages = [
  { src: './img/helmet-1.png' },
  { src: './img/potion-1.png' },
  { src: './img/ring-1.png' },
  { src: './img/scroll-1.png' },
  { src: './img/shield-1.png' },
  { src: './img/sword-1.png' },
];

const initialCardState: CardType = { id: 0, src: '', matched: false };

function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<CardType>(initialCardState);
  const [choiceTwo, setChoiceTwo] = useState<CardType>(initialCardState);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  //Shuffle Cards
  const shuffleCards = () => {
    const doubledCards = [...cardsImages, ...cardsImages];
    const shuffledCards = doubledCards.sort(() => Math.random() - 0.5);
    const cardsWithIds = shuffledCards.map<CardType>((card) => ({
      ...card,
      id: Math.random() * 9999,
      matched: false,
    }));
    setCards(cardsWithIds);
    setTurns(0);
  };

  //Handle a Choice
  const handleChoice = (card: CardType): void => {
    choiceOne.src !== '' ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //Compare 2 Selected Cards, Disable Rest of Cards, and Reset Turn
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (choiceOne.src !== '' && choiceTwo.src !== '') {
      setIsDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => (card.src === choiceOne.src ? { ...card, matched: true } : card))
        );
        // setCards((prevCards) =>
        //   prevCards.map((card) => {
        //     if (card.src === choiceOne.src) {
        //       return { ...card, matched: true };
        //     } else {
        //       return card;
        //     }
        //   })
        // );
        resetTurn();
      } else {
        timeoutId = setTimeout(() => {
          resetTurn();
        }, 700);
      }
    }
    return () => {
      clearTimeout(timeoutId);
      console.log('Timeout Cleanup...');
    };
  }, [choiceOne.src, choiceTwo.src]);

  //Reset Choices, Increase Turn and Reset isDisabled
  const resetTurn = () => {
    setChoiceOne(initialCardState);
    setChoiceTwo(initialCardState);
    setTurns((prevState) => prevState + 1);
    setIsDisabled(false);
  };

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            isFlipped={card === choiceOne || card === choiceTwo || card.matched}
            isDisabled={isDisabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
