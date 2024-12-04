import { useReducer } from 'react';
import { InventoryItem, InventoryAction } from '../types/inventory';

const inventoryReducer = (state: InventoryItem[], action: InventoryAction): InventoryItem[] => {
  switch (action.type) {
    case 'INCREMENT':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREMENT':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      );
    case 'UPDATE':
      return state.map(item =>
        item.id === action.item.id ? action.item : item
      );
    case 'ADD':
      const newId = (Math.max(...state.map(item => parseInt(item.id)), 0) + 1).toString();
      return [...state, { ...action.item, id: newId, dateOut: null }];
    case 'DELETE':
      return state.filter(item => item.id !== action.id);
    case 'SET_LOCATION':
      return state.map(item =>
        item.id === action.id ? { ...item, location: action.location } : item
      );
    case 'SET_STATUS':
      return state.map(item =>
        item.id === action.id ? { ...item, status: action.status } : item
      );
    default:
      return state;
  }
};

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    productName: 'DJI Mavic 3 Pro',
    quantity: 5,
    dateIn: '2024-03-15',
    dateOut: null,
    category: 'Drones',
    price: 1599.99,
    serialNumber: 'DJI-M3P-001',
    manufacturer: 'DJI',
    description: 'Professional drone with Hasselblad camera',
    minimumStock: 2,
    location: 'Main Warehouse',
    status: 'Available'
  },
  {
    id: '2',
    productName: 'Intelligent Flight Battery',
    quantity: 10,
    dateIn: '2024-03-14',
    dateOut: null,
    category: 'Batteries',
    price: 199.99,
    serialNumber: 'DJI-BAT-002',
    manufacturer: 'DJI',
    description: 'High-capacity smart battery for Mavic series',
    minimumStock: 5,
    location: 'Storage Room B',
    status: 'In Stock'
  }
];

export const useInventory = () => {
  const [inventory, dispatch] = useReducer(inventoryReducer, initialInventory);
  return { inventory, dispatch };
};