import React, { Component } from 'react'

import { Layout, Row, Col, Spin,Carousel, Breadcrumb, Statistic, Card } from 'antd';

import firebase from '../config/config';

import logo from './ECO/ECO1.png'
import { Skeleton } from 'antd';
import { Popover, Button } from 'antd';

var storage = firebase.storage();
const { Meta } = Card;
//const { Content, Sider } = Layout;


const db = firebase.firestore();

 class Eco extends Component {


    constructor(props){
        super(props)

        this.state={
            cardsList:[],
            imageIds:[],
            imageUrl:logo,
            imgurl:[]
        }

    }

    componentDidMount() {
        console.log(' I MOUNTED')
        // onSnapshot
        this.getItems();
        //this.getImages();
    }
    

    componentWillUnmount(){
        console.log(' I UNMOUNTED')

    }


    getItems(){
        const cards = []
        const imageIds=[]
        db.collection('Products').get()
        .then(snapshot=>{

            snapshot.forEach(doc=>{
                cards.push(doc.data())
                imageIds.push(doc.data().id)
                console.log(doc.data())
            })
            // this.state.cardsList = cards
            //console.log(imgid)
           // this.setState({cardsList:cards}, this.getImages())
           console.log(cards,imageIds)
           this.setState({cardsList:cards,imageIds:imageIds},this.getImages);
                 //console.log(this.state.imglist)
        })
    }

    getImages(){
     
        const {cardsList,imageIds}= this.state;
        
    //    console.log(cards)
       console.log(cardsList,imageIds)
         const imagePromises = [];
         cardsList.forEach((card,i)=>{
            //  console.log('1234')
            console.log('Image Id',imageIds[i]);
            const imageRef = storage.ref(`Products/${imageIds[i]}/image.png`);
            // 'gs://prodet-ku.appspot.com/Products/hOb3za4XBz4EqfU8FUJF/image.png'
            imagePromises.push(imageRef.getDownloadURL());
        })

        Promise.all(imagePromises).then(imageUrls=>{
            imageUrls.forEach((imageUrl,i)=>{
                console.log(imageUrl)
                cardsList[i].src = imageUrl; // Setting image Link retrieved from firebase storage to src property of the product
            })
            this.setState({cardsList})
        })

        
    
        // const imageRef = storage.refFromURL(`gs://prodet-ku.appspot.com/Products/${cards[6]}/image.png`)

        // console.log('hi')
        // imageRef.getDownloadURL().then(url=>{
        //     console.log(url)
        //     this.setState({imgurl:url})
        // })
    }



    render() 
    {

        const { cardsList, imageUrl,imgurl,imglist } = this.state;

        return (
            <div>  
                {/* <Spin />
                <Skeleton active /> */}

                {cardsList.map(card=>(
                    <Popover content={card.Desc}>
                        
                    <Card
                    hoverable
                    style={{ width: 250, margin:20 }}
                    cover={<img alt={card.Name} src={card.src} />}
                    >
                        <Meta title={card.Name} description={'Rs.' + card.Price } />
                    </Card>
                    </Popover>
                ))}

                
                
           
                <div>
                    <h1>Eco cards here</h1>
                </div>
            </div>
        )
    }
}

export default Eco
