from __future__ import annotations

import ast
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class PythonSymbol:
    name: str
    kind: str
    line: int
    column: int


def index_python_source(source: str) -> list[PythonSymbol]:
    """Return top-level classes, functions, and assigned names from Python source."""
    tree = ast.parse(source)
    symbols: list[PythonSymbol] = []

    for node in tree.body:
        if isinstance(node, ast.ClassDef):
            symbols.append(PythonSymbol(node.name, "class", node.lineno, node.col_offset))
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            symbols.append(PythonSymbol(node.name, "function", node.lineno, node.col_offset))
        elif isinstance(node, (ast.Assign, ast.AnnAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            for target in targets:
                if isinstance(target, ast.Name):
                    symbols.append(PythonSymbol(target.id, "variable", target.lineno, target.col_offset))

    return symbols
