import { useEffect } from "react";
export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Song Requestor`;
  }, [title]);

  return null;
};
