import { IFile } from "../interface";
import { v4 as uuidv4 } from "uuid";

export const fileTree: IFile = {
  id: uuidv4(),
  name: "VSC-clone",
  isFolder: true,
  children: [
    {
      id: uuidv4(),

      name: "public",
      isFolder: true,
      children: [
        {
          id: uuidv4(),

          name: "vite.svg",
          isFolder: false,
        },
      ],
    },
    {
      id: uuidv4(),

      name: "node_modules",
      isFolder: true,
      children: [
        {
          id: uuidv4(),

          name: "tailwind.css",
          isFolder: false,
        },
      ],
    },
    {
      id: uuidv4(),

      name: "src",
      isFolder: true,
      children: [
        {
          id: uuidv4(),

          name: "assets",
          isFolder: true,
          children: [
            {
              id: uuidv4(),

              name: "react.jsx",
              isFolder: false,
            },
          ],
        },
      ],
    },
  ],
};
