import { useState } from 'react';
import { Settings, Package, CreditCard, User as UserIcon, Plus, PenSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { ProtectedRoute } from '@/components/auth/protected-route';

type TabType = 'profile' | 'orders' | 'payment' | 'settings'| 'products';

// Mock order data
const orders = [
  {
    id: '1',
    date: '2024-03-15',
    total: 349.97,
    status: 'Delivered',
    items: [
      { name: 'Minimalist Leather Watch', quantity: 1, price: 149.99 },
      { name: 'Wireless Earbuds', quantity: 1, price: 199.98 },
    ],
  },
  {
    id: '2',
    date: '2024-03-01',
    total: 89.99,
    status: 'Processing',
    items: [
      { name: 'Premium Backpack', quantity: 1, price: 89.99 },
    ],
  },
];

interface ProductFormData {
  id: any;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

const initialProductForm: ProductFormData = {
  id: '',
  name: '',
  price: '',
  description: '',
  category: '',
  image: '',
};

export function AccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: user?.FirstName || '',
    lastName: user?.FirstName || '',
    email: user?.Email || '',
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState<ProductFormData>(initialProductForm);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, update profile in backend
    setIsEditing(false);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the product data to your API
    console.log('Product form submitted:', productForm);
    setProductForm(initialProductForm);
    setShowProductForm(false);
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'profile'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <UserIcon className="h-5 w-5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'orders'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Package className="h-5 w-5" />
                Orders
              </button>
              {user?.is_staff === true && (
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
                    activeTab === 'products'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Products
                </button>
             )}  
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'payment'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'settings'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5" />
                Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="mt-8 lg:mt-0 lg:col-span-9">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    {isEditing ? (
                      <div className="flex gap-4">
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              Total: ${order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">Status: {order.status}</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4">
                        <ul className="divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <li key={index} className="py-4 flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ${item.price.toFixed(2)}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
{/* make that only businesses => && user?.role === 'business' */}
            {activeTab === 'products' && user?.is_staff === true  && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                  <Button onClick={() => setShowProductForm(true)}>
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Product
                  </Button>
                </div>

                {showProductForm ? (
                  <div className="bg-white border rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {productForm.id ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            id="price"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          id="category"
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="accessories">Accessories</option>
                          <option value="home">Home & Living</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                          Image URL
                        </label>
                        <input
                          type="url"
                          id="image"
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          placeholder="https://example.com/image.jpg"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit">
                          {productForm.id ? 'Update Product' : 'Add Product'}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => {
                          setProductForm(initialProductForm);
                          setShowProductForm(false);
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Example product row */}
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Minimalist Leather Watch</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Accessories</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">$149.99</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" className="mr-2">
                              <PenSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}  

            {activeTab === 'payment' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
                <div className="bg-white border rounded-lg p-6">
                  <p className="text-gray-600">No payment methods saved yet.</p>
                  <Button className="mt-4">Add Payment Method</Button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                    <Button>Change Password</Button>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Email me about order updates
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Email me about promotions and news
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                    <Button variant="ghost" className="text-red-600 hover:text-red-500">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}