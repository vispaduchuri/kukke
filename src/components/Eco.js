import React, { Component } from 'react'

import { Layout, Row, Col, Spin, Breadcrumb, Statistic, Card } from 'antd';

import firebase from '../config/config';

import logo from './ECO/ECO1.png'

var storage = firebase.storage();
const { Meta } = Card;
const { Content, Sider } = Layout;


const db = firebase.firestore();

 class Eco extends Component {


    constructor(props){
        super(props)

        this.state={
            cardsList:[],
            imageUrl:logo
        }

    }

    componentDidMount() {
        console.log(' I MOUNTED')
        // onSnapshot
        this.getitems();
    }
    

    componentWillUnmount(){
        console.log(' I UNMOUNTED')

    }


    getitems(){
        const cards = []
        db.collection('Products').get()
        .then(snapshot=>{

            snapshot.forEach(doc=>{
                cards.push(doc.data())
                console.log(doc.data())
            })
            // this.state.cardsList = cards

            this.setState({cardsList:cards}, this.getImages())
        })
    }

    getImages(){
        const { cardsList } = this.state;
        
        // const imagePromises = [];
        // cardsList.forEach(card=>{

        //     const imageRef = storage.refFromURL(`gs://prodet-ku.appspot.com/Products/${card.id}/ECOHWF.png`)
        //     imagePromises.push(imageRef.getDownloadURL())
        // })

        // Promise.all(imagePromises).then(imageUrls=>{
        //     imageUrls.forEach(imageUrl=>{
        //         console.log(imageUrl)
        //     })
        // })

        cardsList.forEach(card=>{
           let counter=1
            console.log(counter=counter+1)
            console.log('hello')
        })

        

        const imageRef = storage.refFromURL(`gs://prodet-ku.appspot.com/Products/3ru7YfbqamQUYS6fDHtU/image.png`)

        console.log('hi')
        imageRef.getDownloadURL().then(url=>{
            console.log(url)
            this.setState({imageUrl:url})
        })
    }

    render() 
    {

        const { cardsList, imageUrl } = this.state;

        return (

            <div>  
                {cardsList.map(card=>(
                    <Card
                    hoverable
                    style={{ width: 250, margin:20 }}
                    cover={<img alt={card.Name} src={imageUrl} />}
                    >
                        <Meta title={card.Name} description={card.Price} />
                    </Card>
                ))}
                
           
                <div>
                    <h1>Eco cards here</h1>
                </div>
            </div>
        )
    }
}

export default Eco
