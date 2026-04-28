import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/api/auth/login", form);
      localStorage.setItem("hrm_token", res.data.token);
      localStorage.setItem("hrm_employee", JSON.stringify(res.data.employee));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Rise Next HRM</h1>
          <p style={styles.subtitle}>Employee Portal Login</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p style={styles.hint}>
          Default password for new employees: <strong>Employee@123</strong>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0d6efd 0%, #0056d3 100%)",
    fontFamily: "sans-serif"
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
  },
  header: { textAlign: "center", marginBottom: "28px" },
  title: { margin: "0 0 6px", fontSize: "28px", color: "#0d6efd" },
  subtitle: { margin: 0, color: "#666", fontSize: "15px" },
  error: {
    background: "#fff0f0",
    border: "1px solid #ffcccc",
    color: "#cc0000",
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px"
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontWeight: "600", fontSize: "14px", color: "#333" },
  input: {
    padding: "12px 14px",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  btn: {
    padding: "13px",
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "4px"
  },
  hint: { textAlign: "center", fontSize: "12px", color: "#888", marginTop: "20px" }
};
