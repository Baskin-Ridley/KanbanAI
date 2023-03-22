import React, { useEffect, useState } from 'react'
import "./style.css"

function StackCard() {

    const [stack, setStack] = useState()
    const [title, setTitle] = useState("")
    const [tag, setTag] = useState("")
    const [states, setStates] = useState(false)
    const [titleView, setTitleView] = useState(true)
    const [latest, setLatest] = useState("question")


    const clickHandler = (states) => {
        setStates(!states)
    }
    const viewHandler = (states) => {
        setTitleView(!states)
    }
    const titleHandler = (e) => {
        setTitle(e.target.value.replace(" ", "%20"))
        setLatest("question")
    }
    const tagHandler = (e) => {
        setTag(e.target.value.replace(" ", "%20"))
        console.log("using tags")
        setLatest("tags")
        console.log(latest)
    }


    useEffect(() => {

        const fetchDataTitle = async () => {
            try {
                if (latest === "question") {
                    const response = await fetch(`https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${title}&site=stackoverflow`)
                    const data = await response.json()
                    setStack(data.items)
                    console.log("using questions")
                }
                if (latest === "tags") {
                    const responsetags = await fetch(`https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tag}&site=stackoverflow`)
                    const datatags = await responsetags.json()
                    setStack(datatags.items)
                    console.log("using tags")
                }


            } catch (error) {
                console.log(error)
            }
        }
        fetchDataTitle()
    }, [states])





    const rendering = (titleView) => {

        if (titleView) {
            return (
                <label>
                    <div className='input-section-stack'>
                        question to ask:
                        <br />
                        <input className='input-line-stack' type="text" name="question" onChange={titleHandler} />
                    </div>
                </label>
            )
        } else {
            return (
                <label>
                    <div className='input-section-stack'>
                        look for tag(s):
                        <br />
                        <input className='input-line-stack' type="text" name="tag" onChange={tagHandler} />
                    </div>
                </label>)
        }

    }

    const stackCard = (data) => {

        return (<>
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
            <button className='remove-stack-view' onClick={() => clickHandler(states)} >back</button>
        </>
        )
    }

    return (
        <>
            {rendering(titleView)}

            <button className='access-btn' id="view-button" onClick={() => { viewHandler(titleView) }}>{titleView == true ? "look for tags" : "look with title"}</button> <br />
            <button className='access-btn' id="question-button" onClick={() => { clickHandler(states) }}>Click me to get the questions</button>

            {states ? <ul>{stack && stackCard(stack)}</ul> : null}

        </>
    )



}

export default StackCard
