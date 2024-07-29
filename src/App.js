import React, { useState, useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users,setUsres] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('')
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    fetch('https://reqres.in/api/users').then(res => res.json()).then(json => {
      setUsres(json.data)
    }).catch(err => {console.warn(err); 
      alert('Ошибка при получении пользователей')
    }).finally(() => setIsLoading(false))
  }, [])
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }
  const onClickInvite = (id) => {
    if(invites.includes(id)){
      setInvites((prev) => prev.filter(_id => _id !== id))
    } else{
      setInvites(prev => [...prev, id])
    }
  }
  const onClickSendInvites = () => {
    setSuccess(true)
  } 
  return (
    <div className="App">
      {
        success ? <Success count={invites.length}/> : <Users onClickSendInvites={onClickSendInvites} onClickInvite={onClickInvite} invites={invites} items ={users} isLoading = {isLoading} searchValue={searchValue} onChangeSearchValue={onChangeSearchValue}/>
      }
      
      
    </div>
  );
}

export default App;
