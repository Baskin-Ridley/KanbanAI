import React, { useEffect } from 'react'

function StackOverFlow() {

    useEffect(() => {
        fetch('https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=react%20does%20not%20start&site=stackoverflow')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }, [])


    return (
        <div>StackOverFlow</div>
    )
}

export default StackOverFlow
