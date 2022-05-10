import { useContext } from 'react'

import { UserContext } from '../context/userContext';

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        // In case we use this hook outside the user context provider
        // we are going to throw an error
        throw new Error('useUsers() must be used inside a <UserProvider />')
    }
    return context;
}