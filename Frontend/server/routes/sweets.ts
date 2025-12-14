import { RequestHandler } from "express";

export interface Sweet {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
}

// In-memory storage for sweets
let sweets: Sweet[] = [];

// Initialize with some default sweets
function initializeSweets() {
  if (sweets.length === 0) {
    sweets = [
      {
        id: "sweet_001",
        name: "Gulab Jamun",
        description: "Soft milk solids dumplings in sugar syrup",
        price: 250,
        quantity: 50,
        category: "Traditional Sweets",
        createdAt: new Date().toISOString(),
      },
      {
        id: "sweet_002",
        name: "Barfi",
        description: "Milk-based fudge sweet",
        price: 300,
        quantity: 30,
        category: "Premium Sweets",
        createdAt: new Date().toISOString(),
      },
      {
        id: "sweet_003",
        name: "Laddu",
        description: "Round shaped sweet made from flour and ghee",
        price: 200,
        quantity: 75,
        category: "Classic Flavors",
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

initializeSweets();

// GET all sweets
export const handleGetSweets: RequestHandler = (_req, res) => {
  res.json(sweets);
};

// GET a specific sweet by ID
export const handleGetSweet: RequestHandler = (req, res) => {
  const { id } = req.params;
  const sweet = sweets.find((s) => s.id === id);

  if (!sweet) {
    res.status(404).json({ error: "Sweet not found" });
    return;
  }

  res.json(sweet);
};

// POST - Add a new sweet
export const handleCreateSweet: RequestHandler = (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  if (!name || !description || !price || quantity === undefined || !category) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newSweet: Sweet = {
    id: `sweet_${Date.now()}`,
    name,
    description,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    category,
    createdAt: new Date().toISOString(),
  };

  sweets.push(newSweet);
  res.status(201).json(newSweet);
};

// PUT - Update a sweet's details
export const handleUpdateSweet: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;

  const sweetIndex = sweets.findIndex((s) => s.id === id);

  if (sweetIndex === -1) {
    res.status(404).json({ error: "Sweet not found" });
    return;
  }

  const updatedSweet: Sweet = {
    ...sweets[sweetIndex],
    name: name || sweets[sweetIndex].name,
    description: description || sweets[sweetIndex].description,
    price: price !== undefined ? parseFloat(price) : sweets[sweetIndex].price,
    quantity:
      quantity !== undefined ? parseInt(quantity) : sweets[sweetIndex].quantity,
    category: category || sweets[sweetIndex].category,
  };

  sweets[sweetIndex] = updatedSweet;
  res.json(updatedSweet);
};

// DELETE - Delete a sweet (Admin only)
export const handleDeleteSweet: RequestHandler = (req, res) => {
  const { id } = req.params;

  const sweetIndex = sweets.findIndex((s) => s.id === id);

  if (sweetIndex === -1) {
    res.status(404).json({ error: "Sweet not found" });
    return;
  }

  const deletedSweet = sweets.splice(sweetIndex, 1)[0];
  res.json({ message: "Sweet deleted successfully", sweet: deletedSweet });
};

// POST - Restock a sweet (Admin only)
export const handleRestockSweet: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity === undefined || quantity <= 0) {
    res.status(400).json({ error: "Quantity must be a positive number" });
    return;
  }

  const sweet = sweets.find((s) => s.id === id);

  if (!sweet) {
    res.status(404).json({ error: "Sweet not found" });
    return;
  }

  sweet.quantity += parseInt(quantity);
  res.json({ message: "Sweet restocked successfully", sweet });
};
