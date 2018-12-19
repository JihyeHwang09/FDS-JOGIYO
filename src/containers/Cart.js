import React, { Component } from 'react';
import CartView from '../components/CartView';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: JSON.parse(sessionStorage.cart),
    };

    this.handleDelete.bind(this);
    this.handleDeleteAll.bind(this);
    this.checkFoodIndex = this.checkFoodIndex.bind(this);
  }
  // componentDidMount() {
  //   this.refreshCart();
  // }

  // 주문하기를 위한 핸들러가 필요 -> 주문하기를 누르면 주소가 포함된 주문 상세 페이지로 이동
  // handleOrderClick = async (...) => {세션에 set하기}

  // 메뉴추가하기 -> 원래 보고있던 상점 페이지로 이동...
  // link를 사용해서 /store/id 이런 식으로 보낼 수 있을 것 같다.

  // 카트에서 삭제
  async handleDelete(selectedId) {
    let newOrderList = this.state.orderList;

    let currentIndex = newOrderList.findIndex(i => {
      return i.id === selectedId;
    });

    newOrderList.splice(currentIndex, 1);

    this.setState({
      orderList: newOrderList,
    });

    sessionStorage.setItem('cart', JSON.stringify(newOrderList));
  }

  // 선택된 음식 식별을 위한...
  checkFoodIndex(id) {
    let list = this.state.orderList;
    return list.some(i => {
      return i.id === id;
    });
  }

  // 모두 삭제도 필요 -> 이것도 역시 view에서의 상태조작일 것이기 때문에
  handleDeleteAll() {
    let newOrderList = this.state.orderList;
    newOrderList.splice(0, newOrderList.length);
    this.setState({
      orderList: newOrderList,
    });
    sessionStorage.setItem('cart', JSON.stringify(newOrderList));
  }

  render() {
    console.log(this.state.orderList);
    return (
      <CartView
        orderList={this.state.orderList}
        handleDelete={this.handleDelete.bind(this)}
        handleDeleteAll={this.handleDeleteAll.bind(this)}
        key={this.state.orderList.length}
      />
    );
  }
}
