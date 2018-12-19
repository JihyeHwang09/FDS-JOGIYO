import React, { Component } from 'react';
import UserReviewView from '../components/UserReviewView';
import api from '../api';

export default class UserReview extends Component {
  static defaultProps = {
    storeId: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      review: [],
    };
  }
  async componentDidMount() {
    const { storeId } = this.props;
    const { data: review } = await api.get(
      '/restaurants/api/' + storeId + '/review/'
    );
    this.setState({
      review,
    });
  }

  // postTimeCheck(input) {
  //   let dd = input.getDate();
  //   let mm = input.getMonth() + 1;
  //   let yyyy = input.getFullYear();

  //   if (dd < 10) {
  //     dd = '0' + dd;
  //   }
  //   if (mm < 10) {
  //     mm = '0' + mm;
  //   }

  //   return (input = yyyy + '년 ' + mm + '월 ' + dd + '일 ');
  // }

  timeDiff(time) {
    const currentTime = new Date();
    const postTime = new Date(time);

    const diff = (currentTime.getTime() - postTime.getTime()) / 1000;
    let dd = postTime.getDate();
    let mm = postTime.getMonth() + 1;
    let year = postTime.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    let posted = year + '년 ' + mm + '월 ' + dd + '일 ';

    if (diff < 60) {
      return '방금 전';
    } else if (diff >= 60 && diff < 3600) {
      return Math.trunc(diff / 60) + '분 전';
    } else if (diff >= 3600 && diff < 86400) {
      return Math.trunc(diff / 3600) + '시간 전';
    } else if (diff >= 86400 && diff < 86400) {
      return Math.trunc(diff / 86400) + '일 전';
    } else {
      return posted;
    }
  }

  render() {
    const { review } = this.state;
    return (
      <div>
        <UserReviewView review={review} timeDiff={this.timeDiff.bind(this)} />
      </div>
    );
  }
}
