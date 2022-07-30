import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const TraceMoe = ({ imageUrl }: EngineProps) => (
  <ExternalURL href={`https://trace.moe/?url=${imageUrl}`}>trace.moe</ExternalURL>
);

export default TraceMoe;
