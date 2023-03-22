import React from 'react'
import "./style.css"
import { FloatingMenu, StackCard } from '../../components'
import { useView } from '../../context/UserContext'


function BoardTest() {

    const { stackView, setStackView, gitView, setGitView } = useView()


    return (

        <>
            <FloatingMenu />
            {stackView && <StackCard />}
        </>

    )


}


export default BoardTest
