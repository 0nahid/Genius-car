import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./AddService.css";

export default function AddService() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/services", data)
      .then((res) => {
        if (res.data.insertedId) {
          // shows sweet alert
          Swal.fire("Good job!", "User added to database!", "success");
          data.target.reset();
        } else {
          Swal.fire("Oops!", "Something went wrong!", "error");
        }
      })
      .catch((err) => console.log(err));
      reset();
  };
  return (
    <div className="add-user">
      <h1>Please add a service</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register("firstName", { required: true, maxLength: 20 })}
        />
        <textarea placeholder="Description" {...register("description")} />
        <input placeholder="Price" type="number" {...register("price")} />
        <input placeholder="Enter Image url" {...register("img")} />
        <input type="submit" />
      </form>
    </div>
  );
}
