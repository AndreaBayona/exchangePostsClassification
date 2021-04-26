import styled from "styled-components";

export const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Calibri;
`;

export const Header = styled.header`
  background-color: #d3d3d4;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  font-size: calc(10px + 2vmin);
  color: white;
  margin-bottom: 20px;
`;

export const SearchBox = styled.div`
  margin: 0;
  width: 300px;
`;

export const LinkOverride = styled.div`
  >a{
    color: #292929;
  }
`;
