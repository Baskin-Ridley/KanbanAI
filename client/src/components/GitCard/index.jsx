import React from 'react'

function GitCommitCard({ data }) {

    console.log(data)
    return (
        <>
            {Object.keys(data).map((e, i) => (
                <li> {data[e].author.login} </li>
            ))}
        </>
    )
}

export default GitCommitCard
