import styled from 'styled-components';
import RetryIcon from '../../icons/retry.svg';

const Button = styled.button`
  font-size: 1em;
  text-align: center;
  padding: 0.2em 0.5em;
  border: 1px solid #888;
  border-radius: 5px;
  background-color: #8883;
  cursor: pointer;

  :hover {
    background-color: #8885;
  }
`;

const ButtonWithIcon = styled(Button)<{ icon: any }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2em;

  ::before {
    content: '';
    display: block;
    padding: 1.2em 0 0 1.2em;
    background: url(${(props) => props.icon}) no-repeat center/cover;
  }
`;

export const ResetButton = styled(ButtonWithIcon).attrs({ icon: RetryIcon })`
  align-self: center;
`;

export default Button;
