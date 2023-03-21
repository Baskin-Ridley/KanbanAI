import React from 'react'

function StackCard({ data }) {

    return (
        <div className="stackContainer">
            {data.map((e, i) => (
                e.is_answered == true ?
                    <div className='stackCard'>
                        <li key={i}><a href={e.link}>{e.title}</a></li>
                        <li > tags :{e.tags.toString()}</li>
                    </div>
                    :
                    null
            ))}
        </div>
    )

}

export default StackCard
