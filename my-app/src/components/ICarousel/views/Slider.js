import React from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import { TRANSITION_DURATION } from "../index"


const Slider = ({ images, curr, direction, titles, descriptions }) => {

    const groups = ["to-left", "to-right"]

    return (
        groups.map(group => {
            const visible = (direction === "forward" && group === "to-left") || (direction === "backward" && group === "to-right")

            return (
                <div key={group} className="react-carousel_slide-wrap" style={{ visibility: visible ? "visible" : "hidden" }}>
                    <TransitionGroup>
                        {images.map(
                            (img, index) =>
                                index === curr && (
                                    <CSSTransition key={index} timeout={TRANSITION_DURATION} classNames={`react-carousel_slide-${group}`}>
                                        {/* <div className="react-carousel_image-wrapper" style={{ backgroundImage: `url("${images[index]}")` }} /> */}
                                        <div className="react-carousel_image-wrapper">
                                            <p>{titles[index]}</p>
                                            <p>{descriptions[index]}</p>
                                            <div className="carousel_image">
                                                <img                                                
                                                    role="img"
                                                    alt="img"
                                                    src={img}
                                                />
                                            </div>
                                        </div>
                                    </CSSTransition>
                                )
                        )}
                    </TransitionGroup>
                </div>
            )
        })

    )
}
export default Slider
