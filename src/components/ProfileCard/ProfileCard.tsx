import * as React from 'react';
import './ProfileCard.scss'
import ProfileLogo from '../../assets/img/defaultProfile.png'
import Cover from '../../assets/img/coverImage.jpg'
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";

type ProfileCardProps = {
    location?: string
};
export const ProfileCard: FC<ProfileCardProps> = memo(({location}): ReactElement | null => {

    const {user} = useTypedSelector(state => state.auth)
    const {posts} = useTypedSelector(state => state.posts)

    if (!user) {
        return null
    }
    const newPosts = posts.filter((post) => post.userId === user._id).length

    return (
        <div className={'ProfileCard'}>
            <div className="ProfileImages">
                <img src={user.coverPicture ? 'http://localhost:5555/images/' + user.coverPicture : Cover} alt="Cover"/>
                <img src={user.profilePicture ? 'http://localhost:5555/images/' + user.profilePicture : ProfileLogo} alt="ProfileLogo"/>
            </div>
            <div className="ProfileName">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.worksAt}</span>
            </div>

            <div className="followStatus">
                <hr/>
                <div className={'block'}>
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Подписки</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Подписчики</span>
                    </div>
                    {location === 'ProfilePage' &&
                        <>
                            <div className="vl">

                            </div>
                            <div className="follow">
                                <span>{newPosts}</span>
                                <span>Посты</span>
                            </div>
                        </>
                    }
                </div>
                <hr/>
            </div>
            {location === 'ProfilePage' ? '' : <span className={'subtitle'}>
                <Link to={`/profile/${user._id}`}>Мой Профиль</Link>
            </span>}
        </div>
    );
});