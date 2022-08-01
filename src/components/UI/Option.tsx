import { ChangeEventHandler, ReactNode } from 'react';

const onCheckedWrapper = (handler?: () => void) => {
  const wrapper: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked && handler !== undefined) {
      handler();
    }
  };

  return wrapper;
};

const Option = (props: {
  id?: string;
  name: string;
  value: string;
  onChecked?: () => void;
  children?: ReactNode;
  defaultChecked?: boolean;
}) => {
  const inputId = `${props.id || props.value}-option`;

  return (
    <label htmlFor={inputId}>
      <input
        id={inputId}
        type="radio"
        name={props.name}
        value={props.value}
        onChange={onCheckedWrapper(props.onChecked)}
        defaultChecked={props.defaultChecked || false}
      />
      {props.children}
    </label>
  );
};

export default Option;
