import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("First Name is Required")
    .min(3, "Minimum 3 Characters"),
  lastname: yup
    .string()
    .required("Last Name is Required")
    .min(3, "Minimum 3 Characters"),
  email: yup.string().required("Email is required").email("Email is In-Valid"),
  age: yup
    .string()
    .required("Age is Required")
    .matches(/^[0-9]*$/, "Must be number"),
  password: yup
    .string()
    .required("Password is Required")
    .min(5, "Minimum 5 Characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      "Password is not strong"
    ),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandle = (data) => {
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="col-6 offset-3 shadow p-5">
        <h1 className="text-primary text-center">Signup Form</h1>
        <form onSubmit={handleSubmit(submitHandle)}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              {...register("firstname")}
              className="form-control"
              placeholder="Enter First Name"
            />
            <small className="form-text text-danger">
              {errors?.firstname?.message}
            </small>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              {...register("lastname")}
              className="form-control"
              placeholder="Enter Last Name"
            />
            <small className="form-text text-danger">
              {errors?.lastname?.message}
            </small>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              {...register("email")}
              className="form-control"
              placeholder="Enter Email"
            />
            <small className="form-text text-danger">
              {errors?.email?.message}
            </small>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              {...register("age")}
              className="form-control"
              placeholder="Enter Age"
            />
            <small className="form-text text-danger">
              {errors?.age?.message}
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              autoComplete="false"
              {...register("password")}
              className="form-control"
              placeholder="Enter Password"
            />
            <small className="form-text text-danger">
              {errors?.password?.message}
            </small>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              autoComplete="false"
              {...register("cpassword")}
              className="form-control"
              placeholder="Enter Confirm Password"
            />
            <small className="form-text text-danger">
              {errors?.cpassword?.message}
            </small>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              {...register("subscribe")}
              className="form-check-input"
            />
            <label className="form-check-label">Subscribe News Letter</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
