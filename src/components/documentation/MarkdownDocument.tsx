import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkDirective from "remark-directive";
import { Callout, CalloutTypes } from "../interaction/text/Blocks";
import { Header, SubHeader } from "../interaction/text/Header";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";

type DirectiveNode = {
  data?: {
    hName?: string;
    hProperties?: Record<string, string>;
  };
  name?: string;
  attributes?: Record<string, string>;
};

const components = {
  callout: ({
    children,
    type,
  }: {
    children?: React.ReactNode;
    type?: string;
  }) => {
    const calloutType =
      typeof type === "string" && type in CalloutTypes
        ? (type as keyof typeof CalloutTypes)
        : "Note";

    return <Callout type={CalloutTypes[calloutType]}>{children}</Callout>;
  },
  h1: ({ children }: { children?: React.ReactNode }) => (
    <Header>{children}</Header>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <SubHeader>{children}</SubHeader>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <SubHeader className="italic">{children}</SubHeader>
  ),
};

function reDirectivePlugin() {
  return (tree: Root) => {
    visit(
      tree,
      ["textDirective", "leafDirective", "containerDirective"],
      (node) => {
        const directiveNode = node as DirectiveNode;
        const data = directiveNode.data || (directiveNode.data = {});

        data.hName = directiveNode.name;

        data.hProperties = {
          ...(directiveNode.attributes || {}),
          className: directiveNode.attributes?.class || "",
        };
      },
    );
  };
}

export function MarkdownDocument({ content = "" }: { content?: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkDirective, reDirectivePlugin]}
      components={components as Components}
    >
      {content}
    </ReactMarkdown>
  );
}
