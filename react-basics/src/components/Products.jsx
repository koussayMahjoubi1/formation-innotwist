import { useEffect, useState } from "react";

const STORAGE_KEY = "products";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Load products from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading products:", e);
      }
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !description.trim()) {
      setMessage("Name and description are required");
      return;
    }

    if (editingId) {
      // Update existing product
      const updated = products.map((p) =>
        p.id === editingId
          ? { ...p, name: name.trim(), description: description.trim() }
          : p
      );
      setProducts(updated);
      setMessage("Updated successfully");
      resetForm();
    } else {
      // Create new product
      const newProduct = {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString()
      };
      setProducts([...products, newProduct]);
      setMessage("Created successfully");
      resetForm();
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this product?")) return;
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Products</h2>

      <form onSubmit={handleSubmit} style={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        marginBottom: "1.5rem",
        flexWrap: "wrap"
      }}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "0.6rem 0.8rem", minWidth: "240px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: "0.6rem 0.8rem", minWidth: "320px" }}
        />
        <button
          type="submit"
          style={{
            background: editingId ? "#f59e0b" : "#10b981",
            color: "white",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          {editingId ? "Save" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              background: "#6b7280",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {message && (
        <div style={{ textAlign: "center", color: message.includes("successfully") ? "#065f46" : "#b91c1c", marginBottom: "1rem", fontWeight: 600 }}>
          {message}
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1rem"
      }}>
        {products.map((p) => (
          <div key={p.id} style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: "1rem 1.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            border: "1px solid #f3f4f6"
          }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>{p.name}</div>
            <div style={{ color: "#4b5563" }}>{p.description}</div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button
                onClick={() => handleEdit(p)}
                style={{
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 0.9rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 0.9rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div style={{ textAlign: "center", color: "#6b7280", gridColumn: "1 / -1" }}>
            No products yet. Add your first one above.
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
