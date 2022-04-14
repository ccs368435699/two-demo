import React, { Fragment } from "react"

export default function Navigation({ onPrev, onNext }) {
    return (
        <Fragment>
            <span className="react-carousel_navigation-prev" onClick={onPrev} />
            <span className="react-carousel_navigation-next" onClick={onNext} />
        </Fragment>
    )
}
