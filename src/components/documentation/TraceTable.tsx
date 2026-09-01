import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import type { TraceEntry } from "../client/editor/types/workerMessages";

export function TraceTable({
  entries,
  className = "",
}: {
  entries: TraceEntry[];
  className?: string;
}) {
  if (entries.length === 0) return null;

  // Collect all variable names seen across every step, preserving insertion order
  const varNames: string[] = [];
  const seen = new Set<string>();
  for (const entry of entries) {
    for (const key of Object.keys(entry.v)) {
      if (!seen.has(key)) {
        seen.add(key);
        varNames.push(key);
      }
    }
  }

  return (
    <div
      className={`overflow-x-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-max ${className}`}
    >
    <SimpleBar>
        <table className="text-sm table-auto min-w-max text-sm border-collapse">
          <thead>
            <tr>
              <th
                rowSpan={2}
                className="border-4 border-black px-2 py-1 font-normal bg-oh-yellow text-center whitespace-nowrap w-10"
              >
                line number
              </th>
              <th
                colSpan={varNames.length || 1}
                className="border-4 border-black px-2 py-1 font-normal bg-oh-yellow whitespace-nowrap"
              >
                variables
              </th>
            </tr>
            <tr>
              {varNames.length > 0 ? (
                varNames.map((name) => (
                  <th
                    key={name}
                    className="border-4 border-black px-2 py-1 bg-oh-yellow whitespace-nowrap"
                  >
                    {name}
                  </th>
                ))
              ) : (
                <th className="border-4 border-black px-2 py-1 bg-oh-yellow whitespace-nowrap">
                  —
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Skip the last sentinel entry (l=-1); it exists only for lookahead */}
            {entries.slice(0, -1).map((entry, i) => {
              // entries[i+1] is always defined because the sentinel guarantees a successor
              const vars = entries[i + 1].v;
              const prevVars = i > 0 ? entries[i].v : {};
              return (
                <tr key={i}>
                  <td className="border-4 border-black text-gray-800 px-2 py-1 text-center w-5 min-w-5 max-w-5">
                    {entry.l}
                  </td>
                  {varNames.length > 0 ? (
                    varNames.map((name) => {
                      const val = vars[name];
                      const changed =
                        val !== undefined && val !== prevVars[name];
                      return (
                        <td
                          key={name}
                          className={`border-4 border-black px-2 py-1 whitespace-nowrap ${
                            changed ? "bg-oh-yellow-light font-bold" : ""
                          } ${val === undefined ? "text-gray-300" : ""}`}
                        >
                          {val ?? "—"}
                        </td>
                      );
                    })
                  ) : (
                    <td className="border-4 border-black px-2 py-1 text-gray-300 text-center">
                      —
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        </SimpleBar>
    </div>
  );
}
