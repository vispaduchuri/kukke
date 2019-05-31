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
            imglist:[],
            imageUrl:logo,
            imgurl:[]
        }

    }

    componentDidMount() {
        console.log(' I MOUNTED')
        // onSnapshot
        this.getitems();
        //this.getImages();
    }
    

    componentWillUnmount(){
        console.log(' I UNMOUNTED')

    }


    getitems(){
        const cards = []
        const imgid=[]
        db.collection('Products').get()
        .then(snapshot=>{

            snapshot.forEach(doc=>{
                cards.push(doc.data())
                imgid.push(doc.data().id)
                console.log(doc.data())
            })
            // this.state.cardsList = cards
            //console.log(imgid)
           // this.setState({cardsList:cards}, this.getImages())
           this.setState({cardsList:cards,imglist:imgid},this.getImages(imgid));
                 //console.log(this.state.imglist)
        })
    }

    getImages(imgid){
     //   console.log(imgid)   imgid is an array
        const cards = imgid
        
        const {cardsList,imglist}= this.state;
        
       console.log(cards)
       console.log(imglist)
    

    
        
         const imagePromises = [];
         cardsList.forEach(cards=>{
             console.log('1234')

            const imageRef = storage.refFromURL(`gs://prodet-ku.appspot.com/Products/${cards}/ECOHWF.png`)
            imagePromises.push(imageRef.getDownloadURL())
        })

        Promise.all(imagePromises).then(imageUrls=>{
            imageUrls.forEach(imageUrl=>{
                console.log(imageUrl)
            })
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
                    cover={<img alt={card.Name} src={imageUrl} />}
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
