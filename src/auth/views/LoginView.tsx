import { useLogin } from "src/auth/hooks/useLogin.ts";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "src/constants/routes.constants.ts";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export const LoginView = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login } = useLogin();

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(
      {
        data: {
          email: email,
          password: password,
        },
      },
      {
        onSuccess: () => {
          navigate(adminRoute);
        },
      },
    );
  };
  return (
    <div>
      <div>Login</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};
