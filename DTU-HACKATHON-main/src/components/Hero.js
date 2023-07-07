import React from 'react'
import { Button } from './Button'
import './Hero.css';
import videos from '../videos/cargo1.mp4';
import Typical from 'react-typical'
function Hero() {
    return (
        <div className='hero-container'>


            <video src={videos} autoPlay loop muted></video>
            <h1>CARGO

                <Typical
                    loop={Infinity}
                    wrapper='b'
                    steps={[
                        'HIVE',
                        1000,
                        '',
                        1000,
                        'HIVE',
                        1000

                    ]}
                />
            </h1>

            <p>Simplify your supply chain, amplify your success</p>
            
        </div>
    );
};

export default Hero;
