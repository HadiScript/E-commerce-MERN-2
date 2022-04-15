import React from 'react'

const A_Card = ({ item }) => {
    return (
        <div className="box bg1" style={{ backgroundImage: `url("${item.images[0].url}")` }} >
            <h2>${item.price}.00</h2>
            <div className="box-sub">{item.name}</div>
            <div className="circle btn btn-outline-danger" style={{ fontWeight: "bold" }}> ADD TO CART </div>
        </div>
    )
}

export default A_Card
