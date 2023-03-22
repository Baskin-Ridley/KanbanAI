import React, { useEffect, useState } from 'react'
import { StackCard } from '../../components'
import "./style.css"

function StackOverFlow() {
    const [stack, setStack] = useState()
    const [title, setTitle] = useState("")
    const [tag, setTag] = useState("")
    const [states, setStates] = useState(false)
    const [titleView, setTitleView] = useState(true)


    const clickHandler = (states) => {
        setStates(!states)
    }
    const viewHandler = (states) => {
        setTitleView(!states)
    }
    const titleHandler = (e) => {
        setTitle(e.target.value.replace(" ", "%20"))
        console.log(title)
    }
    const tagHandler = (e) => {
        setTag(e.target.value.replace(" ", "%20"))
    }


    useEffect(() => {

        const fetchDataTitle = async () => {
            try {
                if (title != "") {
                    const response = await fetch(`https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${title}&site=stackoverflow`)
                    const data = await response.json()
                    setStack(data.items)
                    console.log(data)
                }


            } catch (error) {
                console.log(error)
            }
        }

        fetchDataTitle()
    }, [states])

    useEffect(() => {

        const fetchDataTagged = async () => {
            try {
                if (tag != "") {
                    const response = fetch(`https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tag}&site=stackoverflow`)
                    const data = await response.json()
                    setStack(data)
                    console.log(data)
                }


            } catch (error) {
                console.log(error)
            }
        }

        fetchDataTagged()
    }, [states])



    const rendering = (titleView) => {

        if (titleView) {
            return (
                <label>
                    <div className='input-section'>
                        question to ask:
                        <input className='input-line' type="text" name="question" onChange={titleHandler} />
                    </div>
                </label>
            )
        } else {
            return (
                <label>
                    <div className='input-section'>
                        look for tag(s):
                        <input className='input-line' type="text" name="tag" onChange={tagHandler} />
                    </div>
                </label>)
        }

    }


    return (
        <>
            {rendering(titleView)}
            <button className='access-btn' onClick={() => { clickHandler(states) }}>Click me to get the questions</button>
            <button className='access-btn' onClick={() => { viewHandler(titleView) }}>{titleView == true ? "look for tags" : "look with title"}</button>
            {states ? <ul>{stack && <StackCard data={stack} />}</ul> : null}

        </>
    )
}

export default StackOverFlow
