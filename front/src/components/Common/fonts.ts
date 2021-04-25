import styled from "styled-components";

export const Title = styled.h5<{inheritColor?: boolean}>`
  text-align: start;
  color: ${({inheritColor}) => !!inheritColor ? `inherit` : `black`};
  margin: 0;
`;

export const Text = styled.p<{inheritColor?: boolean}>`
  text-align: start;
  color: ${({inheritColor}) => !!inheritColor ? `inherit` : `black`};
  margin: 0;
`;