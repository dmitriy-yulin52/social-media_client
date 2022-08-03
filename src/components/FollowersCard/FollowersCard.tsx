import * as React from 'react';
import './FollowersCard.scss'
import {followers} from '../../data/FollowersData'

type Props = {};
export const FollowersCard = (props: Props) => {
    return (
        <div className={'FollowerCard'}>
            <h3>Кто следит за тобой</h3>

            {followers.map((follower,index)=>{
                return <div key={index} className={'follower'}>
                    <div className={'block'}>
                        <img src={follower.img} alt="img" className={'followerImg'}/>
                        <div className="name">
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className={'button fc-button'}>
                        Подписаться
                    </button>
                </div>
            })}
        </div>
    );
};