import { NgModule } from "@angular/core";

import { LayoutsModule } from "../../layouts/layouts.module";
import { SharedModule } from "../shared.module";

import { OrganizationLayoutComponent } from "./layouts/organization-layout.component";
import { OrganizationSwitcherComponent } from "./layouts/organization-switcher.component";
import { OrganizationsRoutingModule } from "./organizations-routing.module";

/**
 * This module only declares layouts and routing for organization feature modules.
 * This module should remain 'skinny'. Any substantive components should go in feature modules, not here.
 */
@NgModule({
  imports: [OrganizationsRoutingModule, SharedModule, LayoutsModule],
  declarations: [
    OrganizationLayoutComponent,
    OrganizationSwitcherComponent,
  ],
})
export class OrganizationsModule { }
