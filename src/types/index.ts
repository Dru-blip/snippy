export interface Folder {
  id: number;
  name: string;
  description?: string;
  defaultLanguage?: string;
}

export interface Snippet {
  id: number;
  name: string;
  description?: string;
  language?: string;
  content?: string;
  tags?: string[];
  folderName: string;
  createdAt: Date;
  favorite:0|1
  inTrash:0|1
}

export interface Tag{
  id:number
  name:string
}
