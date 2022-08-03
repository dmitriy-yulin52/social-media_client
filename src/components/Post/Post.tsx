import * as React from 'react';
import './Post.scss'
import {FC, memo, ReactElement} from "react";

import Comment from '../../assets/img/comment.png'
import Share from '../../assets/img/share.png'
import Heart from '../../assets/img/like.png'
import NotLike from '../../assets/img/notlike.png'


type PostItemType = {
    img: string,
    name: string,
    desc: string,
    likes: number,
    liked: boolean,
}

type PostProps = {
    data: PostItemType
    id: number
};
export const Post: FC<PostProps> = memo(({data, id}): ReactElement => {
    return (
        <div className={'Post'}>
            <img src={data.img} className={'Post-img'} alt="img"/>


            <div className="postReact">
                <img src={data.liked ? Heart : NotLike} alt=""/>
                <img src={Comment} alt=""/>
                <img src={Share} alt=""/>
            </div>

            <span>{data.likes} likes</span>

            <div className="detail">
                <span><b>{data.name}</b></span>
                <span> {data.desc} </span>
            </div>
        </div>
    );
});