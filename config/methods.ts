import { listTypesEnum } from "./constants";

export const getTitle = (url: string, callback: (title: string) => void) => {
  fetch(`https://crossorigin.me/${url}`)
    .then((response) => response.text())
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const title = doc.querySelectorAll("title")[0];
      callback(title.innerText);
    });
  return url;
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("xt@k#n");
    return item;
  }

  return null;
};

export const getStringForListType = (type: string) => {
  switch (type) {
    case listTypesEnum.LEET_CODE:
      return "LeetCode";
    case listTypesEnum.CODE_FORCES:
      return "CodeForces";
    case listTypesEnum.YOU_TUBE:
      return "YouTube";
    default:
      return "Other";
  }
};
