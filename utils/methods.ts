export const isValidLink = (link: string) => {
  return new RegExp(
    'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
  ).test(link);
};
