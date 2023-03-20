import React from 'react'

function GitCommitCard({ data }) {

    console.log(data)
    return (
        <>
            {Object.keys(data).map((e, i) => (
                <li key={i}>author: {data[e].author.login} <br /> commit: {data[e].commit.message}<br /> at: {data[e].commit.author.date.slice(11, 16)} day: {data[e].commit.author.date.slice(0, 10)} </li>
            ))}
        </>
    )
}

export default GitCommitCard
