import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import SweetForm from "./SweetForm";
import RestockModal from "./RestockModal";

export interface Sweet {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
}

export default function SweetsManagement() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [restockingSweet, setRestockingSweet] = useState<Sweet | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch sweets on mount
  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sweets");
      const data = await response.json();
      setSweets(data);
    } catch (error) {
      toast.error("Failed to fetch sweets");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) {
      return;
    }

    try {
      const response = await fetch(`/api/sweets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setSweets(sweets.filter((s) => s.id !== id));
      toast.success("Sweet deleted successfully");
    } catch (error) {
      toast.error("Failed to delete sweet");
      console.error(error);
    }
  };

  const handleSaveSweet = async (formData: Omit<Sweet, "id" | "createdAt">) => {
    try {
      if (editingSweet) {
        // Update existing sweet
        const response = await fetch(`/api/sweets/${editingSweet.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update");

        const updated = await response.json();
        setSweets(sweets.map((s) => (s.id === updated.id ? updated : s)));
        toast.success("Sweet updated successfully");
      } else {
        // Create new sweet
        const response = await fetch("/api/sweets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to create");

        const newSweet = await response.json();
        setSweets([...sweets, newSweet]);
        toast.success("Sweet added successfully");
      }

      setShowForm(false);
      setEditingSweet(null);
    } catch (error) {
      toast.error(
        editingSweet ? "Failed to update sweet" : "Failed to add sweet"
      );
      console.error(error);
    }
  };

  const handleRestock = async (quantity: number) => {
    if (!restockingSweet) return;

    try {
      const response = await fetch(`/api/sweets/${restockingSweet.id}/restock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error("Failed to restock");

      const updated = await response.json();
      setSweets(sweets.map((s) => (s.id === updated.sweet.id ? updated.sweet : s)));
      toast.success(`Restocked ${quantity} units`);
      setShowRestockModal(false);
      setRestockingSweet(null);
    } catch (error) {
      toast.error("Failed to restock sweet");
      console.error(error);
    }
  };

  const filteredSweets = sweets.filter(
    (sweet) =>
      sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-10">Loading sweets...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <RefreshCw className="text-purple-500" />
          Sweets Management
        </h2>
        <button
          onClick={() => {
            setEditingSweet(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
        >
          <Plus size={18} />
          Add Sweet
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Sweets Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Price
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Quantity
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSweets.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No sweets found. Add one to get started!
                </td>
              </tr>
            ) : (
              filteredSweets.map((sweet) => (
                <tr
                  key={sweet.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{sweet.name}</p>
                      <p className="text-sm text-gray-600 truncate">
                        {sweet.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {sweet.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    ₹{sweet.price}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {sweet.quantity}
                      </span>
                      {sweet.quantity < 20 && (
                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                          LOW
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        sweet.quantity > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sweet.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingSweet(sweet);
                          setShowForm(true);
                        }}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setRestockingSweet(sweet);
                          setShowRestockModal(true);
                        }}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                        title="Restock"
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(sweet.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      {filteredSweets.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-600">Total Sweets</p>
            <p className="text-2xl font-bold text-gray-900">
              {filteredSweets.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Quantity</p>
            <p className="text-2xl font-bold text-gray-900">
              {filteredSweets.reduce((sum, s) => sum + s.quantity, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹
              {filteredSweets.reduce((sum, s) => sum + s.price * s.quantity, 0)}
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <SweetForm
          sweet={editingSweet}
          onClose={() => {
            setShowForm(false);
            setEditingSweet(null);
          }}
          onSave={handleSaveSweet}
        />
      )}

      {showRestockModal && restockingSweet && (
        <RestockModal
          sweet={restockingSweet}
          onClose={() => {
            setShowRestockModal(false);
            setRestockingSweet(null);
          }}
          onRestock={handleRestock}
        />
      )}
    </div>
  );
}
