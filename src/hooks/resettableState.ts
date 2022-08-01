import { Dispatch, SetStateAction, useState } from 'react';

const useResettableState: <T>(
  initialValue?: T,
) => [
  T | undefined,
  Dispatch<SetStateAction<T>> | Dispatch<SetStateAction<T | undefined>>,
  () => void,
] = <T>(initialValue?: T) => {
  const emptyAllowed = initialValue === undefined;
  const [state, setState] = emptyAllowed
    ? useState<T | undefined>(initialValue)
    : useState<T>(initialValue);
  const resetState = () => setState(initialValue!);

  return [state, setState, resetState];
};

export default useResettableState;
