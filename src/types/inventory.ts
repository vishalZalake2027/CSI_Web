export interface InventoryItem {
  id: string;
  productName: string;
  quantity: number;
  dateIn: string;
  dateOut: string | null;
  category: string;
  price: number;
  serialNumber?: string;
  manufacturer: string;
  description: string;
  minimumStock: number;
  location: string;
  status: string;
}

export type InventoryAction = 
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'UPDATE'; item: InventoryItem }
  | { type: 'ADD'; item: Omit<InventoryItem, 'id' | 'dateOut'> }
  | { type: 'DELETE'; id: string }
  | { type: 'SET_LOCATION'; id: string; location: string }
  | { type: 'SET_STATUS'; id: string; status: string };