export const isObject = <T extends object>(value: any): value is T =>
  typeof value == "object" && value != undefined && typeof value != "function";
