import { useState, useEffect } from "react";
import axios from "axios";

const GetIpify = async (SetData) => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    SetData(res.data.ip);
};
const GetIpdata = async (SetData,ip) => {
    const res = await axios.get(`https://api.ipdata.co/${ip ? ip : ""}?api-key=${process.env.REACT_APP_IPDATA_API_KEY}`);
    SetData(res.data.ip);
};
const GetCloudflare = async (SetData) => {
    const Response = await axios.get("https://www.cloudflare.com/cdn-cgi/trace");
    const ResponseData = Response.data;
    const Split1 = ResponseData.split("\n");
    const Split2 = Split1.reduce(function (obj, pair) {
        pair = pair.split('=');
        obj[pair[0]] = pair[1];
        delete obj[""];
        return obj;
    }, {});
    SetData(Split2.ip);
};
const GetGeolocation = async (SetData) => {
    const res = await axios.get("https://geolocation-db.com/json/");
    SetData(res.data.IPv4);
};

function App() {
    const [Ipify, SetIpify] = useState("");
    const [Ipdata, SetIpdata] = useState("");
    const [Cloudflare, SetCloudflare] = useState("");
    const [Geolocation, SetGeolocation] = useState("");

    useEffect(() => { GetCloudflare(SetCloudflare) },[])
    useEffect(() => { GetIpdata(SetIpdata) },[])
    useEffect(() => { GetIpify(SetIpify) },[])
    useEffect(() => { GetGeolocation(SetGeolocation) },[])

    return (
        <div className="App">
            <h2>Your IP Address is</h2>
            <h4>IPIFY : {Ipify}</h4>
            <h4>IPDATA : {Ipdata !== "" ? `${Ipdata}` : ""}</h4>
            <h4>Cloudflare : {Cloudflare}</h4>
            <h4>Geolocation DB : {Geolocation}</h4>
        </div>
    );
}

export default App;
