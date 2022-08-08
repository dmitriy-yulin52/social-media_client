import * as React from 'react';
import './Posts.scss'
import {Post} from "../Post/Post";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {useEffect} from "react";
import {postActions} from "../../store/reducers/post/post-actions";
import {useParams} from "react-router-dom";

type Props = {};
export const Posts = (props: Props) => {

    const dispatch = useDispatch()
    const {user} = useTypedSelector(state => state.auth)
    let {posts, isLoading} = useTypedSelector(state => state.posts)
    const params = useParams()


    useEffect(() => {
        if (user) {
            dispatch(postActions.getTimeLinePosts(user._id))
        }
    }, [])


    if (!user) {
        return null
    }

    if (params.id) {
        posts = posts.filter((el) => el.userId === params.id)
    }

    if (posts.length === 0) {
        return <div>Нет записей</div>
    }


    return (
        <div className={'Posts'}>
            {isLoading ? <div>Загрузка...</div> : posts.map((post, index) => {
                return <Post key={index} data={post} userId={user._id} username={user.username}/>
            })}
        </div>
    );
};