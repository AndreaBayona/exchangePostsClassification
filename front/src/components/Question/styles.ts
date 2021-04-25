import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 700px;
    justify-content: center;
    align-content: center;
    padding: 20px;
    border: 1px solid lightslategrey;
    height: fit-content;
    flex-direction: column;
    border-radius: 16px;
`;


export const Divider = styled.div`
  border-bottom: 2px solid lightgray;
  width: 100%;
  margin: 15px 0;
`;

export const Header = styled.span`
  display: flex;
  align-items: start;
  width: 100%;
  justify-content: space-between;
  color: darkblue;
  margin-bottom: 20px;
`;

export const Url = styled.div`
  margin: 5px 0;
  padding-right: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
