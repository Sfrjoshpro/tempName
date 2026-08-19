from project_intel.server import handle_request


def test_inspect_symbol_returns_matching_definition() -> None:
    response = handle_request(
        {
            "method": "inspect_symbol",
            "symbol": "Player",
            "source": "class Player:\n    pass\n",
        }
    )

    assert response["ok"] is True
    assert response["matches"] == [
        {"name": "Player", "kind": "class", "line": 1, "column": 0}
    ]
