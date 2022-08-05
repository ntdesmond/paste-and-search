import styled from 'styled-components';
import ExternalURL from '../../UI/ExternalURL';

const StyledBlock = styled.div`
  margin: auto 0 0.5em;
  text-align: center;
  font-size: 0.8em;

  > p {
    margin: 0.3em 0;
  }
`;

const AboutBlock = () => (
  <StyledBlock>
    <p>
      Made by <ExternalURL href="https://github.com/ntdesmond">ntdesmond</ExternalURL>
    </p>
    <p>
      Source code is available at{' '}
      <ExternalURL href={`https://github.com/${process.env.GITHUB_REPO}`}>GitHub</ExternalURL>
    </p>
  </StyledBlock>
);

export default AboutBlock;
