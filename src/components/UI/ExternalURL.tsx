import { ReactNode } from 'react';

const ExternalURL = (props: { children: ReactNode; href: string }) => (
  <a href={props.href} target="_blank" rel="noreferrer">
    {props.children}
  </a>
);

export default ExternalURL;
