import { SyntheticEvent } from 'react';
import userAxiosService from './userAxiosService';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions';
import { User, userToString } from './user';


// Function Component
function LoginComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'username'){
            u.name = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(getUser(u));
    }
    function submitForm() {
        userAxiosService.login(user).then((user) => {
            console.log('User: ' + userToString(user));
            dispatch(getUser(user));
            history.push('/claims');
        }).catch((err) => {
            console.log('Submit form err: ' + err)
            dispatch(getUser(new User()));
            history.push('/login');
        });
    }
    return (
        
        <div className='login-card'>
           Username <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
           <br/>
           Password <input type='password' className='form-control' onChange={handleFormInput} name='password'/>
           <br/>
           <button className='login-button' onClick={submitForm}>Login</button>
        </div>
    );
}

export default LoginComponent;
