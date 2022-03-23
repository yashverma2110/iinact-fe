export const listTypes = [
  {
    title: "LeetCode",
    value: "lc",
  },
  {
    title: "YouTube",
    value: "yt",
  },
  {
    title: "Codeforces",
    value: "cf",
  },
];

const expression =
  "((http|https)://)(www.)?" +
  "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
  "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
export const linkRegex = new RegExp(expression);
