import { mixed } from "yup";

export interface MessageParams {
  path: string;
  value: any;
  originalValue: any;
  label: string;
  type: string;
}

export type Message<Extra extends Record<string, unknown> = {}> =
  | string
  | ((params: Extra & MessageParams) => unknown)
  | Record<PropertyKey, unknown>;

export interface MixedLocale {
  default?: Message;
  required?: Message;
  oneOf?: Message<{ values: any }>;
  notOneOf?: Message<{ values: any }>;
  notType?: Message;
  defined?: Message;
}
