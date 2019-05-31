import React, {Component} from 'react';
import { PageHeader, Typography } from 'antd';


const { Paragraph } = Typography;

class Home extends Component{
    

    
    
    
    render(){
       
        return(

<div className="wrap">

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