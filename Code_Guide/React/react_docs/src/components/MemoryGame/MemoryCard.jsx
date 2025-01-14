import React, {Component} from 'react';
import { Card} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

class MemoryCard extends Component {
    render(){
        const {isFlipped, symbol, onClick} = this.props;

        return (
            <div 
                onClick={onClick}
                className={`w-24 h-24 m-2 cursor-pointer`}
            >
                <div className="w-full h-full rounded-lg shadow-md transition-all duration-300">
                    {isFlipped ? (
                        <div className="w-full h-full bg-white flex items-center justify-center rounded-lg border-2 border-blue-300">
                            {React.createElement(symbol, {size: 40})}
                        </div>
                    ) : <div className='w-full h-full bg-blue-200 rounded-lg hover:bg-blue-300 transition-colors'></div>} 
                </div>
            </div>
        )
    }
}



export default MemoryCard;