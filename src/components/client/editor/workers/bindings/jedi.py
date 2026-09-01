import jedi
import json

# _jedi_code, _jedi_line, _jedi_column are injected at runtime
# via pyodide.globals.set() BEFORE this script is called.

def _get_completions():
    code = _jedi_code   # noqa: F821 – injected by worker
    line_num = _jedi_line   # noqa: F821
    col_num = _jedi_column  # noqa: F821
    try:
        lines = code.splitlines() or [""]
        line = max(1, min(int(line_num), len(lines)))
        column = max(0, min(int(col_num), len(lines[line - 1])))
        script = jedi.Script(code=code, path="main.py")
        completions = script.complete(line, column, fuzzy=True)
        results = []
        for c in completions:
            priority = "2"
            if c.type in ['variable', 'param']:
                priority = "0"
            elif c.type in ['function', 'class']:
                priority = "1"
            elif c.name.startswith('__'):
                priority = "3"
            results.append({
                "name": c.name,
                "type": c.type,
                "priority": priority,
                "docstring": c.docstring()
            })
        return json.dumps(results)
    except Exception:
        return "[]"
