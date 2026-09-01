"use client"

import SyntaxHighlighter from "react-syntax-highlighter";
import { BorderedContainer } from "../interaction/container/BorderedContainer";
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export function CodeInput({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  //Weird, vs just doesent work? except for prism but prism has annoying borders
  return (
    <div className={`mt-2 mb-2 ${className}`}>
      <BorderedContainer header={"input"} className={className}>
        <SimpleBar>
          <SyntaxHighlighter
            language="python"
            style={xcode}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              overflow: "visible",
              minWidth: "max-content",
            }}
          >
            {content}
          </SyntaxHighlighter>
        </SimpleBar>
      </BorderedContainer>
    </div>
  );
}
