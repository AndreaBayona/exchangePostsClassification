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

export const FormItem = styled.span`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 40%;
  padding: 20px;
`;

export const FormInput = styled.span`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const FreeText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.textarea`
  width: 100%;
  min-height: 50px;
 
`;