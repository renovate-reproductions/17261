import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "jslib-angular/guards/auth.guard";

import { PermissionsGuard } from "../../organizations/guards/permissions.guard";
import { OrganizationLayoutComponent } from "../../organizations/layouts/organization-layout.component";
import { NavigationPermissionsService } from "../../organizations/services/navigation-permissions.service";

const routes: Routes = [
  {
    path: ":organizationId",
    component: OrganizationLayoutComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: {
      permissions: NavigationPermissionsService.getPermissions("admin"),
    },
    children: [
      { path: "", pathMatch: "full", redirectTo: "vault" },
      {
        path: "vault",
        loadChildren: async () =>
          (await import("../vault/modules/organization-vault/organization-vault.module"))
            .OrganizationVaultModule,
      },
      {
        path: "tools",
        loadChildren: async () =>
          (await import("./tools/organization-tools.module")).OrganizationToolsModule,
      },
      {
        path: "manage",
        loadChildren: async () =>
          (await import("./manage/organization-manage.module")).OrganizationManageModule,
      },
      {
        path: "settings",
        loadChildren: async () =>
          (await import("./settings/organization-settings.module")).OrganizationSettingsModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
