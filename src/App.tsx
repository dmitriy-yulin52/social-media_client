import React, {useCallback, useEffect} from 'react';
import './App.scss'
import {Home} from "./pages/home/Home";
import {Profile} from "./pages/Profile/Profile";
import {Auth} from "./pages/Auth/Auth";
import {SnackBar} from "./components/SnackBar/SnackBar";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store/store";
import {authActions} from "./store/reducers/auth/auth-actions";
import {Navigate, Routes, Route} from "react-router-dom";
import {useTypedSelector} from "./utils/hooks/useTypedSelector";
import {errorActions} from "./store/reducers/error/error-actions";
import {Chat} from "./pages/Chat/Chat";

function App() {

    const {isAuth,user} = useTypedSelector(state => state.auth)
    const {isOpen, messageError} = useSelector((state: RootStateType) => state.error)

    const dispatch = useDispatch()


    const onCloseSnackBar = useCallback(() => {
        dispatch(errorActions.setIsOpen(false))
        dispatch(authActions.setIsError(false))
        dispatch(authActions.setMessageError(null))
    }, [dispatch])



    // useEffect(()=>{
    //     if(localStorage){
    //
    //     }
    // },[])
    return (
        <div className={'App'}>
            <div className={'blur'}></div>
            <div className={'blur'}></div>
            <Routes>
                <Route path={'/'} element={isAuth ? <Navigate to={'home'}/> : <Navigate to='auth'/>}/>
                <Route path={'/home'} element={isAuth ? <Home/> : <Navigate to='../auth'/>}/>
                <Route path={'/auth'} element={isAuth ? <Navigate to={'../home'}/> : <Auth/>}/>
                <Route path={'/profile/:id'} element={isAuth ? <Profile/> : <Navigate to={'../auth'}/>}/>
                <Route path={'/chat'} element={user ? <Chat/> : <Navigate to={'../auth'}/>}/>
            </Routes>
            {isOpen && <SnackBar onClose={onCloseSnackBar} title={'Ошибка'} variant={'filled'} color={'red'}
                                 text={messageError}/>}
        </div>
    );
}


export default App;
