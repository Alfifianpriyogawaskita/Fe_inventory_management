import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // Pastikan import ini benar

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Kirim data login ke backend
      const res = await loginUser({ email, password });

      // 2. Simpan Token (jika ada)
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // 3. PENTING: Simpan Role yang didapat dari Backend
      // Pastikan backend Anda mengirim field 'role'. 
      // Jika backend belum siap, ubah 'res.role' menjadi string manual misal "manager" untuk tes.
      const userRole = res.role || res.user?.role || "staff"; 
      localStorage.setItem("role", userRole);

      // 4. Arahkan ke Dashboard
      // Kita tidak butuh if-else route, karena ItemTable yang akan menyesuaikan tampilan
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Login gagal! Periksa email dan password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Inventory Login</h2>

        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '15px'}}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{marginBottom: '20px'}}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} type="submit">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- STYLE (Diperbarui agar lebih rapi) ----------
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212", // Sesuaikan dengan tema dark mode
    color: "white"
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    borderRadius: "12px",
    backgroundColor: "#1e1e1e", // Card dark mode
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    border: "1px solid #333"
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontWeight: "bold",
    fontSize: "1.8rem",
    color: "#e0e0e0"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#a0a0a0",
    fontSize: "0.9rem"
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#2d2d2d",
    color: "white",
    fontSize: "1rem",
    boxSizing: "border-box", // Agar padding tidak merusak lebar
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#6366f1", // Warna Indigo (sesuai tema sebelumnya)
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "background 0.3s"
  },
  error: {
    color: "#ef4444",
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: "8px",
    borderRadius: "4px"
  },
};