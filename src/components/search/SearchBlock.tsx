import EngineProps from './engines/EngineProps';
import Google from './engines/common/Google';
import Yandex from './engines/common/Yandex';
import TinEye from './engines/common/TinEye';
import Ascii2D from './engines/nerd/Ascii2D';
import IQDB from './engines/nerd/IQDB';
import SauceNao from './engines/nerd/SauceNao';
import TraceMoe from './engines/nerd/TraceMoe';
import { FlexColumn, FlexRow } from '../layout/alignment/Flex';
import Bing from './engines/common/Bing';
import SectionHeading from '../text/SectionHeading';

const SearchBlock = ({ imageUrl }: EngineProps) => (
  <FlexColumn gap="2em">
    <section>
      <SectionHeading>Common engines:</SectionHeading>
      <FlexRow gap="1em">
        <Google imageUrl={imageUrl} />
        <Yandex imageUrl={imageUrl} />
        <Bing imageUrl={imageUrl} />
        <TinEye imageUrl={imageUrl} />
      </FlexRow>
    </section>
    <section>
      <SectionHeading>Nerd engines:</SectionHeading>
      <FlexColumn gap="1em">
        <div>
          <SauceNao imageUrl={imageUrl} /> (<code>image source locator</code>, combination of
          engines below)
        </div>
        <div>
          <IQDB imageUrl={imageUrl} /> (anime arts &amp; etc.)
        </div>
        <div>
          <IQDB imageUrl={imageUrl} is_3d /> (asian models &amp; cosplays)
        </div>
        <div>
          <Ascii2D imageUrl={imageUrl} /> (make sure you know Japanese)
        </div>
        <div>
          <TraceMoe imageUrl={imageUrl} /> (Anime Scene Search)
        </div>
      </FlexColumn>
    </section>
  </FlexColumn>
);

export default SearchBlock;
