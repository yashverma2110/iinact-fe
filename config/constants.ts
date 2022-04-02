export enum listTypesEnum {
  LEET_CODE = "lc",
  YOU_TUBE = "yt",
  CODE_FORCES = "cf",
}

export const listTypes = [
  {
    title: "LeetCode",
    value: listTypesEnum.LEET_CODE,
  },
  {
    title: "YouTube",
    value: listTypesEnum.YOU_TUBE,
  },
  {
    title: "Codeforces",
    value: listTypesEnum.CODE_FORCES,
  },
];

const expression =
  "((http|https)://)(www.)?" +
  "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
  "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
export const linkRegex = new RegExp(expression);

export const daysInAWeek = ["M", "T", "W", "Th", "F", "Sat", "S"];
