import React from 'react'
import { useView } from '../../context/UserContext'
import "../../index.css"

export const FloatingMenu = () => {

    const { stackView, setStackView, gitView, setGitView, ganttView, setGanttView } = useView()

    const stackHandler = () => {
        setStackView(!stackView)
        if (gitView) {
            setGitView(!gitView)
        }
        if (ganttView) {
            setGanttView(!ganttView)
        }
    }
    const gitHandler = () => {
        setGitView(!gitView)
        if (stackView) {
            setStackView(!stackView)
        }
        if (ganttView) {
            setGanttView(!ganttView)
        }
    }
    const ganttHandler = () => {
        setGanttView(!ganttView)
        if (stackView) {
            setStackView(!stackView)
        }
        if (gitView) {
            setGitView(!gitView)
        }
    }


    return (
        <>
            <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />

            <div className="fancymenu-container filter url('#goo')" >
                <div className='wrapper-hamburger' style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <nav className="filter url('#goo') absolute ?*bottom-12 left-1/2 transform -translate-x-1/2 pt-5 pl-48 w-96 h-64 box-border text-base text-left bg-transparent"> */}

                    <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open" />
                    <label className="menu-open-button" htmlFor="menu-open">
                        <span className="hamburger hamburger-1"></span>
                        <span className="hamburger hamburger-2"></span>
                        <span className="hamburger hamburger-3"></span>
                    </label>
                    <a href="#" className="menu-item" onClick={() => stackHandler()}> <i className="fa fa-stack-overflow"></i> </a>
                    <a href="#" className="menu-item" onClick={() => gitHandler()}> <i className="fa fa-git"></i> </a>
                    <a href="#" className="menu-item" onClick={() => ganttHandler()}>  <i className="fa fa-bar-chart"></i> </a>
                </div>
                <svg>
                    <defs>
                        <filter id="gooeyEffect">
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                            <feOffset in="shadow" dx="1" dy="1" result="shadowOffset" />
                            <feComposite in2="shadowOffset" in="goo" result="gooWithShadow" />
                            <feComposite in2="gooWithShadow" in="SourceGraphic" result="mix" />
                        </filter>

                        <filter id="blurryEffect">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feComposite in2="goo" in="SourceGraphic" result="mix" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </>
    );
}
