export const Message = {
  FROM_EXTENSION_TO_PAGE: 'FROM_EXTENSION_TO_PAGE',
} as const;

export type Message = (typeof Message)[keyof typeof Message];
