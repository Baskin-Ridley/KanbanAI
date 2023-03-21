import React, { useEffect, useState } from 'react'
import { GitCommitCard } from '../../components';
import "./style.css"

function GitHubComments() {

    const [commits, setCommits] = useState()

    useEffect(() => {

        async function loadCommits() {
            try {
                const response = await fetch("https://api.github.com/repos/Baskin-Ridley/final-project/commits")
                const data = await response.json();
                setCommits(data)
            } catch (error) {
                console.log('There was an error', error);
            }
        }
        loadCommits()
    }, [])

    return (

        <>
            <ul>
                {commits && <GitCommitCard data={commits} />}
            </ul>
        </>
    )
}

export default GitHubComments
