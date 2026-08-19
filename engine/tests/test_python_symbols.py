from project_intel import index_python_source


def test_indexes_top_level_python_symbols() -> None:
    source = '''
class Player:
    pass

async def connect():
    pass

count = 1
name: str = "x"
'''

    symbols = index_python_source(source)

    assert [(symbol.name, symbol.kind) for symbol in symbols] == [
        ("Player", "class"),
        ("connect", "function"),
        ("count", "variable"),
        ("name", "variable"),
    ]
