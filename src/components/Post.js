import React from "react";
import styled from "@emotion/styled";

const PostElement = styled("div")`
  height: 300px;
  width: 800px;
  border: 1px solid #555;
  border-radius: 40px;
`;

const Post = ({ body, url } = {}) => {
  return (
    <PostElement>
      <a href={url}>{body}</a>
    </PostElement>
  );
};

export default Post;
