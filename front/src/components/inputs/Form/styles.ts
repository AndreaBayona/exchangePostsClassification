import styled from "styled-components";

export const Container = styled.div`
  display: block;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const FormInput = styled.span`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

export const FreeText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  margin-bottom: 5px;
`;


export const TextAreaOverride = styled.textarea`
  border-radius: 4px;
  width: 100%;
  min-height: 50px;
  border-color: hsl(0, 0%, 80%);
  padding: 0 8px 0 8px;
  
  &:focus,
  &:hover{
    border-color: hsl(0, 0%, 70%);
  }
`;

export const SubmitButton = styled.input`
  border-radius: 4px;
  border-color: currentColor;
  min-height: 40px;
  min-width: 80px;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 5px;
  font-size: small;
`;

export const MandatoryFields = styled.div`
  color: red;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 12px;
`;

export const Message = styled.div`
  font-size: 10px;
  color: #4e555b;
`;
