import { useEffect, useState } from 'react';

const getItem = async (event: ClipboardEvent) => {
  const item = event.clipboardData?.items[0];
  if (item === undefined) {
    throw new Error('No item available');
  }
  return item;
};

const usePasteEvent = () => {
  const [data, setData] = useState<File | string | null>();

  useEffect(() => {
    const handler = (event: ClipboardEvent) => {
      // eslint-disable-next-line no-console
      console.log(event);
      if (event.target instanceof HTMLInputElement && event.target.type === 'text') {
        return;
      }

      getItem(event).then(
        (item) => {
          if (item.kind === 'string') {
            item.getAsString(setData);
            return;
          }
          setData(item.getAsFile()!);
        },
        () => setData(null),
      );
    };
    document.addEventListener('paste', handler);

    return () => document.removeEventListener('paste', handler);
  }, []);
  return data;
};

export default usePasteEvent;
