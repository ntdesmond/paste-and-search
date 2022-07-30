import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const Ascii2D = ({ imageUrl }: EngineProps) => (
  <ExternalURL href={`https://ascii2d.net/search/url/${imageUrl}`}>Ascii2D</ExternalURL>
);

export default Ascii2D;
