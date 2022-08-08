import * as React from 'react';
import '../FollowersCard/FollowersCard.scss'
import {FC, memo, ReactElement, useCallback, useState} from "react";
import {InfoCardUserType} from "../InfoCard/InfoCard";
import images  from '../../assets/img/profileImg.jpg'
import {useDispatch} from "react-redux";
import {authActions} from "../../store/reducers/auth/auth-actions";

type UserProps = {
    person:InfoCardUserType
    user:InfoCardUserType
};
export const User:FC<UserProps> = memo(({person,user}):ReactElement => {

    const dispatch = useDispatch()
    const [following,setFollowing] = useState<boolean>(person.followers.includes(user._id))



    const onClickFollowHandler = useCallback(()=>{
        if(following){
             dispatch(authActions.unFollowUserTC(person._id,user))
        }else{
             dispatch(authActions.followUserTC(person._id,user))
        }
        setFollowing((prevState)=>!prevState)

    },[following, dispatch, person._id, user])


    return (
        <div className={'follower'}>
            <div className={'block'}>
                <img src={person.profilePicture ? 'http://localhost:5555/images/' + person.profilePicture : images} alt="img" className={'followerImg'}/>
                <div className="name">
                    <span>{`${person.firstname} ${person.lastname}`}</span>
                    <span>@{ person.username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-button UnfollowButton' : 'button fc-button'} onClick={onClickFollowHandler}>
                {following ? 'Отписаться' : 'Подписаться'}
            </button>
        </div>
    );
});