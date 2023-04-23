import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [ip, setIP] = useState("");

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h2>Your IP Address is</h2>
      <h4>{ip}</h4>
    </div>
  );
}

export default App;
