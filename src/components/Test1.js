/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Layout, Row, Col, Spin, Menu, Icon, Card, Select, Pagination } from 'antd';
import firebase from '../config/config';

const { Content, Sider } = Layout;
const { Meta } = Card;
const { Option } = Select;


//  Initalize firestore reference
const db = firebase.firestore();

class Test1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  componentDidMount() {
  
    this.getItems();
  
  }

  getItems() {
    const { setItems} = this.state;
   
      const itemsList = [];
      db.collection('Products').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
              console.log(doc.data());
           const ps= itemsList.push(doc.data());
          });
        
        });
    }
  
  render() {
    // console.log(this.state.selectedItems);
    return (
      <React.Fragment>
        <Layout style={{ margin: '16px 0', padding: '12px 0', background: '#fff' }}>
          
        
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Row style={{ padding: '10px 5px' }}>
              <h2>{this.state.selectedCategory}</h2>
              {this.state.allSelected ? null : (
                <Col xs={24} sm={16} md={8}>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Filter Sub-Categories"
                    defaultValue={[]}
                    onChange={this.handleSubcategoryChange}
                  >
                    {this.state.subcategories.map(subcat => (
                      <Option key={subcat}>{subcat}</Option>
                    ))}
                  </Select>
                </Col>
              )}
            </Row>
            {this.state.mainLoading ? (
              <Row type="flex" justify="center" align="middle">
                <Spin size="medium" />
              </Row>
            ) : (
              <Row>
                {this.state.selectedItemsPage.map(item => (
                  <Col style={{ padding: '10px 0' }} xs={8}>
                    <a>
                     <Card
            hoverable
            style={{ width: 250, margin:20 }}
            cover={<img alt="example" />}
          >
            <Meta title="BATHROOM CLEANER" description="Rs.600" />
          </Card>
           
                      <Card
                        onClick={() => this.onClickItem(item.itemId)}
                        style={{ width: 300 }}
                     
                      >
                        <Meta
                          title={item.itemName}
                          description={
                            <React.Fragment>
                              {item.sellCheck ? (
                                <p style={{ float: 'left' }}>Buy: Rs {item.sellPrice}</p>
                              ) : null}
                              {item.rentCheck ? (
                                <p style={{ float: 'right' }}>Rent: Rs {item.rentPrice}</p>
                              ) : null}
                            </React.Fragment>
                          }
                        />
                      </Card>
                    </a>
                  </Col>
                ))}
              </Row>
            )}
            <Row type="flex" justify="center" align="middle">
              <Pagination
                hideOnSinglePage
                current={this.state.currentPageNumber}
                onChange={this.onChangePage}
                defaultPageSize={9}
                total={this.state.selectedItems.length}
              />
            </Row>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }



}

export default Test1

