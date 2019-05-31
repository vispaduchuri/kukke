import React,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Home from './components/home'
import About from './components/About'
import Contact from './components/Contact'
import Eco from './components/Eco'
import Test1 from './components/Test1'
import Solu from './components/Solu'
import {  Menu} from 'antd';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Header, Footer } = Layout;
// eslint-disable-next-line no-lone-blocks
{/*const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
*/}
class App extends Component {

  constructor(props) {
    super(props)

    this.state ={
      pages:['Home','About','Eco Organics','Soluball','Contact Us'],
      currentPage:0,
      key:1,
    }
  }

  goToPage(key){
    console.log(key)
    // this.state.currentPage= index
    this.setState({currentPage:key});

  }

  render(){
    
    
    const { pages, currentPage } = this.state;
    return(
      <div className='App'> 
      <Layout className="layout">
      <Header >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px', fontSize: '20px', color: 'black'}}
      >
      
        {pages.map((pageName,key)=><Menu.Item type="primary" onClick={()=>this.goToPage(key)}>{pageName}</Menu.Item>)}
    
      </Menu>
    </Header>
    </Layout>

   
    
      {currentPage === 0 ? <Home />: null}
      {currentPage === 1 ? <About />: null}
      {currentPage === 2 ? <Eco />: null}
    {currentPage === 3 ? <Solu />: null}
    {currentPage === 4 ? <Contact/>: null}

   
    
         

      <Layout>  
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>   
  </Layout>
  </div>
    );
  }
}

export default App;
