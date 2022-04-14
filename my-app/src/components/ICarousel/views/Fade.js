import React from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import { TRANSITION_DURATION } from "../index"

function Fade({ images = [], curr = 0 }) {
    return (
        <TransitionGroup>
            {images.map(
                (img, i) =>
                    i === curr && (
                        <CSSTransition key={i} timeout={TRANSITION_DURATION} classNames="react-carousel_fade">
                            <div className="react-carousel_image-wrapper" style={{ backgroundImage: `url("${images[i]}")` }} />
                        </CSSTransition>
                    )
            )}
        </TransitionGroup>
    )
}

export default Fade
