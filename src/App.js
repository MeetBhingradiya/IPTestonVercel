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
    const res = await axios.get("https://api.ipdata.co?api-key=be0f755b93290b4c100445d77533d291763a417c75524e95e07819ad");
    console.log(res.data);
    SetIpify(res.data.ip);
  };
  const GetCloudflare = async () => {
    const res = await axios.get("https://www.cloudflare.com/cdn-cgi/trace");
    const ResponseData = Response.data;
    const Split1 = ResponseData.split("\n");
    const Split2 = Split1.reduce(function (obj, pair) {
      pair = pair.split('=');
      obj[pair[0]] = pair[1];
      delete obj[""];
      return obj;
    }, {});
    console.log(res.data);
    SetIpify(Split2.ip);
  };
  const GetGeolocation = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    SetIpify(res.data.ip);
  };

  useEffect(() => {
    GetIpify().then(() => {
      GetCloudflare();
    }).then(()=>{
      GetGeolocation();
    }).then(()=>{
      GetIpdata();
    })
  })


  return (
    <div className="App">
      <h2>Your IP Address is</h2>
      <h4>IPIFY : {Ipify}</h4>
      <h4>IPDATA : {Ipdata}</h4>
      <h4>Cloudflare : {Cloudflare}</h4>
      <h4>Geolocation DB : {Geolocation}</h4>
    </div>
  );
}

export default App;
