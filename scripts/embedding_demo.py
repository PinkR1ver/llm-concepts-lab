import numpy as np


def main():
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

    print("=== Vocab ===")
    print(vocab)
    print("\n=== Tokens ===")
    print(tokens)
    print("\n=== Token IDs ===")
    print(token_ids)
    print("\n=== Embedding Table (V x d) ===")
    print(embedding_table)
    print("\n=== Embedding Lookup Result ===")
    print(embedded)

    print("\n=== One-hot equivalence check ===")
    vocab_size = len(vocab)
    one_hot = np.eye(vocab_size)[token_ids]
    embedded_via_matmul = one_hot @ embedding_table
    print("One-hot matrix:")
    print(one_hot)
    print("\nOne-hot @ embedding_table:")
    print(embedded_via_matmul)
    print("\nAll close:", np.allclose(embedded, embedded_via_matmul))


if __name__ == "__main__":
    main()
