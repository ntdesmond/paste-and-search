import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const SauceNao = ({ imageUrl }: EngineProps) => (
  <ExternalURL href={`https://saucenao.com/search.php?url=${imageUrl}`}>SauceNao</ExternalURL>
);

export default SauceNao;
