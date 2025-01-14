import React, {Component} from 'react';
import {Smile, Heart, Star, Sun, Moon, Cloud, Coffie, Music} from 'lucide-react';
import MemoryCard from './MemoryCard';

class MemoryGame extends Component {
    constructor(props){
        super(props);

        const symbols = [Smile, Heart, Star, Sun, Moon, Cloud, Coffie, Music];
        const cards = [...symbols, ...symbols].map((symbol, index)=> ({
            id: index,
            symbol: symbol,
            isFlipped: false,
            isMatched: false
        }));

        this.state = {
            cards: this.shuffleCards(cards),
            flippedCards: [],
            moves: 0,
            matches: 0,
            isGameComplete: false
        }
    }

    shuffleCards(cards){
        const shuffled = [...cards];

        for(let i = shuffled.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }

    handleCardClick = (index) => {
        const { cards, flippedCards, isGameComplete } = this.state;

        if(isGameComplete || card[index].isMatched || cards[index].isFlipped || flippedCards.length === 2){
            return;
        }

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        const newFlippedCards = [...flippedCards, index];

        this.setState({
            cards: newCards,
            flippedCards: newFlippedCards,
            moves: this.state.moves + 1
        });

        if(newFlippedCards.length === 2){
            this.checkMatch(newFlippedCards);
        }

    }

    checkMatch(flippedCards){
        const [firstIndex, secondIndex] = flippedCards;
        const {cards} = this.state;

        setTimeout(()=>{
            const newCards = [...cards];

            if(cards[forstIndex].symbol === cards[secondIndex].symbol){
                newCards[firstIndex].isMatched = true;
                newCards[secondIndex].isMatched = true;

                const newMatches = this.state.matches + 1;
                const isGameComplete = newMatches === 8;

                this.setState({
                    cards: newCards,
                    flippedCards: [],
                    matches: newMatches,
                    isGameComplete
                });
            }else{
                newCards[firstIndex].isFlipped = false;
                newCards[secondIndex].isMatched = false;

                this.setState({
                    cards: newCards,
                    flippedCards: [],
                });
            }
        }, 1000)
    }

    resetGame = () => {
        const symbols = [Smile, Heart, Star, Sun, Moon, Cloud, Coffee, Music];
        const cards = [...symbols, ...symbols].map((symbol, index)=>({
            id: index,
            symbol: symbol,
            isFlipped: false,
            isMatched: false
        }));

        this.setState({
            cards: this.shuffleCards(cards),
            flippedCards: [],
            moves: 0,
            matches: 0,
            isGameComplete: false
        })
    }

    render(){
        const {cards, moves, matches, isGameComplete} = this.state;

        return (
            <div className='flex flex-col items-center justify-center p-8'>
                <div className='mb-6 text-center'>
                    <h1 className="text-3xl font-bold mb-4">Juego de Memoria</h1>
                    <div className='space-x-4'>
                        <span className='text-lg'>Movimientos: {moves}</span>
                        <span className='text-lg'>Parejas: {matches}/8</span>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-2 mb-6'>
                {
                    cards.map((card, index)=>{
                        <MemoryCard 
                            key={card.id}
                            isFlipped={card.isFlipped}
                            symbol={card.symbol}
                            onClick={() => this.handleCardClick}
                        />
                    })
                }
                </div>

                {isGameComplete && (
                    <div className='text-center mb-6'>
                        <h2 className='text-2xl font-bold mb-4'>Felicidades!</h2>
                        <p className='mb-4'>Has completado el juego en {moves} movimientos</p>
                    </div>
                )}

                <Button onClick={this.resetGame} className="px-6 py-2">
                    Reiniciar Juego
                </Button>
            </div>
        )
    }


}

export default MemoryGame;