import React, { useState } from 'react'
import './slider.css'
import SliderBtn from './SliderBtn'
import dataSlider from './dataSlider'
import laptop from '../../images/laptop.jpg'
// import laptop from '../../images/laptop.jpg'
import Jumbotron from '../Jumbotron'



export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === dataSlider.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div

                        key={obj.id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                        id="slides"
                        style={{ backgroundImage: `url(${obj.src})`, backgroundSize: 'cover' }}
                    >
                        {/* <img
                            src={obj.src}
                        /> */}

                    </div>
                )
            })}
            <SliderBtn moveSlide={nextSlide} direction={"next"} />
            <SliderBtn moveSlide={prevSlide} direction={"prev"} />

            <div className="container-dots">

                {Array.from({ length: 5 }).map((item, index) => (
                    <div
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}