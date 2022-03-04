import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Booking = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/${serviceId}`)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err));
  }, [serviceId]);
  const { firstName: name, price, description, img } = service;
  return (
    <div className="bg-warning p-5 rounded">
      <h2>This is booking: {name}</h2>
      <p>Price: {price}</p>
      <h2> {description}</h2>
      <img src={img} alt={description} className="img-fluid rounded" />
    </div>
  );
};

export default Booking;
