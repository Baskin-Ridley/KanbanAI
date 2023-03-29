import React from 'react'
import { FloatingMenu } from '../FloatingMenu'
import { StackCard } from '../StackCard'
import { GitCard } from '../GitCard'
import Chart from '../Chart'
import { useView } from '../../context/UserContext'


function FancyMenu() {
    const { stackView, setStackView, gitView, setGitView, ganttView, setGanttView } = useView()
    return (
        <main>
            <FloatingMenu />
            {stackView && <StackCard />}
            {gitView && <GitCard />}
            {ganttView && <Chart />}
        </main>
    )
}

export default FancyMenu
