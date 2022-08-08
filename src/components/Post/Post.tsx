import * as React from 'react';
import {FC, memo, ReactElement, useCallback, useState} from 'react';
import './Post.scss'

import Comment from '../../assets/img/comment.png'
import Share from '../../assets/img/share.png'
import Heart from '../../assets/img/like.png'
import NotLike from '../../assets/img/notlike.png'
import {postApi, ResponsePostType} from "../../api/post-api";


type PostProps = {
    data: ResponsePostType
    userId: string
    username: string

};

const style = {
    cursor: 'pointer'
} as const
export const Post: FC<PostProps> = memo(({data, userId, username}): ReactElement | null => {


    const [liked, setLiked] = useState(data.likes.includes(userId))
    const [likes, setLikes] = useState(data.likes.length)


    const onClickHandlerLike = useCallback(async () => {
        setLiked(!liked)
        await postApi.likePost(data._id, userId)

        liked ? setLikes((prevState) => prevState - 1) : setLikes((prevState) => prevState + 1)
    }, [liked, data._id, userId,setLikes,setLiked])


    return (
        <div className={'Post'}>
            <img src={data.image ? 'http://localhost:5555/images/' + data.image : ''} className={'Post-img'} alt="img"/>

            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="" style={style} onClick={onClickHandlerLike}/>
                <img src={Comment} alt=""/>
                <img src={Share} alt=""/>
            </div>

            <span className={'Post-likes'}>{likes} likes</span>

            <div className="detail">
                {/*<span><b>{username}</b></span>*/}
                <span> {data.desc} </span>
            </div>
        </div>
    );
});