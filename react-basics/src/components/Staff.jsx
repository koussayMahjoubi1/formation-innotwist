import { useEffect, useState } from "react";

const STORAGE_KEY = "staff";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStaff(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading staff:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staff));
  }, [staff]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setMessage("All fields are required");
      return;
    }

    if (editingId) {
      const updated = staff.map((s) =>
        s.id === editingId
          ? { ...s, name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim() }
          : s
      );
      setStaff(updated);
      setMessage("Updated successfully");
      resetForm();
    } else {
      const newMember = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        createdAt: new Date().toISOString()
      };
      setStaff([...staff, newMember]);
      setMessage("Added successfully");
      resetForm();
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setName(member.name);
    setEmail(member.email);
    setPhone(member.phone);
    setAddress(member.address);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this staff member?")) return;
    const filtered = staff.filter((s) => s.id !== id);
    setStaff(filtered);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Staff Management</h2>

      <form onSubmit={handleSubmit} style={{
        background: "#f9fafb",
        padding: "1.5rem",
        borderRadius: "12px",
        marginBottom: "2rem"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db" }}
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="submit"
            style={{
              background: editingId ? "#f59e0b" : "#10b981",
              color: "white",
              border: "none",
              padding: "0.6rem 1.5rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            {editingId ? "Update" : "Add Staff"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                background: "#6b7280",
                color: "white",
                border: "none",
                padding: "0.6rem 1.5rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && (
        <div style={{ textAlign: "center", color: message.includes("successfully") ? "#065f46" : "#b91c1c", marginBottom: "1rem", fontWeight: 600 }}>
          {message}
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem"
      }}>
        {staff.map((s) => (
          <div key={s.id} style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            padding: "1.2rem",
            border: "1px solid #e5e7eb"
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
              {s.name}
            </h3>
            <div style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
              📧 {s.email}
            </div>
            <div style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
              📱 {s.phone}
            </div>
            <div style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "1rem" }}>
              📍 {s.address}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleEdit(s)}
                style={{
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {staff.length === 0 && (
          <div style={{ textAlign: "center", color: "#6b7280", gridColumn: "1 / -1", padding: "2rem" }}>
            No staff members yet. Add your first one above.
          </div>
        )}
      </div>
    </div>
  );
}

export default Staff;

