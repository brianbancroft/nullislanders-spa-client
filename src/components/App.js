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
      <>
        <header>
          <nav>
            <a href="/" class="logo">
              <div class="nav-title">
                <div class="nav-title__icon" />
                <div class="nav-title__title">Nullislanders</div>
              </div>
            </a>
            <div class="nav-items">
              <ul>
                <li>
                  <a href="/newest">new posts</a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/hashtag/gischat?f=tweets&vertical=default&src=hash&lang=en"
                    target="_blank"
                  >
                    #gischat
                  </a>
                </li>
                <li>
                  <a href="https://thespatialcommunity.org" target="_blank">
                    slack
                  </a>
                </li>
              </ul>
            </div>
            <div class="nav-login">
              <a href="/login">login</a>
            </div>
          </nav>
        </header>
        <main>
          <section>
            <h1>Null Islanders</h1>
          </section>
          <section>
            <ul>{renderPosts(this.state.posts)}</ul>
          </section>
        </main>
        <footer>
          <div class="footer-links-container">
            <div class="nav-items">
              <ul>
                <li>
                  <a href="/guidelines" target="_blank">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@brianbancroft.ca">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
