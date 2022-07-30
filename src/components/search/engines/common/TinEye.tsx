import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const TinEye = ({ imageUrl }: EngineProps) => (
  <ExternalURL href={`http://www.tineye.com/search?url=${imageUrl}`}>TinEye</ExternalURL>
);

export default TinEye;
