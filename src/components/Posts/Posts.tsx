import * as React from 'react';
import './Posts.scss'
import {Post} from "../Post/Post";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {useEffect} from "react";
import {postActions} from "../../store/reducers/post/post-actions";

type Props = {};
export const Posts = (props: Props) => {


    const dispatch = useDispatch()
    const {user} = useTypedSelector(state => state.auth)
    const {posts, isLoading} = useTypedSelector(state => state.posts)


    useEffect(() => {
        if (user) {
            dispatch(postActions.getTimeLinePosts(user._id))
        }
    }, [])

    if (!user) {
        return null
    }


    return (
        <div className={'Posts'}>
            {posts.length === 0 && <div>Нет записей</div>}
            {isLoading ? <div>Загрузка...</div> :posts.map((post, index) => {
                return <Post key={index} data={post} userId={user._id} username={user.username}/>
            })}
        </div>
    );
};