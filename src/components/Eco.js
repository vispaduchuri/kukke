import React, { Component } from 'react'

import { Layout, Row, Col, Spin,Carousel, Breadcrumb, Modal, Card } from 'antd';

import firebase from '../config/config';

import logo from './ECO/logo1.png'
import { Skeleton } from 'antd';
import { Popover, Button } from 'antd';


var storage = firebase.storage();
const { Meta } = Card;
//const { Content, Sider } = Layout;


const db = firebase.firestore();

const pStyle={
    fontSize: '20px',
};

const imgSt={
    margin:'35px'
}


 class Eco extends Component {


    constructor(props){
        super(props)

        this.state={
            cardsList:[],
            imageIds:[],
            imageUrl:logo,
            imgurl:[],
            visible : false

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

    openModal(props) {
        this.setState({
            visible : true,
            Name: props.Name,
            Desc : props.Desc,
            Dil : props.Dilution
        });

       console.log(props.Name)
    }

    closeModal() {
        this.setState({
            visible : false

        });
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

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    


    render() 
    {

        const { cardsList, imageUrl,imgurl,imglist , Name, Desc, Dil} = this.state;

        return (
            <div>  
                {/* <Spin />
                <Skeleton active /> */}

                <img src={logo} alt='Eco Organics' style={imgSt}/>


                <Carousel autoplay>
                            <div><h2>Eco Organics India is a leading company in hygiene care chemicals and service. </h2></div>
                            
                        </Carousel>


                <div>
                {cardsList.map((card,i)=>(
                    
                        
                    <Card
                    hoverable
                    style={{ width: 250, margin:20 }}
                    cover={<img alt={card.Name} src={card.src} />}
                    >
                        <Meta title={card.Name} description={'Rs.' + card.Price } style={pStyle} />
                        


                        
                         
                         <input type="button" value="Click Me!" onClick={() => this.openModal(card)} />
                         <Modal visible={this.state.visible} onOk={this.handleOk}
                         onCancel={this.handleCancel} width="400" height="300"  onClickAway={() => this.closeModal()}>
                           <div>
                         <h1>Name: {Name}</h1>
                         <h2>Desc: {Desc}</h2>
                         <h3>Dilution: {Dil}</h3>

                         </div>
                         </Modal>
                        




                    </Card>
                    
                ))}

                
                
           
                <div>
                    <h1>Eco cards here</h1>
                </div>
            </div>
            </div>
        )
    }
}

export default Eco
