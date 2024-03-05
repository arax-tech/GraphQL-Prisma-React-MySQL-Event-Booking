import React from 'react'
import Header from './include/Header'

const App = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    )
}

export default App
