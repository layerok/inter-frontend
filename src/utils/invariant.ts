export function invariant(condition: boolean, msg: string): asserts condition {
  if (!condition) {
    throw Error(msg);
  }
}
