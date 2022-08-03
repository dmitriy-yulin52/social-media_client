import * as React from 'react';
import {FC, memo, ReactElement} from 'react';
import {Modal, useMantineTheme} from '@mantine/core';
import '../../pages/Auth/Auth.scss'

type ProfileModalProps = {
    open: boolean
    onOpenModal: () => void
}


export const ProfileModal: FC<ProfileModalProps> = memo(function ProfileModal(props): ReactElement {

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
            title="Настройки"
        >
            <form className={'infoForm'}>
                <h3>Ваша информация</h3>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        placeholder={'Имя'}
                        name={'firstname'}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        placeholder={'Фамилия'}
                        name={'lasttname'}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className={'infoInput'}
                        name={'Работа'}
                        placeholder={'Работа'}
                    />
                </div>
                <div>
                    <input type="text" className="infoInput" name={'city'} placeholder={'Город'}/>
                    <input type="text" className="infoInput" name={'country'} placeholder={'Страна'}/>
                </div>
                <div>
                    <input type="text" className="infoInput" name={'relationship'} placeholder={'Отношения'}/>
                </div>

                <div>
                    Фотография профиля
                    <input type="file" name={'profileImage'}/>
                    Обложка профиля
                    <input type="file" name={'coverImage'}/>
                </div>
                <button className={'button infoButton'}>Обновить</button>
            </form>
        </Modal>
    );
})