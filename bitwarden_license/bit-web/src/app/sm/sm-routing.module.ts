import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./layout.component";
import { NavigationComponent } from "./navigation.component";
import { SecretsComponent } from "./secrets/secrets.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: NavigationComponent,
        outlet: "sidebar",
      },
      {
        path: "",
        component: SecretsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretsManagerRoutingModule {}
