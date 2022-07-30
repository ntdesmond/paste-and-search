import useClipboard from '../hooks/clipboard';

const Home = () => {
  const pastedData = useClipboard();

  // eslint-disable-next-line no-console
  console.log(pastedData);

  if (pastedData instanceof File) {
    return <p>You pasted a file of type {pastedData.type}</p>;
  }

  return <p>Paste an image here!</p>;
};

export default Home;
