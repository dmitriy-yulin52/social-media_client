import * as React from 'react';
import {Alert} from "@mantine/core";
import {AlertVariant} from "@mantine/core/lib/Alert/Alert";
import {FC, memo, ReactElement} from "react";

type SnackBarProps = {
    title: string
    color: string
    variant: AlertVariant
    onClose: () => void
    text: string | null
};


const styleAlert = {
    position: 'relative',
    top: '-150px',
    width: '300px'
} as const

const styleWrapper = {
    display: 'flex',
    justifyContent: 'center'
}as const

export const SnackBar: FC<SnackBarProps> = memo((props): ReactElement => {

    const {
        onClose,
        title,
        color,
        variant,
        text,
    } = props

    return (
        <div style={styleWrapper}>
            <Alert style={styleAlert} withCloseButton onClose={onClose} title={title} color={color} variant={variant}>
                {text ? text : 'Error'}
            </Alert>
        </div>
    );
});