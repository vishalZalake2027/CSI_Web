import React from 'react';
import { Plus, Minus, RefreshCw, Trash2, MapPin } from 'lucide-react';
import { InventoryItem } from '../types/inventory';
import { formatToINR } from '../utils/currency';

interface InventoryTableProps {
  inventory: InventoryItem[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onUpdate: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  onLocationChange: (id: string, location: string) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  inventory,
  onIncrement,
  onDecrement,
  onUpdate,
  onDelete,
  onLocationChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Info</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (INR)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium">{item.productName}</span>
                  <span className="text-sm text-gray-500">{item.manufacturer}</span>
                  {item.serialNumber && (
                    <span className="text-xs text-gray-400">SN: {item.serialNumber}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4">
                <div className="max-w-xs overflow-hidden text-sm text-gray-500">
                  {item.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`${
                  item.quantity <= item.minimumStock ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {item.quantity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{formatToINR(item.price)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => onLocationChange(item.id, e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={item.status}
                  onChange={(e) => onUpdate({ ...item, status: e.target.value })}
                  className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="On Order">On Order</option>
                  <option value="Reserved">Reserved</option>
                  <option value="In Maintenance">In Maintenance</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => onIncrement(item.id)}
                  className="p-1 hover:bg-green-100 rounded-full"
                  title="Increase quantity"
                >
                  <Plus className="w-5 h-5 text-green-600" />
                </button>
                <button
                  onClick={() => onDecrement(item.id)}
                  className="p-1 hover:bg-red-100 rounded-full"
                  title="Decrease quantity"
                >
                  <Minus className="w-5 h-5 text-red-600" />
                </button>
                <button
                  onClick={() => {
                    const dateOut = item.dateOut ? null : new Date().toISOString().split('T')[0];
                    onUpdate({ ...item, dateOut });
                  }}
                  className="p-1 hover:bg-blue-100 rounded-full"
                  title="Update date out"
                >
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1 hover:bg-red-100 rounded-full"
                  title="Delete item"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};