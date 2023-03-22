import React from 'react'

const FloatingMenu = () => {

    const stackHandler = () => {

        console.log("clicked!")
    }


    return (
        <>
            <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />

            <nav className="menu">
                <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open" />
                <label className="menu-open-button" htmlFor="menu-open">
                    <span className="hamburger hamburger-1"></span>
                    <span className="hamburger hamburger-2"></span>
                    <span className="hamburger hamburger-3"></span>
                </label>

                <a href="#" className="menu-item" onClick={() => stackHandler()}> <i className="fa fa-bar-chart"></i> </a>
                <a href="#" className="menu-item"> <i className="fa fa-plus"></i> </a>
                <a href="#" className="menu-item"> <i className="fa fa-heart"></i> </a>

            </nav>
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


        </>
    );

}

export default FloatingMenu
