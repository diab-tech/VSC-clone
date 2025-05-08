import { IFile } from "../interface";

export const doesFileExists = (arr: IFile[], id: string) => {
  return arr.some((fileObj) => fileObj.id === id);
};
