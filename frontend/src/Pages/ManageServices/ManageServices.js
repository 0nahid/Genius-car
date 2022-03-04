import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

  //   handle delete service
  const handleDelete = (_id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      fetch(`http://localhost:5000/services/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            Swal.fire("Oops!", "User has been deleted", "warning");
            setServices(services.filter((service) => service._id !== _id));
          }
        });
    }
  };
  return (
    <div className="container">
      <h1>Manage Services </h1>
      {services.map((service) => (
        <div key={service._id} className="bg-dark text-white p-3 mt-3">
          <h1>{service.firstName}</h1>
          <button
            onClick={() => handleDelete(service._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
