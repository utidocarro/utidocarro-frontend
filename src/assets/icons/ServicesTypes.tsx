import { memo, SVGProps } from 'react';

function ServiceTypes(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g className="service-outline">
        <g
          fill={props.fill ?? 'currentColor'}
          fillRule="evenodd"
          className="Vector"
          clipRule="evenodd"
        >
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Zm0 2a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11Z" />
          <path d="M19.43 12.98a7.938 7.938 0 0 0 0-1.96l1.47-1.14a1 1 0 0 0 .24-1.31l-1.39-2.4a1 1 0 0 0-1.25-.43l-1.74.7a7.99 7.99 0 0 0-1.7-.98l-.26-1.85A1 1 0 0 0 13.13 3h-2.26a1 1 0 0 0-.98.83l-.26 1.85a7.99 7.99 0 0 0-1.7.98l-1.74-.7a1 1 0 0 0-1.25.43l-1.39 2.4a1 1 0 0 0 .24 1.31l1.47 1.14a7.938 7.938 0 0 0 0 1.96l-1.47 1.14a1 1 0 0 0-.24 1.31l1.39 2.4a1 1 0 0 0 1.25.43l1.74-.7a7.99 7.99 0 0 0 1.7.98l.26 1.85a1 1 0 0 0 .98.83h2.26a1 1 0 0 0 .98-.83l.26-1.85a7.99 7.99 0 0 0 1.7-.98l1.74.7a1 1 0 0 0 1.25-.43l1.39-2.4a1 1 0 0 0-.24-1.31l-1.47-1.14Z" />
        </g>
      </g>
    </svg>
  );
}

export default memo(ServiceTypes);
