import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import video from '../videos/video1.mp4'
import pic1 from '../images/product_track1.jpeg'
import pic2 from '../images/product_track.jpg'
import pic3 from '../images/marketplace.jpg'


function Cards() {
    return (
        <div className='cards'>

            <video src={video} autoPlay loop muted></video>
            <h1>TRY US OUT</h1>

            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>


                        <CardItem
                            src={pic2}
                            text={<a href='https://6428ed806bcf2c26ed507ccb--timely-lolly-3f33f7.netlify.app//'> Product lineage tracking</a>}
                            label='Services'
                        />

                        <CardItem
                            src={pic3}
                            text={<a href="https://dhruvmahalwar-forecasting-main-vo7ngi.streamlit.app/">Inventory Demand Projection and Analysis</a>}
                            label='product'
                        />


                    </ul>
                    {/* <ul className='cards__items'>
                        <CardItem
                            src={pic3}
                            text="Rome"
                            label='Fun'
                            path='/services'
                        />
                        <CardItem
                            src={pic4}
                            text="Switzerland"
                            label='Fun'
                            path='/services'
                        />
                    </ul> */}
                    {/* <ul className='cards__items'>
                        <CardItem
                            src={pic5}
                            text="France"
                            label='Fun'
                            path='/services'
                        />
                        <CardItem
                            src={pic6}
                            text="Amazon"
                            label='Fun'
                            path='/services'
                        />
                    </ul> */}

                </div>

            </div>

        </div>
    )
}

export default Cards
