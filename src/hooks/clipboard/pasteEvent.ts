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
    const listener = (event: ClipboardEvent) => {
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
    document.addEventListener('paste', listener);

    return () => {
      document.removeEventListener('paste', listener);
    };
  }, []);
  return data;
};

export default usePasteEvent;
