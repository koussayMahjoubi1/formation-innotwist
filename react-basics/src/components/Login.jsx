import { useState } from "react";

const API_URL = "http://localhost:3000/api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setMessage(`Login successful! Welcome ${data.user.email}`);
        setEmail("");
        setPassword("");
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Network error. Make sure the backend server is running.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Registration successful! Please login.`);
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Network error. Make sure the backend server is running.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Login / Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem", margin: "0.5rem", minWidth: "250px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{ padding: "0.5rem", margin: "0.5rem", minWidth: "250px" }}
        />
        <br />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: "0.5rem 1rem", 
            marginTop: "1rem",
            marginRight: "0.5rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <button 
          type="button"
          onClick={handleRegister}
          disabled={isLoading}
          style={{ 
            padding: "0.5rem 1rem", 
            marginTop: "1rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      {message && (
        <div style={{ 
          marginTop: "1rem", 
          padding: "0.5rem",
          color: message.includes("success") ? "green" : "red",
          fontWeight: "bold"
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;