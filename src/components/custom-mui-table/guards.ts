export function valueIsObject(value: any): boolean {
  if (!value) {
    return false;
  }
  if (typeof value !== 'object') {
    return false;
  }
  return true;
}
