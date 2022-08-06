import * as React from 'react';
import {ChangeEvent, FC, memo, ReactElement, useCallback, useEffect, useState, MouseEvent} from 'react';
import {Modal, useMantineTheme} from '@mantine/core';
import '../../pages/Auth/Auth.scss'
import {InfoCardUserType} from "../InfoCard/InfoCard";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {postApi} from "../../api/post-api";
import {usersActions} from "../../store/reducers/users/users-actions";
import {authActions} from "../../store/reducers/auth/auth-actions";

type ProfileModalProps = {
    open: boolean
    setModalOpened: () => void
    data: InfoCardUserType
}

export type ProfileDataType = Omit<InfoCardUserType, "isAdmin" | "_id" | "createdAt" | "updatedAt" | "password" | 'about' | 'followers' | 'following' | 'username' | '__v'>


export const ProfileModal: FC<ProfileModalProps> = memo(function ProfileModal(props): ReactElement {

    const theme = useMantineTheme();

    const {open, setModalOpened, data} = props;


    const [formData, setFormData] = useState<InfoCardUserType>(data);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);



    const dispatch = useDispatch()

    const param = useParams()
    const {user} = useTypedSelector(state => state.auth)


    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }, [setFormData])


    console.log(formData,'formData')


    // useEffect(() => {
    //     setFormData({
    //         firstname: '',
    //         lastname: '',
    //         worksAt: '',
    //         livesin: '',
    //         country: '',
    //         relationship: '',
    //     })
    // }, [])


    const onChangeImageHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            let img = e.currentTarget.files[0]
            e.currentTarget.name === 'profilePicture' ? setProfileImage(img) : setCoverImage(img)
        }
    }, [setProfileImage, setCoverImage])


    const handlerSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let userData = formData
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append('name', fileName);
            data.append('file', profileImage);
            userData.profilePicture = fileName;
            try {
                await postApi.uploadImage(data)
            } catch (e) {
                console.log(e)
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append("name", fileName);
            data.append("file", coverImage);
            userData.coverPicture = fileName;
            try {
                await postApi.uploadImage(data)
            } catch (err) {
                console.log(err);
            }
        }
            dispatch(authActions.updateUserTC(userData._id ?? '1', userData))
        setModalOpened()
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            opened={open}
            onClose={setModalOpened}
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
                        onChange={handleChange}
                        value={formData.firstname}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        placeholder={'Фамилия'}
                        name={'lastname'}
                        onChange={handleChange}
                        value={formData.lastname}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className={'infoInput'}
                        name={'worksAt'}
                        placeholder={'Работа'}
                        onChange={handleChange}
                        value={formData.worksAt}
                    />
                </div>
                <div>
                    <input type="text"
                           className="infoInput"
                           name={'livesin'}
                           placeholder={'Город'}
                           onChange={handleChange}
                           value={formData.livesin}
                    />
                    <input type="text"
                           className="infoInput"
                           name={'country'}
                           placeholder={'Страна'}
                           onChange={handleChange}
                           value={formData.country}
                    />
                </div>
                <div>
                    <input type="text"
                           className="infoInput"
                           name={'relationship'}
                           placeholder={'Отношения'}
                           onChange={handleChange}
                           value={formData.relationship}
                    />
                </div>
                <div>
                    Фото профиля
                    <input type="file" name={'profilePicture'} onChange={onChangeImageHandler}/>
                    Обложка профиля
                    <input type="file" name={'coverPicture'} onChange={onChangeImageHandler}/>
                </div>
                <button type={'submit'} onClick={handlerSubmit} className={'button infoButton'}>Обновить</button>
            </form>
        </Modal>
    );
})