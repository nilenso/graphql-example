import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";

const SignUp = () => {
  return (
    <div className="hero min-h-screen">
      <div className="text-center">
        <h1 className="mb-5 text-5xl font-bold">Sign Up</h1>
        <TextInput label="Email" placeholder="Email" />
        <TextInput label="Password" placeholder="Password" />
        <Link to="/">
          <button className="btn btn-secondary btn-wide m-5">Back</button>
        </Link>
        <button className="btn btn-primary btn-wide m-5">Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
