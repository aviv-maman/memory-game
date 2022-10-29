import { FC } from 'react';
import './Card.css';

export type CardType = {
  id: number;
  src: string;
  matched: boolean;
};

type CardProps = {
  card: CardType;
  handleChoice: (card: CardType) => void;
  isFlipped: boolean;
  isDisabled: boolean;
};

const Card: FC<CardProps> = ({ card, handleChoice, isFlipped, isDisabled }) => {
  const handleFlip = () => {
    if (!isDisabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={'card'}>
      <div className={isFlipped ? 'flipped' : ''}>
        <img className='front' src={card.src} alt='card front' />
        <img className='back' src='./img/cover.png' alt='card back' onClick={handleFlip} />
      </div>
    </div>
  );
};

export default Card;
