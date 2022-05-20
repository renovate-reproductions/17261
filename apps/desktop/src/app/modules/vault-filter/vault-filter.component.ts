import { Component, OnInit } from "@angular/core";

import { VaultFilterComponent as BaseVaultFilterComponent } from "jslib-angular/modules/vault-filter/vault-filter.component";

@Component({
  selector: "app-vault-filter",
  templateUrl: "vault-filter.component.html",
})
export class VaultFilterComponent extends BaseVaultFilterComponent implements OnInit {
  async ngOnInit() {
    await super.ngOnInit(); 
    this.folders = await this.vaultFilterService.buildFolders();
    this.collections = await this.vaultFilterService.buildCollections();
  }
}
