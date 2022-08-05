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

function App() {

    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {isOpen, messageError} = useSelector((state: RootStateType) => state.error)

    const dispatch = useDispatch()


    const onCloseSnackBar = useCallback(() => {
        dispatch(errorActions.setIsOpen(false))
        dispatch(authActions.setIsError(false))
        dispatch(authActions.setMessageError(null))
    }, [dispatch])

    //
    // useEffect(() => {
    //     const authLS = localStorage.getItem('authRegister')
    //     const userLS = localStorage.getItem('authRegister-user')
    //     if (authLS) {
    //             dispatch(authActions.setIsAuth(true))
    //             dispatch(authActions.setUser(JSON.parse(userLS!)))
    //         }
    // }, [])

    return (
        <div className={'App'}>
            <div className={'blur'}></div>
            <div className={'blur'}></div>
            {/*<Home/>*/}
            {/*<Profile/>*/}
            <Routes>
                <Route path={'/'} element={isAuth ? <Navigate to={'home'}/> : <Navigate to='auth'/>}/>
                <Route path={'/home'} element={isAuth ? <Home/> : <Navigate to='../auth'/>}/>
                <Route path={'/auth'} element={isAuth ? <Navigate to={'../home'}/> : <Auth/>}/>
            </Routes>
            {/*<Auth/>*/}
            {isOpen && <SnackBar onClose={onCloseSnackBar} title={'Ошибка'} variant={'filled'} color={'red'}
                                 text={messageError}/>}
        </div>
    );
}


export default App;
