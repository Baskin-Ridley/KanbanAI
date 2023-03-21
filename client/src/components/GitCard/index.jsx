import React from 'react'

function GitCommitCard({ data }) {

    return (
        <div className="gitCardContainer">
            {Object.keys(data).map((e, i) => (
                <div className='gitCard'>
                    <li key={i}> author: {data[e].author ? <a href={data[e].author.html_url}>{data[e].author.login} </a> : "System Merge"} </li>
                    <li> {data[e].parents ? <a href={data[e].parents[0].html_url} > commit: {data[e].commit.message} </a> : "missing parent repository"} </li>
                    {data[e].author ? <li>  at: {data[e].commit.author.date.slice(11, 16)} day: {data[e].commit.author.date.slice(0, 10)} </li> : <li>missing author for the commit</li>}

                </div>
            ))}
        </div>
    )
}

export default GitCommitCard
