import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const Arrows = styled.div`
  display: flex;
  width: 800px;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
`;

export const IconBox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
    color: dodgerblue;
 :hover{
  color: blue;
 }
`;

export const QuestionNumberWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const AlertWrapper = styled.div`
  position: absolute;
  top: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 0;
  border-radius: 4px;
  >div{
  margin-bottom: 0;
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  top: 50%;
`;
