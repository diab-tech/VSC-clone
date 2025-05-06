declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}
