import { useState } from "react";
import {
  Wrapper,
  Left,
  Right,
  Title,
  Subtitle,
  Input,
  Button,
  BottomLinks,
} from "./Login.styled";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <Wrapper>
      <Left>
        <Title>Welcome Back</Title>
        <Subtitle>Please login to your account</Subtitle>

        <Input
          type="email"
          placeholder="Email or Phone"
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button>LOGIN</Button>

        <BottomLinks>
          <span>Forgot password?</span>
          <a href="#">Sign up now</a>
        </BottomLinks>
      </Left>

      <Right />
    </Wrapper>
  );
};

export default Login;
