import styled from "styled-components";

export const FormItem = styled.span`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 50%;
  padding: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const SelectOverride = styled.select`
  border-radius: 4px;
  min-height: 38px;
  border-color: hsl(0, 0%, 80%);
  padding: 0 8px 0 8px;
  
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
  
  &:focus,
  &:hover{
    border-color: hsl(0, 0%, 70%);
  }
`;
