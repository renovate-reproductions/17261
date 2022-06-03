import { NgModule } from "@angular/core";

import { VaultModule } from "../../vault.module";

import { OrganizationVaultRoutingModule } from "./organization-vault-routing.module";
import { OrganizationVaultComponent } from "./organization-vault.component";
import { AddEditComponent } from "./add-edit.component";
import { AttachmentsComponent } from "./attachments.component";
import { CiphersComponent } from "./ciphers.component";
import { CollectionsComponent } from "./collections.component";

@NgModule({
  imports: [VaultModule, OrganizationVaultRoutingModule],
  declarations: [OrganizationVaultComponent,
    AddEditComponent,
    AttachmentsComponent,
    CiphersComponent,
    CollectionsComponent,
  ],
})
export class OrganizationVaultModule {}
