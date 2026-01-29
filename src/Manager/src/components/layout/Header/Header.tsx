import styled from "styled-components";

const Wrapper = styled.header`
  height: 72px;
  padding: 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => (
  <Wrapper>
    <input placeholder="Search members, classes..." />
    <div>Alex Rivers (Manager)</div>
  </Wrapper>
);

export default Header;
