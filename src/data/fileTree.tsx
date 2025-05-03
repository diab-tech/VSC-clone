import { IFile } from "../interface";

export const fileTree: IFile = {
  name: "VSC - CLONE",
  isFolder: true,
  children: [
    {
      name: "public",
      isFolder: true,
      children: [
        {
          name: "vite.svg",
          isFolder: false,
        },
      ],
    },
    {
      name: "src",
      isFolder: true,
      children: [
        {
          name: "assets",
          isFolder: true,
          children: [{ name: "react.svg", isFolder: false }],
        },
      ],
    },
  ],
};
