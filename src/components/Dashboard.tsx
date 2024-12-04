import React from 'react';
import { BarChart3, Package, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { InventoryItem } from '../types/inventory';
import { formatToINR } from '../utils/currency';

interface DashboardProps {
  inventory: InventoryItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({ inventory }) => {
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(item => item.quantity <= item.minimumStock);
  const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Package className="h-8 w-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Items</p>
            <p className="text-2xl font-semibold text-gray-900">{totalItems}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p className="text-2xl font-semibold text-gray-900">{lowStockItems.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Value</p>
            <p className="text-2xl font-semibold text-gray-900">{formatToINR(totalValue)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <ArrowUpDown className="h-8 w-8 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Transactions</p>
            <p className="text-2xl font-semibold text-gray-900">
              {inventory.filter(item => item.dateOut === null).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};