import { createContext, useState } from "react";

export const MiContexto = createContext();

import React from 'react'

const MiContextoProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    return (
        <MiContexto.Provider value={{ token, setToken }}>
            {children}
        </MiContexto.Provider>
    )
}

export default MiContextoProvider;