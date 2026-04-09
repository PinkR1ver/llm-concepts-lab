from pprint import pformat

from src.embedding_core import build_example


def main():
    ex = build_example()
    print("# Embedding Dashboard (CLI placeholder)\n")
    print("Tokens:", ex.tokens)
    print("Token IDs:", ex.token_ids.tolist())
    print("\nVocab:")
    print(pformat(ex.vocab))
    print("\nEmbedding Table:")
    print(ex.embedding_table)
    print("\nLookup Result:")
    print(ex.embedded)
    print("\nOne-hot @ table:")
    print(ex.embedded_via_matmul)


if __name__ == "__main__":
    main()
