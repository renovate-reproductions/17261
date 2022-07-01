import { Folder } from "@bitwarden/common/models/domain/folder";

export class FolderServiceAbstraction {
  save: (folder: Folder) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
