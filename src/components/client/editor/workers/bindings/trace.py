import sys
import json
import types
import io

# _trace_user_code is injected at runtime via pyodide.globals.set() from the JS worker

_trace_entries = []
_trace_globals_ns = {"__builtins__": __builtins__}

def _make_tracer():
    def _fn(frame, event, arg):
        if event == 'line' and frame.f_code.co_filename == '<user>':
            snap = {}
            for k, v in frame.f_locals.items():
                if k.startswith('_'):
                    continue
                if isinstance(v, (types.ModuleType, type, types.FunctionType,
                                  types.BuiltinFunctionType, types.BuiltinMethodType,
                                  types.MethodType, types.LambdaType)):
                    continue
                try:
                    snap[k] = repr(v)
                except Exception:
                    snap[k] = '<unprintable>'
            _trace_entries.append({"l": frame.f_lineno, "v": snap})
        return _fn
    return _fn

_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

def _snap_globals():
    snap = {}
    for k, v in _trace_globals_ns.items():
        if k.startswith('_'):
            continue
        if isinstance(v, (types.ModuleType, type, types.FunctionType,
                          types.BuiltinFunctionType, types.BuiltinMethodType,
                          types.MethodType, types.LambdaType)):
            continue
        try:
            snap[k] = repr(v)
        except Exception:
            snap[k] = '<unprintable>'
    return snap

sys.settrace(_make_tracer())
try:
    exec(compile(_trace_user_code, '<user>', 'exec'), _trace_globals_ns)
except Exception:
    pass
finally:
    sys.settrace(None)
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

# Sentinel entry: final post-execution state (l=-1, not rendered as a row)
if _trace_entries:
    _trace_entries.append({"l": -1, "v": _snap_globals()})

json.dumps(_trace_entries)
