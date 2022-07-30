const useUrlChecking = (url: string) => {
  const regex = /^(?<proto>https?:\/\/)?(?:[\w-]+\.)*(?:\w+)\//;
  const match = regex.exec(url);
  if (match === null) {
    return null;
  }
  return match.groups!.proto === undefined ? `http://${url}` : url;
};

export default useUrlChecking;
