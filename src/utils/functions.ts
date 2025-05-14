import { IFile } from "../interface";

export const doesFileExists = (arr: IFile[], id: string) => {
  return arr.some((fileObj) => fileObj.id === id);
};

export const findFileById =(node:IFile, id:string|null):IFile|undefined=>{
  if(node.id===id){
    return node;
  }
  if(node.children){

    for(const child of node.children){
      const found=findFileById(child,id);
      if(found){
        return found;
      }
    }

  }

}