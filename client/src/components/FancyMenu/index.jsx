import React from 'react'
import { FloatingMenu} from '../FloatingMenu'
import { StackCard } from '../StackCard'
import { GitCard } from '../GitCard'
import { useView } from '../../context/UserContext'

function FancyMenu() {
    const { stackView, setStackView, gitView, setGitView } = useView()
    return (
        <main>
            <FloatingMenu />
            {stackView && <StackCard />}
            {gitView && <GitCard />}
        </main>
    )
}

export default FancyMenu
