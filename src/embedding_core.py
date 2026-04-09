from dataclasses import dataclass
from typing import List, Dict

import numpy as np


@dataclass
class EmbeddingExample:
    vocab: Dict[str, int]
    tokens: List[str]
    token_ids: np.ndarray
    embedding_table: np.ndarray
    embedded: np.ndarray
    one_hot: np.ndarray
    embedded_via_matmul: np.ndarray


def build_example() -> EmbeddingExample:
    vocab = {"I": 0, "love": 1, "LLMs": 2, "<unk>": 3}
    tokens = ["I", "love", "LLMs"]
    token_ids = np.array([vocab.get(tok, vocab["<unk>"]) for tok in tokens])
    embedding_table = np.array(
        [
            [0.2, 0.1, 0.7],
            [0.9, 0.3, 0.1],
            [0.4, 0.8, 0.5],
            [0.0, 0.0, 0.0],
        ],
        dtype=float,
    )
    embedded = embedding_table[token_ids]
    one_hot = np.eye(len(vocab))[token_ids]
    embedded_via_matmul = one_hot @ embedding_table

    return EmbeddingExample(
        vocab=vocab,
        tokens=tokens,
        token_ids=token_ids,
        embedding_table=embedding_table,
        embedded=embedded,
        one_hot=one_hot,
        embedded_via_matmul=embedded_via_matmul,
    )
