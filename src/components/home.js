import React, {Component} from 'react';
import { PageHeader,Carousel, Typography } from 'antd';
import '../css/carousel.css';


const { Paragraph } = Typography;







class Home extends Component{
    

    
    
    
    render(){
       
        return(



<div className="wrap">
<Carousel autoplay>
    <div>
      <h3>Need Chemical Solutions For your Company?</h3>
    </div>
    <div>
      <h3>Want to Save on Chemical Costs?</h3>
    </div>
    <div>
      <h3>Then You have come to the right place</h3>
    </div>
    <div>
      <h3>Explore our products Range and Contact us for Solutions</h3>
      
    </div>
  </Carousel>

<div className="extraContent">
            <img
              src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
               alt="content"
  />
            </div>
<div className="content">
            <h1>HOME PAGE</h1>
          <Paragraph>
            Kukke Enterprise is a Chemical and House Keeping Solutions Expert. 
          </Paragraph>
          <Paragraph>
          We Offer various Solutions Ranging from chemical products to House keeping needs.
          </Paragraph>
          
        </div>

       
        </div>






        )
        
        
    
    }
}

export default Home