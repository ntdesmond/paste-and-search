import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const Google = ({ imageUrl }: EngineProps) => (
  <ExternalURL href={`https://www.google.com/searchbyimage?image_url=${imageUrl}`}>
    Google
  </ExternalURL>
);

export default Google;
