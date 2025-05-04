import { memo, SVGProps } from 'react';

function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path fill={props.fill ?? 'currentColor'} d='m7 10l5 5l5-5z'></path>
    </svg>
  );
}
export default memo(ArrowDown);
