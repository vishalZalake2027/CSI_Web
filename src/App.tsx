import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { InventoryTable } from './components/InventoryTable';
import { AddProductForm } from './components/AddProductForm';
import { useInventory } from './hooks/useInventory';

function App() {
  const { inventory, dispatch } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = inventory.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Dashboard inventory={inventory} />
        
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <AddProductForm
              onAdd={(product) => dispatch({ type: 'ADD', item: product })}
            />
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <InventoryTable
              inventory={filteredInventory}
              onIncrement={(id) => dispatch({ type: 'INCREMENT', id })}
              onDecrement={(id) => dispatch({ type: 'DECREMENT', id })}
              onUpdate={(item) => dispatch({ type: 'UPDATE', item })}
              onDelete={(id) => dispatch({ type: 'DELETE', id })}
              onLocationChange={(id, location) => dispatch({ type: 'SET_LOCATION', id, location })}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;