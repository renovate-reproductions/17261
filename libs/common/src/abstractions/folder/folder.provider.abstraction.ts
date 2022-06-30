import { Folder } from "@bitwarden/common/models/domain/folder";

export class FolderProviderAbstraction {
  save: (folder: Folder) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
