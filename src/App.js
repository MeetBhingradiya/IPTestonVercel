import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [Ipify, SetIpify] = useState("");
  const [Ipdata, SetIpdata] = useState("");
  const [Cloudflare, SetCloudflare] = useState("");
  const [Geolocation, SetGeolocation] = useState("");

  const GetIpify = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    SetIpify(res.data.ip);
  };
  const GetIpdata = async () => {
    const res = await axios.get("https://api.ipdata.co?api-key=ac113b49122b96e940fdc5fb51d3eda116395d2d45fed9d0dc65d6ff");
    console.log(res.data);
    SetIpdata(res.data.ip);
  };
  const GetCloudflare = async () => {
    const Response = await axios.get("https://www.cloudflare.com/cdn-cgi/trace");
    const ResponseData = Response.data;
    const Split1 = ResponseData.split("\n");
    const Split2 = Split1.reduce(function (obj, pair) {
      pair = pair.split('=');
      obj[pair[0]] = pair[1];
      delete obj[""];
      return obj;
    }, {});
    console.log(Split2.ip);
    SetCloudflare(Split2.ip);
  };
  const GetGeolocation = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    SetGeolocation(res.data.IPv4);
  };

  useEffect(() => {
      GetIpify();
      GetCloudflare();
      GetGeolocation();
      GetIpdata();
  })


  return (
    <div className="App">
      <h2>Your IP Address is</h2>
      <h4>IPIFY : {Ipify}</h4>
      <h4>IPDATA : {Ipdata !== "" ? `${Ipdata} (Key Required)` : ""}</h4>
      <h4>Cloudflare : {Cloudflare}</h4>
      <h4>Geolocation DB : {Geolocation}</h4>
    </div>
  );
}

export default App;
