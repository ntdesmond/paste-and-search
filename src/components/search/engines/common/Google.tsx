import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const Google = ({ imageUrl }: EngineProps) => (
  <ExternalURL href={`https://lens.google.com/uploadbyurl?url=${imageUrl}`}>
    Google
  </ExternalURL>
);

export default Google;
