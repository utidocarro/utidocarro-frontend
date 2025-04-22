import { memo, SVGProps } from 'react';

function Logout(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g
                fill="none"
                stroke={props.stroke ?? 'currentColor'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2">
                <path d="M10 8V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-2"></path>
                <path d="M15 12H3l3-3m0 6l-3-3"></path>
            </g>
        </svg>
    );
}

export default memo(Logout);
