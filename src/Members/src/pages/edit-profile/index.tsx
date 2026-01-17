import React, { useState } from "react";
import {
  Wrapper,
  Header,
  AvatarWrapper,
  Camera,
  Form,
  Column,
  Field,
  Label,
  Input,
  SaveButton,
} from "./EditProfile.styled";

const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  phone: "+998901234567",
  height: "180",
  weight: "75.5",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const EditProfile = () => {
  const [form, setForm] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    phone: mockUser.phone,
    height: mockUser.height,
    weight: mockUser.weight,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    console.log("Yuborilayotgan data:", form);
    // keyin backendga PUT qilinadi
  };

  return (
    <Wrapper>
      <Header>
        <AvatarWrapper>
          <img src={mockUser.avatar} alt="avatar" />
          <Camera>📷</Camera>
        </AvatarWrapper>
      </Header>

      <Form>
        <Column>
          <Field>
            <Label>First name</Label>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={onChange}
            />
          </Field>

          <Field>
            <Label>Last name</Label>
            <Input name="lastName" value={form.lastName} onChange={onChange} />
          </Field>

          <Field>
            <Label>Height (cm)</Label>
            <Input name="height" value={form.height} onChange={onChange} />
          </Field>
        </Column>

        <Column>
          <Field>
            <Label>Email</Label>
            <Input name="email" value={form.email} onChange={onChange} />
          </Field>

          <Field>
            <Label>Phone</Label>
            <Input name="phone" value={form.phone} onChange={onChange} />
          </Field>

          <Field>
            <Label>Weight (kg)</Label>
            <Input name="weight" value={form.weight} onChange={onChange} />
          </Field>
        </Column>
      </Form>

      <SaveButton onClick={submit}>SAVE</SaveButton>
    </Wrapper>
  );
};

export default EditProfile;
