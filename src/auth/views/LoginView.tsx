import { useLogin } from "src/auth/hooks/useLogin.ts";
import { useNavigate } from "react-router-dom";
import { adminRoutePath } from "src/admin/admin.constants.ts";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export const LoginView = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [hasError, setHasError] = useState(false);

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
          navigate(adminRoutePath);
        },
        onError: () => {
          setHasError(true);
        },
      },
    );
  };
  return (
    <div style={rootStyles}>
      <div>Login</div>
      <div>
        <form style={formStyles} onSubmit={handleSubmit}>
          <div style={controlStyle}>
            <input
              value={email}
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
            />
            {hasError && <span style={errorStyle}>Not found</span>}
          </div>
          <div style={controlStyle}>
            <input
              value={password}
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

const errorStyle = {
  fontSize: 12,
  color: "red",
} as const;

const controlStyle = {
  display: "flex",
  flexDirection: "column",
} as const;

const rootStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
} as const;

const formStyles = {
  display: "flex",
  width: 200,
  flexDirection: "column",
  gap: 10,
} as const;
