import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.main`
  min-height: calc(100vh - 120px);
  padding: 24px;
`;
export default Content;