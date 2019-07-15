import React, { Component } from "react";
import { Feed, Header, Icon, Divider } from "semantic-ui-react";
import FeedSpend from "../common/feedSpend";
import FeedSend from "../common/feedSend";
import FeedDistribute from "../common/feedDistribute";
import http from "../../services/httpService";

class InnovationFeed extends Component {
  state = { isFetching: false, feed: [] };

  async componentDidMount() {
    this.setState({ isFetching: true });
    let { data } = await http.get("http://localhost:3900/api/feed");
    data.sort((i, j) => j._id.localeCompare(i._id));
    this.setState({ isFetching: false, feed: data });
  }

  renderTransaction({ kind, sender, recipient, amount, description, hash }) {
    switch (kind) {
      case "spend":
        return (
          <FeedSpend
            sender={sender}
            amount={amount}
            description={description}
            hash={hash}
          />
        );
      case "send":
        return (
          <FeedSend
            sender={sender}
            recipient={recipient}
            amount={amount}
            description={description}
            hash={hash}
          />
        );
      case "dist":
        return (
          <FeedDistribute
            amount={amount}
            description={description}
            hash={hash}
          />
        );
    }
  }

  render() {
    console.log(this.state.transactions);

    return (
      <div className="ui segment">
        <Header as="h3">
          <Icon name="rss" />
          Activity Feed
        </Header>
        <Divider />
        <Feed>{this.state.feed.map(item => this.renderTransaction(item))}</Feed>
        <Divider />
        <a href="#">Load More</a>
      </div>
    );
  }
}

export default InnovationFeed;
