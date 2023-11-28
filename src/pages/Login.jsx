import { Form, Link } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";

export const action =
  ({ dispatch, loginUser }) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/login", data);
      dispatch(loginUser(response.data));
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      toast.success(`Welcome back ${response.data.user.name || "user"}`);
      return null;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "please double check your credentials";

      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
