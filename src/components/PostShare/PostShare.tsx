import * as React from 'react';
import './PostShare.scss'
import ProfileLogo from '../../assets/img/defaultProfile.png'
import profileImage from '../../assets/img/profileImg.jpg'
import {UilScenery} from '@iconscout/react-unicons'
import {UilPlayCircle} from '@iconscout/react-unicons'
import {UilLocationPoint} from '@iconscout/react-unicons'
import {UilSchedule} from '@iconscout/react-unicons'
import {UilTimes} from '@iconscout/react-unicons'
import {ChangeEvent, useCallback, useRef, useState, MouseEvent} from "react";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {postActions} from "../../store/reducers/post/post-actions";


type Props = {};


const style = {
    display: "none"
} as const


export type PostRequestType = {
    userId: string,
    desc: string,
    likes?: string[],
    image?: string
}
export const PostShare = (props: Props) => {

    const {user} = useTypedSelector(state => state.auth)
    const {isLoading} = useTypedSelector(state => state.posts)
    const dispatch = useDispatch()

    const [image, setImage] = useState<{ imageUrl: string, imageFile: File } | null>(null)
    const imageRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLInputElement>(null)

    const onImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage({
                imageUrl: URL.createObjectURL(img),
                imageFile: img
            });
        }
    }, [setImage])


    const onClickInputFile = useCallback(() => {
        if (imageRef.current) {
            imageRef.current.click()
        }
    }, [imageRef])


    const onClickClearImgUrl = useCallback(() => {
        setImage(null)
    }, [setImage])


    const handleSubmitShare = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newPost: PostRequestType = {} as PostRequestType

        if (user) {
            newPost = {
                userId: user._id,
                desc: descRef.current ? descRef.current.value : '',
                image:''
            }
        }
        if (image) {
            if (image.imageFile) {
                const data = new FormData();
                const filename = Date.now() + image.imageFile.name;
                data.append('name', filename)
                data.append('file', image.imageFile);
                newPost.image = filename;
                try {
                    dispatch(postActions.uploadImage(data))
                } catch (e) {
                    console.log(e, 'handleSubmitShare')
                }
            }
        }
        dispatch(postActions.uploadPost(newPost))
        setImage(null)
        if (descRef.current) {
            descRef.current.value = ''
        }
    }, [dispatch, image, user,setImage])


    return (
        <div className={'PostShare'}>
            <img src={ProfileLogo} className={'PostShare-img'} alt="ProfileImage"/>
            <div className={'inputBlock'}>
                <input ref={descRef} required type="text" placeholder={'Что происходит'}/>
                <div className="postOptions">
                    <div
                        className={'option'}
                        onClick={onClickInputFile}
                    >
                        <UilScenery/>
                        Фото
                    </div>
                    <div className={'option'}>
                        <UilPlayCircle/>
                        Видео
                    </div>
                    <div className={'option'}>
                        <UilLocationPoint/>
                        Локации
                    </div>
                    <div className={'option'}>
                        <UilSchedule/>
                        Календарь
                    </div>
                    <button disabled={isLoading} className={'button ps-button'} onClick={handleSubmitShare}>
                        {isLoading ? 'Загрузка...' : 'Поделиться'}
                    </button>
                    <div style={style}>
                        <input type="file" name={'myImage'} ref={imageRef} onChange={onImageChange}/>
                    </div>

                </div>
                {image &&
                    <div className={'previewImage'}>
                        <UilTimes onClick={onClickClearImgUrl}/>
                        <img src={image.imageUrl} className={'previewImage-img'} alt="imageUrl"/>
                    </div>
                }
            </div>
        </div>
    );
};
