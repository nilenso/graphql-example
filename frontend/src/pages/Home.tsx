import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero min-h-screen">
      <div className="text-center">
        <h1 className="mb-5 text-5xl font-bold">GraphQL Example App</h1>
        <Link to="/login">
          <button className="m-5 btn btn-wide btn-secondary">Login</button>
        </Link>
        <Link to="/sign-up">
          <button className="m-5 btn btn-wide btn-primary">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
