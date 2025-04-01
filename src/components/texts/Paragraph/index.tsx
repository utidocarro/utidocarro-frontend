import { memo } from 'react';
import style from './style.module.css';
import { Colors } from '@styles/Colors';

export interface IParagraph {
    text: string;
    color?: keyof typeof EColors;
    weight?: keyof typeof EWeights;
    size?: keyof typeof ESizes;
    align?: keyof typeof EAling;
}

export const EColors = {
    white: Colors.white,
    black: Colors.shape,
    green: Colors.green,
    yellow: Colors.warning,
    red: Colors.error,
} as const;

export enum EWeights {
    thin = 100,
    normal = 300,
    medium = 500,
    bold = 700,
    black = 900,
}

export enum ESizes {
    small = 12,
    normal = 14,
    medium = 16,
    large = 25,
}

export enum EAling {
    left = 'left',
    right = 'right',
    center = 'center',
}

function Paragraph({
    text,
    color = 'white',
    weight = 'normal',
    size = 'normal',
    align = 'left',
}: IParagraph) {
    return (
        <p
            style={{
                color: EColors[color],
                fontWeight: EWeights[weight],
                fontSize: ESizes[size],
                textAlign: EAling[align],
            }}
            className={style.font}>
            {text}
        </p>
    );
}

export default memo(Paragraph);
