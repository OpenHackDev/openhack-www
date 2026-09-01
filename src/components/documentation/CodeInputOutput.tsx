import SyntaxHighlighter from "react-syntax-highlighter";
import { BorderedContainer } from "../interaction/container/BorderedContainer";
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export function CodeInputOutput({
  input,
  output,
  className = "",
}: {
  input: string;
  output: string;
  className?: string;
}) {
  return (
    <div className={`mt-2 mb-2 ${className}`}>
      <BorderedContainer className={className} padding={false}>
        <table>
          <thead>
            <tr className="border-b-4">
              <th className="border-r-4 font-normal">input</th>
              <th className="font-normal">output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r-4">
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
                    {input}
                  </SyntaxHighlighter>
                </SimpleBar>
              </td>
              <td>
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
                    {output}
                  </SyntaxHighlighter>
                </SimpleBar>
              </td>
            </tr>
          </tbody>
        </table>
      </BorderedContainer>
    </div>
  );
}
