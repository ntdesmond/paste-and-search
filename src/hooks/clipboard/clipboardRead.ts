const imageTypeRegex = /^image\//;

type ClipboardReadAction = () => Promise<Blob>;

const useClipboardReadAction = () => {
  if (!navigator.clipboard || !navigator.clipboard.read) {
    return null;
  }

  const action: ClipboardReadAction = () =>
    navigator.clipboard.read().then((items) => {
      if (items.length === 0) {
        throw new Error('No items in the clipboard.');
      }

      const item = items[0];
      const imageTypes = item.types.filter((type) => imageTypeRegex.test(type));

      if (imageTypes.length === 0) {
        throw new Error('No images found in the clipboard.');
      }

      return item.getType(imageTypes[0]);
    });

  return action;
};

export default useClipboardReadAction;
