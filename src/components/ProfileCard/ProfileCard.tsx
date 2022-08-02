import * as React from 'react';
import './ProfileCard.scss'
import ProfileLogo from '../../assets/img/profileImg.jpg'
import Cover from '../../assets/img/cover.jpg'

type Props = {};
export const ProfileCard = (props: Props) => {
    return (
        <div className={'ProfileCard'}>
            <div className="ProfileImages">
                <img src={Cover} alt="Cover"/>
                <img src={ProfileLogo} alt="ProfileLogo"/>
            </div>
            <div className="ProfileName">
                <span>Юлин Дмитрий</span>
                <span>Front-end разработчик</span>
            </div>

            <div className="followStatus">
                <hr/>
                <div className={'block'}>
                    <div className="follow">
                        <span>6,899</span>
                        <span>Следующий</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Подписчики</span>
                    </div>
                </div>
                <hr/>
            </div>
            <span className={'my-profile'}>Мой Профиль</span>
        </div>
    );
};