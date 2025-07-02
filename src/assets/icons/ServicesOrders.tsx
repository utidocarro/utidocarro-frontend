import { memo, SVGProps } from 'react';

function ServicesOrders(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.fill ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="3" width="16" height="18" rx="2" ry="2" />
      <line x1="8" y1="3" x2="8" y2="21" /> 
      <line x1="12" y1="7" x2="18" y2="7" /> 
      <line x1="12" y1="11" x2="18" y2="11" />
      <line x1="12" y1="15" x2="18" y2="15" />
      <line x1="12" y1="19" x2="18" y2="19" />
    </svg>
  );
}

export default memo(ServicesOrders);
