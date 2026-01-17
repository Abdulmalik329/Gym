import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Header,
  Avatar,
  Content,
  Name,
  Bio,
  Grid,
  Item,
  Actions,
  Button,
} from "./Profile.styled";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  height: number;
  weight: number;
  location: string;
  bio: string;
  isActive: boolean;
  createdAt: string;
  gymId: number;
  avatar: string;
}

const user: User = {
  firstName: "John",
  lastName: "Doe",
  phone: "+998901234567",
  email: "john.doe@gmail.com",
  location: "Toshkent",
  bio: "I love gym",
  weight: 75.5,
  height: 180,
  isActive: true,
  createdAt: "2026-01-16T12:58:41.175Z",
  gymId: 1,
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const Profile = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <Avatar>
          <img src={user.avatar} alt="avatar" />
        </Avatar>
      </Header>

      <Content>
        <Name>
          {user.firstName} {user.lastName}
        </Name>

        <Bio>{user.bio}</Bio>

        <Grid>
          <Item>
            <span>Email</span>
            <p>{user.email}</p>
          </Item>

          <Item>
            <span>Phone</span>
            <p>{user.phone}</p>
          </Item>

          <Item>
            <span>Location</span>
            <p>{user.location}</p>
          </Item>

          <Item>
            <span>Height</span>
            <p>{user.height} cm</p>
          </Item>

          <Item>
            <span>Weight</span>
            <p>{user.weight} kg</p>
          </Item>

          <Item>
            <span>Status</span>
            <p>{user.isActive ? "Active" : "Inactive"}</p>
          </Item>
        </Grid>

        <Actions>
          <Button onClick={() => navigate("/users/profile/edit")}>
            Edit Profile
          </Button>
          <Button
            outline
            onClick={() => navigate("/users/profile/change-password")}
          >
            Change Password
          </Button>
        </Actions>
      </Content>
    </Wrapper>
  );
};

export default Profile;
