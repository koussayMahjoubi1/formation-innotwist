import { useState } from "react";

const endpoints = [
  { name: "/product", url: "http://localhost:3000/product", status: 200 },
  { name: "/user", url: "http://localhost:3000/user", status: 200 },
  { name: "/health", url: "http://localhost:3000/health", status: 200 },
  { name: "/notfound", url: "http://localhost:3000/notfound", status: 404 }
];

function EndpointTester() {
  const [popup, setPopup] = useState(null);

  const testEndpoint = async (ep) => {
    try {
      const res = await fetch(ep.url);
      setPopup({ success: res.status === 200, msg: ` ${ep.name} - ${res.status} OK` });
      setTimeout(() => setPopup(null), 3000);
    } catch {
      setPopup({ success: false, msg: ` ${ep.name} - Error` });
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "2rem auto", minHeight: "400px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#1f2937", fontSize: "2rem" }}>
        Endpoint Tester</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {endpoints.map((ep) => (
          <button
            key={ep.name}
            onClick={() => testEndpoint(ep)}
            style={{
              padding: "1.5rem",
              background: ep.status === 200 ? 
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
              "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1.1rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            {ep.name}
          </button>
        ))}
      </div>
      {popup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: popup.success ? "#10b981" : "#ef4444",
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 1000,
            fontSize: "1rem",
            fontWeight: 600
          }}
        >
          {popup.msg}
        </div>
      )}
    </div>
  );
}

export default EndpointTester;

