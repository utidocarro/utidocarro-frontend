import { SVGProps, memo } from 'react';

function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 12 12' {...props}>
      <path
        fill={props.fill || 'currentColor'}
        fillRule='evenodd'
        d='M4.28 3.22a.75.75 0 0 0-1.06 1.06L4.94 6L3.22 7.72a.75.75 0 0 0 1.06 1.06L6 7.06l1.72 1.72a.75.75 0 0 0 1.06-1.06L7.06 6l1.72-1.72a.75.75 0 0 0-1.06-1.06L6 4.94z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default memo(Close);
