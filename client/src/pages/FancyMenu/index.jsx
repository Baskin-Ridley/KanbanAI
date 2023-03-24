import React from 'react'
import "./style.css"
import { FloatingMenu, StackCard, GitCommitCard } from '../../components'
import { useView } from '../../context/UserContext'

function FancyMenu() {
    const { stackView, setStackView, gitView, setGitView } = useView()
    return (
        <>
            <FloatingMenu />
            {stackView && <StackCard />}
            {gitView && <GitCommitCard />}
        </>
    )
}

export default FancyMenu
