import styled, { css } from 'styled-components';

const Div = styled.div`
2%;
margin: 2%;
`;
const Error = styled.p`
color: red;
@@ -14,7 +14,7 @@ border-radius: 5px;
color: solid gray;
${(props) => props.error
&& css`
border: 1px solid red;
border: 1px solid black;
color: red;
`};
}
${(props) => (props.value && !props.disabled && !props.error)
&& css`
border: 1px solid orange;
color: black;
`};
}
`;
export { Div, Error, Input };
