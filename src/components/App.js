import React, { Component } from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";

// import {} from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import "./App.css";
import Post from "./Post";

const query = gql`
  {
    posts {
      body
      url
    }
  }
`;

const renderPosts = posts =>
  posts.map(({ body, url, id } = {}) => <Post body={body} url={url} id={id} />);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  async componentWillMount() {
    const link = createHttpLink({
      uri: "/graphql",
      credentials: "same-origin"
    });

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: "http://localhost:3000/graphql",
      link
    });

    const { data } = await client.query({
      query
    });
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
