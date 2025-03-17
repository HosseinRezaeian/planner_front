import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import "github-markdown-css/github-markdown.css";
// import { CardProps } from "@mantine/core";
import Markdown from 'react-markdown'

import { ReactNode, useEffect, useState } from "react";

const markdownText = `
# React Markdown Example

- Some text
- Some other text
// <h1>hi</h1>

## Subtitle

### Additional info

This is a [link](https://github.com/remarkjs/react-markdown)
`;

interface CardProps {

  children?: String; // `?` makes it optional
}
const Mark: React.FC<CardProps> = ({ children }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    console.log("children", children);
    setText(String(children))
  }, [])
  return (
    // <section>
    <div className="markdown-body" style={{ padding: "20px" }}>


      <Markdown remarkPlugins={[remarkGfm]}>

        {text || "No content available"}

      </Markdown>

      <div
        dangerouslySetInnerHTML={{ __html: text }}
      />                  </div>
  );
}

export default Mark;