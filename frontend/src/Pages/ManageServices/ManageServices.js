import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => {
        setServices(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <h1>Manage Services </h1>
      {services.map((service) => (
        <div key={service._id} className="bg-dark text-white p-3 mt-3">
          <h1>{service.firstName}</h1>
          <button className="btn btn-danger">Delete</button>
        </div>
      ))}
    </div>
  );
}
