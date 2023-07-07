import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import './Footer.css'
function Footer() {
    return (
        <div className='footer-container'>Footer
            <section className='foot-subscription'>
                <p className='foot-subscription-heading'>Join us to get regular update  and best deals </p>
                <p className='foot-subscription-text'>You can subcribe any time</p>
                <div className='input-areas '>
                    <form className='f'>
                        <input placeholder='Your email' type='email' name='email' className='footer-input' />

                        <br></br>
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>

                </div>
            </section>

            <div className='footer-links'>
                <div className='footer-links-wrapper'>
                    <div className='footer-links-items'>
                        <h2>About US</h2>
                        <Link to='/Sign-up'>How it Works</Link>
                        <Link to='/Sign-up'>Testimonials</Link>
                        <Link to='/Sign-up'>Investors</Link>
                        <Link to='/Sign-up'>Terms of Services</Link>
                    </div>

                    <div className='footer-links-items'>
                        <h2>Company</h2>
                        <Link to='/Sign-up'>TRVL Instamart</Link>
                        <Link to='/Sign-up'>TRVL Blogs</Link>
                        <Link to='/Sign-up'>TRVL Genie</Link>

                    </div>

                    <div className='footer-links-items'>
                        <h2>Legal</h2>
                        <Link to='/Sign-up'>Privacy Policy</Link>
                        <Link to='/Sign-up'>Cookie Policy</Link>
                        <Link to='/Sign-up'>Offer Terms</Link>
                        <Link to='/Sign-up'>Phishing & Fraud </Link>
                    </div>

                    <div className='footer-links-items'>
                        <h2>TRVL verse</h2>
                        <Link to='/Sign-up'>Trivago</Link>
                        <Link to='/Sign-up'>Make my trip</Link>
                        <Link to='/Sign-up'>Yes-Go-Trip</Link>

                    </div>


                </div>
            </div>

            <div className='footer-icons'>
                <div className='footer-icons-wrap'>

                    <div className='footer-logo'>
                        <Link to='/Sign-up'><i class='fab fa-typo3' ></i>TRVL</Link>
                    </div>
                    <small className='small'>TRVL <i class="fa-regular fa-copyright"></i> 2023</small>


                    <div className='footer-icons-items'>
                        <Link to='/Sign-up' target='_blank' aria-label='Instagram' className='footer-icons-items-links'><i class="fa-brands fa-instagram"></i></Link>
                    </div>
                    <div className='footer-icons-items'>
                        <Link to='/Sign-up' target='_blank' aria-label='Instagram' className='footer-icons-items-links'><i class="fa-brands fa-facebook"></i></Link>
                    </div>
                    <div className='footer-icons-items'>
                        <Link to='/Sign-up' target='_blank' aria-label='Instagram' className='footer-icons-items-links'><i class="fa-brands fa-twitter"></i></Link>
                    </div>
                    <div className='footer-icons-items'>
                        <Link to='/Sign-up' target='_blank' aria-label='Instagram' className='footer-icons-items-links'><i class="fa-brands fa-linkedin"></i></Link>
                    </div>


                </div>

            </div>


        </div >
    )
}

export default Footer