import * as React from 'react';
import {Modal, useMantineTheme} from "@mantine/core";
import {FC, memo, ReactElement} from "react";
import {PostShare} from "../PostShare/PostShare";

type ShareModalProps = {
    open: boolean
    onOpenModal: () => void
};
export const ShareModal:FC<ShareModalProps> = memo((props):ReactElement => {


     const theme = useMantineTheme();

    const {open, onOpenModal} = props;

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            opened={open}
            onClose={onOpenModal}
            overlayOpacity={0.55}
            overlayBlur={3}
            size={'55%'}
            title={'Создание поста'}
        >
            <PostShare/>
        </Modal>
    );
});