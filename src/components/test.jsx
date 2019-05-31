import React, { Component } from 'react'

import { Layout, Row, Col, Spin, Breadcrumb, Statistic, Card } from 'antd';
import firebase from '../config/config';
import logo from './ECO/ECO1.png'
const { Meta } = Card;
const { Content, Sider } = Layout;


const db = firebase.firestore();

 class test extends Component {

    componentDidMount() {
    this.getitems();
    }
getitems(){
    const itemsList = [];
    db.collection("Products").get().then(snapshot => {
        snapshot.forEach(function(doc) {
            itemsList.push(doc.data());
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        this.props.setItems(itemsList);
    });
   
}
    render() 
    {
        return (





            
            <div>
                
           { <Card
            hoverable
            style={{ width: 250, margin:20 }}
            cover={<img alt="example" src={logo} />}
          >
            <Meta title="BATHROOM CLEANER" description="Rs.600" />
          </Card>
           }

          
            <div>
                <h1>Eco cards here</h1>
            </div>
            </div>
        )
    }
}

export default test
