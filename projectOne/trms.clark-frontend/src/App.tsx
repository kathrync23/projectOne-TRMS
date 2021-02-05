import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getUser } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import RouterComponent from './routing.component';
import userService from './user/userAxiosService';

function App() {
  /* useState: A hook that can create a variable and a 
      setter to add to the state of the application and modify
      that state to trigger a render.*/
  // const [cond, setCond] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    userService
      .getLogin()
      .then((user) => {
        console.log(user);
        dispatch(getUser(user));
      })
      .catch((err) => {
        alert('Login failed');
      });
  }, [dispatch]);

  return (
    <div className='container'>
      <BrowserRouter>
        <RouterComponent></RouterComponent>
      </BrowserRouter>
    </div>
  );
}
export default App;
