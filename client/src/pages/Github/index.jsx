import React, { useEffect, useState } from 'react'
import { GitCommitCard } from '../../components';
import "./style.css"

function GitHubComments() {

    const [commits, setCommits] = useState(undefined)
    const [states, setStates] = useState(false)
    const [user, setUser] = useState("")
    const [repo, setRepo] = useState("")


    const clickHandler = (states) => {
        setStates(!states)
    }

    const nameHandler = (e) => {
        setUser(e.target.value)


    }
    const repoHandler = (e) => {
        setRepo(e.target.value)
    }

    useEffect(() => {

        async function loadCommits() {
            try {
                const response = await fetch(`https://api.github.com/repos/${user}/${repo}/commits`)
                const data = await response.json();
                setCommits(data)
            } catch (error) {
                console.log('There was an error', error);
            }
        }
        loadCommits()
    }, [states])



    return (

        <>
            <form>
                <label>
                    <div className='input-section'>
                        Name:
                        <input className='input-line' type="text" name="name" onChange={nameHandler} />
                    </div>

                </label>
                <label>
                    <div className='input-section'>
                        repository:
                        <input className='input-line' type="text" name="repository" onChange={repoHandler} />
                    </div>
                </label>
            </form>
            <button className='access-btn' onClick={() => { clickHandler(states) }}>Click me to get the commitCards</button>
            {states ? <ul>{commits && <GitCommitCard data={commits} />}</ul> : null}
        </>
    )
}

export default GitHubComments
