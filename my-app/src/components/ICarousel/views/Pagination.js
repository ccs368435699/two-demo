import React from "react"

function Pagination({ images, curr, onChange }) {
    return (
        <div className="react-carousel_pagination-container">
            <ul className="react-carousel_pagination-bar">
                {images.map((img, index) => (
                    <li
                        key={index}
                        className={index === curr ? "react-carousel_pagination-item-active" : "react-carousel_pagination-item"}
                        onClick={() => onChange(index)}
                    />
                ))}
            </ul>           
        </div>
    )
}

export default Pagination
