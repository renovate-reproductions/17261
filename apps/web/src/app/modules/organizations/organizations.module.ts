import { NgModule } from "@angular/core";

import { LayoutsModule } from "../../layouts/layouts.module";
import { SharedModule } from "../shared.module";

import { OrganizationLayoutComponent } from "./layouts/organization-layout.component";
import { OrganizationSwitcherComponent } from "./layouts/organization-switcher.component";
import { OrganizationsRoutingModule } from "./organizations-routing.module";

@NgModule({
  imports: [OrganizationsRoutingModule, SharedModule, LayoutsModule],
  declarations: [
    OrganizationLayoutComponent,
    OrganizationSwitcherComponent,
  ],
})
export class OrganizationsModule { }
