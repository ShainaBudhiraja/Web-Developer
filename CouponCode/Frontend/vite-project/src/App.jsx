import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/register", {
        email
      });

      setMessage(res.data.message);
      setCoupon(res.data.coupon);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
      setCoupon("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Coupon Generator</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", width: "250px" }}
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>

      <h3>{message}</h3>

      {coupon && (
        <h2>{coupon}</h2>
      )}
    </div>
  );
}

export default App;