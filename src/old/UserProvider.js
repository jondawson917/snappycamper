import React, {useState} from 'react';
import UserContext from './UserContext';

const UserProvider = () =>{
    const [user, setUser] = useState(null);

    
    
    return (
        <UserContext.Provider value={{user}}>
            
            
        </UserContext.Provider>
    )
}
export default UserProvider;