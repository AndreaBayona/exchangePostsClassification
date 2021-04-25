import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`;

export const Option = styled.span<{open: boolean}>`
  color: ${({open}) => open ? `lightslategrey` : `blue`};
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
`;

export const Url = styled.div`
  margin: 5px 0;
  padding-right: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
