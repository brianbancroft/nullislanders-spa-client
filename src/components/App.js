import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import "./App.css";

const query = gql`
  {
    posts {
      id
      numberVotes
      body
      uri
      user {
        username
      }
    }
  }
`;

const Post = ({ body, uri, id } = {}) => (
  <a href={uri} key={id}>
    <li className="post">{body}</li>
  </a>
);
const renderPosts = posts =>
  posts.map(({ body, uri, id } = {}) => <Post body={body} uri={uri} id={id} />);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  async componentWillMount() {
    const client = new ApolloClient({
      uri: "http://localhost:3000/graphql"
    });

    const { data } = await client.query({ query });
    const { posts } = data;
    this.setState({ posts });
  }

  render() {
    return (
      <main>
        <section>
          <h1>Null Islanders</h1>
        </section>
        <section>
          <ul>{renderPosts(this.state.posts)}</ul>
        </section>
      </main>
    );
  }
}

export default App;
