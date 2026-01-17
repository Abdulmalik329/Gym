import { useState } from "react";
import {
  Wrapper,
  Card,
  Title,
  Subtitle,
  Field,
  Label,
  InputWrapper,
  Input,
  Toggle,
  Button,
} from "./ChangePassword.styled";

const ChangePassword = () => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, oldPassword: e.target.value });
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, newPassword: e.target.value });
  };

  const submit = () => {
    console.log("Change password data:", data);
    // keyinchalik backend PUT qilinadi
  };

  return (
    <Wrapper>
      <Card>
        <Title>Change Password</Title>
        <Subtitle>Keep your account secure</Subtitle>

        <Field>
          <Label>Old password</Label>
          <InputWrapper>
            <Input
              type={showOld ? "text" : "password"}
              placeholder="Enter old password"
              value={data.oldPassword}
              onChange={handleOldPasswordChange}
            />
            <Toggle onClick={() => setShowOld(!showOld)}>
              {showOld ? "Hide" : "Show"}
            </Toggle>
          </InputWrapper>
        </Field>

        <Field>
          <Label>New password</Label>
          <InputWrapper>
            <Input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={data.newPassword}
              onChange={handleNewPasswordChange}
            />
            <Toggle onClick={() => setShowNew(!showNew)}>
              {showNew ? "Hide" : "Show"}
            </Toggle>
          </InputWrapper>
        </Field>

        <Button onClick={submit}>Update Password</Button>
      </Card>
    </Wrapper>
  );
};

export default ChangePassword;
