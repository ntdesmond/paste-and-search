import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const Bing = ({ imageUrl }: EngineProps) => (
  <ExternalURL
    href={`https://www.bing.com/images/search?view=detailv2&iss=sbi&q=imgurl:${imageUrl}`}
  >
    Bing
  </ExternalURL>
);

export default Bing;
