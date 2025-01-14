import React from 'react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import ShoppingList from './features/shoppingList/components/ShoppingList';

function App(){
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className='max-w-3x1 mx-auto'>
          <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            Lista de Compras
          </h1>
          <ShoppingList />
        </div>
      </div>
    </Provider>
  )
}

export default App;