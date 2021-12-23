export class Node {
  val: string;
  count: number;
  left: Node | null;
  right: Node | null;

  constructor(val: string) {
    this.val = val;
    this.count = 1;
    this.left = null;
    this.right = null;
  }

  insert(val: string): void {
    const digit = val[0];
    switch (digit) {
      case "0": {
        if (this.left) {
          this.left.count += 1;
        } else {
          this.left = new Node(digit);
        }
        this.left.insert(val.slice(1));
        return;
      }
      case "1": {
        if (this.right) {
          this.right.count += 1;
        } else {
          this.right = new Node(digit);
        }
        this.right.insert(val.slice(1));
        return;
      }
    }
  }
}
