import React from 'react'

function GitCommitCard({ data }) {

    console.log(data)
    return (
        <>
            {Object.keys(data).map((e, i) => (
                <div className='gitCard'>
                    <li key={i}> author: {data[e].author ? data[e].author.login : "System"} </li>
                    <li> commit: {data[e].commit.message}</li>
                    <li>  at: {data[e].commit.author.date.slice(11, 16)} day: {data[e].commit.author.date.slice(0, 10)} </li>
                </div>
            ))}
        </>
    )
}

export default GitCommitCard
