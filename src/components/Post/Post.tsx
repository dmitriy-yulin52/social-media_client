import * as React from 'react';
import './Post.scss'
import {FC, memo, ReactElement} from "react";

import Comment from '../../assets/img/comment.png'
import Share from '../../assets/img/share.png'
import Heart from '../../assets/img/like.png'
import NotLike from '../../assets/img/notlike.png'
import {ResponsePostType} from "../../api/post-api";


type PostItemType = {
    img: string,
    name: string,
    desc: string,
    likes: number,
    liked: boolean,
}

type PostProps = {
    data:  ResponsePostType
    userId: string
    username: string
};
export const Post: FC<PostProps> = memo(({data, userId,username}): ReactElement => {

    // const findLike = data.likes.find((el)=>el === userId)

console.log(data.image,'image')
    return (
        <div className={'Post'}>
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''} className={'Post-img'} alt="img"/>


            <div className="postReact">
                <img src={true ? Heart : NotLike} alt=""/>
                <img src={Comment} alt=""/>
                <img src={Share} alt=""/>
            </div>

            <span className={'Post-likes'}>{data.likes} likes</span>

            <div className="detail">
                <span><b>{username}</b></span>
                <span> {data.desc} </span>
            </div>
        </div>
    );
});