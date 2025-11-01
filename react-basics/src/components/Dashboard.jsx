import { useEffect } from "react";

function Dashboard() {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        padding: "3rem",
        maxWidth: "500px",
        width: "100%",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "4rem",
          marginBottom: "1rem"
        }}>
          👋
        </div>
        <h1 style={{
          fontSize: "2.5rem",
          color: "#333",
          margin: "0 0 0.5rem 0",
          fontWeight: "600"
        }}>
          Welcome!
        </h1>
        <p style={{
          fontSize: "1.2rem",
          color: "#667eea",
          margin: "0 0 2rem 0",
          fontWeight: "500"
        }}>
          {user.email || "User"}
        </p>
        <div style={{
          padding: "1.5rem",
          background: "#f7f7f7",
          borderRadius: "10px",
          marginBottom: "2rem"
        }}>
          <p style={{
            color: "#666",
            margin: 0,
            fontSize: "1rem"
          }}>
            You have successfully logged in to your account.
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "#667eea",
            color: "white",
            border: "none",
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#5568d3";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#667eea";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

