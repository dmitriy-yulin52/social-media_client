import * as React from 'react';
import {FC, ReactElement, useEffect, useState} from 'react';
import './FollowersCard.scss'
import {User} from "../User/User";
import {userApi} from "../../api/user-api";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {InfoCardUserType} from "../InfoCard/InfoCard";

export const FollowersCard:FC = ():ReactElement => {

    const {user} = useTypedSelector(state => state.auth)

    const [persons,setPersons] = useState<InfoCardUserType[]>([])

    useEffect(() => {
        (async () => {
            const {data} = await userApi.getAllUser()
            setPersons(data)
        })()
    }, [])


    return (
        <div className={'FollowerCard'}>
            <h3>Кто следит за тобой</h3>
            {persons.map((person, index) => {
                if (user) {
                    if (person._id !== user._id) {
                        return <User person={person} key={index} user={user}/>
                    }
                }
            })}
        </div>
    );
};