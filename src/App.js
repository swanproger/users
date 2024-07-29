import React, { useState, useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users,setUsres] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
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
  return (
    <div className="App">
      <Users items ={users} isLoading = {isLoading} searchValue={searchValue} onChangeSearchValue={onChangeSearchValue}/>
      {/* <Success /> */}
    </div>
  );
}

export default App;
