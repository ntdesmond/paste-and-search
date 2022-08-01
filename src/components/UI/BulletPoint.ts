import styled from 'styled-components';

const BulletPoint = styled.div`
  &::before {
    content: '●';
    position: absolute;
    left: -1em;
  }

  & > &::before {
    content: '○';
  }

  margin: 0.5em 0 0 1.2em;
  position: relative;
`;

export default BulletPoint;
