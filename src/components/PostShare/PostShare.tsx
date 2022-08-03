import * as React from 'react';
import './PostShare.scss'
import profileImage from '../../assets/img/profileImg.jpg'
import {UilScenery} from '@iconscout/react-unicons'
import {UilPlayCircle} from '@iconscout/react-unicons'
import {UilLocationPoint} from '@iconscout/react-unicons'
import {UilSchedule} from '@iconscout/react-unicons'
import {UilTimes} from '@iconscout/react-unicons'
import {ChangeEvent, useCallback, useRef, useState} from "react";


type Props = {};


const style = {
    display: "none"
} as const
export const PostShare = (props: Props) => {

    const [image, setImage] = useState<{ imageUrl: string } | null>(null)
    const imageRef = useRef<HTMLInputElement>(null)


    const onImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage({
                imageUrl: URL.createObjectURL(img)
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


    return (
        <div className={'PostShare'}>
            <img src={profileImage} className={'PostShare-img'} alt="ProfileImage"/>
            <div className={'inputBlock'}>
                <input type="text" placeholder={'Что происходит'}/>
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
                    <button className={'button ps-button'}>
                        Поделиться
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
