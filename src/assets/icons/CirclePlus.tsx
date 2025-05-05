import { memo, SVGProps } from 'react';

function CirclePlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill={props.fill ?? 'currentColor'}
        fillRule='evenodd'
        d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default memo(CirclePlus);
