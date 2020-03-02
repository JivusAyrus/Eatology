import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../Css/ControlledCarousel.css'
function ControlledCarousel() {
  
    return (
        <Carousel className="carou">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./b.jpg')}
            alt="First slide"
            height="350px"
            style={{zIndex:"0"}}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./a.jpg')}
            alt="Second slide"
            height="350px"
            style={{zIndex:"0"}}
          />
      
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./d.jpg')}
            alt="Third slide"
            height="350px"
            style={{zIndex:"0"}}
          />
      
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  

export default ControlledCarousel
