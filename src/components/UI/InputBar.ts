import styled from 'styled-components';
import { FlexRow } from '../layout/alignment/Flex';

const InputBar = styled(FlexRow)`
  width: 100%;
  gap: 1ch;

  > :first-child {
    flex: 1;
  }
`;

export default InputBar;
