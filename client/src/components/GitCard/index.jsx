import React, { useEffect, useState } from 'react'
import "./style.css"

function GitCommitCard() {

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


    const gitCommitCard = (data) => {
        return (
            <>
                <div className="gitCardContainer">
                    {Object.keys(data).map((e, i) => (
                        <div className='gitCard'>
                            <li key={i}> author: {data[e].author ? <a href={data[e].author.html_url}>{data[e].author.login} </a> : "System Merge"} </li>
                            <li> {data[e].parents ? <a href={data[e].parents[0].html_url} > commit: {data[e].commit.message} </a> : "missing parent repository"} </li>
                            {data[e].author ? <li>  at: {data[e].commit.author.date.slice(11, 16)} day: {data[e].commit.author.date.slice(0, 10)} </li> : <li>missing author for the commit</li>}

                        </div>
                    ))}
                </div>
                <button className='remove-git-view' onClick={() => clickHandler(states)} >back</button>
            </>
        )
    }

    return (

        <>
            <form>
                <label>
                    <div className='name-input'>
                        Name:
                        <br />
                        <input className='input-line-git' type="text" name="name" onChange={nameHandler} />
                    </div>

                </label>
                <label>
                    <div className='repo-input'>
                        Repository:
                        <br />
                        <input className='input-line-git' type="text" name="repository" onChange={repoHandler} />
                    </div>
                </label>
            </form>
            <button className='access-btn' id="commit-btn" onClick={() => { clickHandler(states) }}>Click me to get the commitCards</button>
            {states ? <ul>{commits && gitCommitCard(commits)}</ul> : null}

        </>
    )


}

export default GitCommitCard
