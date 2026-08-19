from __future__ import annotations

import json
import sys
from dataclasses import asdict

from .python_symbols import index_python_source


def handle_request(payload: dict[str, object]) -> dict[str, object]:
    method = payload.get("method")
    if method != "inspect_symbol":
        return {"ok": False, "error": f"unknown method: {method}"}

    source = payload.get("source")
    symbol_name = payload.get("symbol")
    if not isinstance(source, str) or not isinstance(symbol_name, str):
        return {"ok": False, "error": "source and symbol are required strings"}

    matches = [symbol for symbol in index_python_source(source) if symbol.name == symbol_name]
    return {
        "ok": True,
        "symbol": symbol_name,
        "matches": [asdict(symbol) for symbol in matches],
    }


def serve() -> None:
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue

        try:
            payload = json.loads(line)
            response = handle_request(payload)
        except Exception as exc:  # pragma: no cover - final process boundary
            response = {"ok": False, "error": str(exc)}

        sys.stdout.write(json.dumps(response) + "\n")
        sys.stdout.flush()


if __name__ == "__main__":
    serve()
