import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

const Yandex = ({ imageUrl }: EngineProps) => (
  <ExternalURL href={`https://yandex.ru/images/search?rpt=imageview&url=${imageUrl}`}>
    Yandex
  </ExternalURL>
);

export default Yandex;
