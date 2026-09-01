import pyflakes.checker  # type: ignore[import-untyped]
import ast
import json

# _lint_code is injected at runtime via pyodide.globals.set() from the JS worker
def _run_lint():
    code = _lint_code  # noqa: F821 – injected by worker
    try:
        tree = compile(code, '<stdin>', 'exec', ast.PyCF_ONLY_AST)
        checker = pyflakes.checker.Checker(tree, '<stdin>')
        results = []
        for msg in checker.messages:
            results.append({
                "line": msg.lineno,
                "col": getattr(msg, 'col', 0) + 1,
                "message": msg.message % msg.message_args,
                "severity": "warning"
            })
        return json.dumps(results)
    except SyntaxError as e:
        return json.dumps([{
            "line": e.lineno or 1,
            "col": e.offset or 1,
            "message": e.msg,
            "severity": "error"
        }])
    except Exception:
        return "[]"
