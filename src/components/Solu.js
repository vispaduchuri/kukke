import React, { Component } from 'react'

import { Layout, Row, Col, Spin,Carousel, Breadcrumb, Statistic, Card } from 'antd';

import firebase from '../config/config';

import logo from './ECO/image.png'
import { Skeleton } from 'antd';
import { Popover, Button } from 'antd';
import '../css/carousel.css';


var storage = firebase.storage();
const { Meta } = Card;
//const { Content, Sider } = Layout;


const db = firebase.firestore();
 class Solu extends Component {

     constructor(props){
         super(props)

         this.state={
             imageId:[],
             cardsList:[],
             imageUrl:[],
         }
     }

    componentDidMount(){
        this.getitems()
    }
     

    componentWillUnmount(){

    }

    getitems(){
        const cards=[]
        const imgids=[]

        db.collection('Solu').get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                cards.push(doc.data())
                imgids.push(doc.data().id)
            })

            this.setState({cardsList:cards,imageId:imgids},this.getImages);

        })


    }

    getImages(){
        const {cardsList,imageId} = this.state  
        
        const imgpromise=[]
        cardsList.forEach((card,i)=>{
            const imageRef = storage.ref(`Solu/V1idv9v6hWfksmQ4kvDf/image.jpeg`);
            
            imgpromise.push(imageRef.getDownloadURL()); 
        })

        Promise.all(imgpromise).then(imageUrls=>{
            imageUrls.forEach((imageUrl,i)=>{
                console.log(imageUrl)
                cardsList[i].src = imageUrl; // Setting image Link retrieved from firebase storage to src property of the product
            })
            this.setState({cardsList})
    
                 }
    )}




    render() {
        
        const { cardsList, imageUrl,imgurl,imglist } = this.state;
        return (

            <div>
                
                 
                        <img src={logo} alt='Soluball'/>
                  
                        <Carousel autoplay>
                            <div><h2>A REVOLUTIONARY WAY OF CLEANING</h2></div>
                            <div><h2>Soluball is a nimble and fuss free floor cleaner that lies in the palm of your hand.</h2></div>
                            <div><h2>Just toss one SOLUBALL in a bucket of water for a seamless cleaning experience.</h2></div>
                        </Carousel>
            
                <div>
                    {

                   
                         cardsList.map(card=>(
                            <Popover content={card.Desc} >
                                
                            <Card
                            hoverable
                            style={{ width: 250, margin:20 }}
                            cover={<img alt={card.Name} src={card.src} />}
                            >
                                <Meta title={card.Name} description={'Rs.' + card.Price }  />
                            </Card>
                            
                            </Popover>
                        ))
                    }
                
           
            <div>
                
                <h1>Soluball cards here</h1>
            </div>
            </div>
            </div>
        )
    }
}

export default Solu
