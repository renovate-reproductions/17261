import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { JslibModule } from "@bitwarden/angular/jslib.module";

import { OssModule } from "src/app/oss.module";

import { SecretsManagerRoutingModule } from "./sm-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, OssModule, JslibModule, SecretsManagerRoutingModule],
  declarations: [],
  providers: [],
})
export class SecretsManagerModule {}
