import { useState } from 'react';

const getClipboardItem = async (event: ClipboardEvent) => {
  const item = event.clipboardData?.items[0];
  if (item === undefined) {
    throw new Error('No item available');
  }
  return item;
};

const useClipboard = () => {
  const [data, setData] = useState<File | string | null>();

  document.addEventListener('paste', (event) => {
    getClipboardItem(event).then(
      (item) => {
        if (item.kind === 'string') {
          item.getAsString(setData);
          return;
        }
        setData(item.getAsFile()!);
      },
      () => setData(null),
    );
  });
  return data;
};

export default useClipboard;
