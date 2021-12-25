import { Node } from "./index";

describe("Node", () => {
  test("insert", () => {
    const tree = new Node("root");
    tree.insert("100");
    tree.insert("101");
    tree.insert("011");

    expect(inOrder(tree)).toEqual(["0", "1", "1", "root", "0", "0", "1", "1"]);
    expect(tree.right?.left?.count).toEqual(2);
    expect(tree.right?.right).toBeNull();
    expect(tree.left?.count).toEqual(1);
  });
});

function inOrder(node: Node | null): string[] {
  if (!node) {
    return [];
  }
  return inOrder(node.left).concat([node.val]).concat(inOrder(node.right));
}
