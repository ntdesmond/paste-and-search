import ExternalURL from '../../../UI/ExternalURL';
import EngineProps from '../EngineProps';

interface CustomProps extends EngineProps {
  is_3d?: boolean;
}

const IQDB = ({ imageUrl, is_3d = false }: CustomProps) =>
  is_3d ? (
    <ExternalURL href={`https://3d.iqdb.org/?url=${imageUrl}`}>IQDB 3D</ExternalURL>
  ) : (
    <ExternalURL href={`https://iqdb.org/?url=${imageUrl}`}>IQDB</ExternalURL>
  );

export default IQDB;
