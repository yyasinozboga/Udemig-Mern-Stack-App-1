import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { login } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("jwt") || token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const values = Object.fromEntries(new FormData(form).entries());

    const { email, password } = values;

    if (isLogged) {
      dispatch(
        login({
          email: email as string,
          password: password as string,
        }),
      );
    }

    navigate("/");
  };

  return (
    <div className="modal">
      <h1 className="text-2xl font-bold uppercase text-indigo-600">
        {isLogged ? "Log in" : "Sign Up"}
      </h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {!isLogged && (
          <input
            placeholder="Username"
            className="input"
            name="username"
            required
          />
        )}
        <input
          placeholder="Email"
          type="email"
          className="input"
          name="email"
          required
        />
        <input
          placeholder="Password"
          type="password"
          className="input"
          name="password"
          required
        />
        <button
          type="button"
          onClick={() => setIsLogged(!isLogged)}
          className="text-indigo-600 text-end font-medium cursor-pointer"
        >
          {isLogged
            ? "You don't have an account?"
            : "You already have an account?"}
        </button>
        <button type="submit" className="btn">
          {isLogged ? "Log in" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
