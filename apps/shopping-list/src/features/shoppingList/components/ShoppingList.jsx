import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addItem, toggleInCart, removeItem} from '../shoppingListSlice';

const ShoppingList = () => {
    const [newItem, setNewItem] = useState('');
    const items = useSelector(state => state.shoppingList);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newItem.trim()){
            dispatch(addItem(newItem.trim()));
            setNewItem('');
        }
    };

    const peddingItems = items.filter(item => !item.inCart);
    const completedItems = items.filter(item => item.inCart);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className='mb-6'>
                <div className='flex gap-2'>
                    <input 
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder='Agregar nuevo producto...'
                        className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    />
                    <button type='submit'
                        className='bg-blue-50 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none'>
                        Agregar
                    </button>
                </div>
            </form>

            <div className='space-y-6'>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Por Comprar</h2>
                    <ul className="space-y-2">
                        {peddingItems.map(item => (
                            <li key={item.id} className='flex items-center gap-2 p-2 hover:bg-gray-50'>
                                <input 
                                    type="checkbox"
                                    checked={item.inCart}
                                    onChange={() => dispatch(toggleInCart(item.id))}
                                    className='h-5 w-5 text-blue-500'
                                />
                                <span className='flex-1'>{item.name}</span>
                                <button onClick={()=> dispatch(removeItem(item.id))} 
                                    className='text-red-500 hover:text-red-700'>
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {completedItems.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">En el Carrito</h2>
                    <ul className="space-y-2">
                        {completedItems.map(item => (
                            <li key={item.id} className='flex items-center gap-2 p-2 hover:bg-gray-50 bg-gray-50'>
                                <input 
                                    type="checkbox"
                                    checked={item.inCart}
                                    onChange={() => dispatch(toggleInCart(item.id))}
                                    className='h-5 w-5 text-blue-500'
                                />
                                <span className='flex-1 line-through text-gray-500'>{item.name}</span>
                                <button onClick={()=>dispatch(removeItem(item.id))}
                                    className='text-red-500 hover:text-red-700'>
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ShoppingList;