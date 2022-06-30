import { CipherType } from "@bitwarden/common/enums/cipherType";
import { CipherView } from "@bitwarden/common/models/view/cipherView";

import { VaultFilter } from "./vault-filter.model";

describe("VaultFilter", () => {
  describe("filterFunction", () => {
    it("should return true when filter is set to all statuses", () => {
      const cipher = createCipher();
      const filterFunction = createFilterFunction({ status: "all" });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return true when filter is set to favorites and cipher is favorite", () => {
      const cipher = createCipher({ favorite: true });
      const filterFunction = createFilterFunction({ status: "favorites" });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return false when filter is set to all and cipher is not favorite", () => {
      const cipher = createCipher({ favorite: false });
      const filterFunction = createFilterFunction({ status: "favorites" });

      const result = filterFunction(cipher);

      expect(result).toBe(false);
    });

    it("should return true when filter is set to trash and cipher is deleted", () => {
      const cipher = createCipher({ deletedDate: new Date() });
      const filterFunction = createFilterFunction({ status: "trash" });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return false when filter is set to trash and cipher is not deleted", () => {
      const cipher = createCipher({ deletedDate: undefined });
      const filterFunction = createFilterFunction({ status: "trash" });

      const result = filterFunction(cipher);

      expect(result).toBe(false);
    });

    it("should return true when filter matches cipher type", () => {
      const cipher = createCipher({ type: CipherType.Identity });
      const filterFunction = createFilterFunction({ cipherType: CipherType.Identity });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return false when filter does not match cipher type", () => {
      const cipher = createCipher({ type: CipherType.Card });
      const filterFunction = createFilterFunction({ cipherType: CipherType.Identity });

      const result = filterFunction(cipher);

      expect(result).toBe(false);
    });

    it("should return true when filter matches folder id", () => {
      const cipher = createCipher({ folderId: "folderId" });
      const filterFunction = createFilterFunction({
        selectedFolder: true,
        selectedFolderId: "folderId",
      });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return true when filtering on unassigned folder and cipher does not have folder", () => {
      const cipher = createCipher({ folderId: undefined });
      const filterFunction = createFilterFunction({
        selectedFolder: true,
        selectedFolderId: null,
      });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return false when filter does not match folder id", () => {
      const cipher = createCipher({ folderId: "folderId" });
      const filterFunction = createFilterFunction({
        selectedFolder: true,
        selectedFolderId: "anotherFolderId",
      });

      const result = filterFunction(cipher);

      expect(result).toBe(false);
    });

    it("should return true when filter matches collection id", () => {
      const cipher = createCipher({ collectionIds: ["collectionId", "anotherId"] });
      const filterFunction = createFilterFunction({ selectedCollectionId: "collectionId" });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return true when filtering on unassigned collection and cipher belongs to organization and does not have any collections", () => {
      const cipher = createCipher({ organizationId: "organizationId", collectionIds: [] });
      const filterFunction = createFilterFunction({
        selectedCollection: true,
        selectedCollectionId: null,
      });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return false when filtering on unassigned collection but cipher does not have organization", () => {
      const cipher = createCipher({ organizationId: null, collectionIds: [] });
      const filterFunction = createFilterFunction({
        selectedCollection: true,
        selectedCollectionId: null,
      });

      const result = filterFunction(cipher);

      expect(result).toBe(false);
    });

    it("should return false when filter does not match collection id", () => {
      const cipher = createCipher({
        organizationId: "organizationId",
        collectionIds: ["collectionId", "anotherId"],
      });
      const filterFunction = createFilterFunction({
        selectedCollection: true,
        selectedCollectionId: "nonMatchingId",
      });

      const result = filterFunction(cipher);

      expect(result).toBe(false);
    });

    it("should return true when filter matches organization id", () => {
      const cipher = createCipher({ organizationId: "organizationId" });
      const filterFunction = createFilterFunction({
        selectedOrganizationId: "organizationId",
      });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return true when filtering on my vault only and cipher does not have any organization", () => {
      const cipher = createCipher({ organizationId: null });
      const filterFunction = createFilterFunction({
        myVaultOnly: true,
      });

      const result = filterFunction(cipher);

      expect(result).toBe(true);
    });

    it("should return false when filter does not match organization id", () => {
      const cipher = createCipher({ organizationId: "organizationId" });
      const filterFunction = createFilterFunction({
        selectedOrganizationId: "anotherOrganizationId",
      });

      const result = filterFunction(cipher);

      expect(result).toBe(false);
    });
  });
});

function createFilterFunction(options: Partial<VaultFilter> = {}) {
  return new VaultFilter(options).buildFilter();
}

function createCipher(options: Partial<CipherView> = {}) {
  const cipher = new CipherView();

  cipher.favorite = options.favorite ?? false;
  cipher.deletedDate = options.deletedDate;
  cipher.type = options.type;
  cipher.folderId = options.folderId;
  cipher.collectionIds = options.collectionIds;
  cipher.organizationId = options.organizationId;

  return cipher;
}
