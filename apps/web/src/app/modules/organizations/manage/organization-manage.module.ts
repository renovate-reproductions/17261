import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared.module";

import { EntityUsersComponent } from "./entity-users.component";
import { BulkConfirmComponent } from "./bulk/bulk-confirm.component";
import { BulkRemoveComponent } from "./bulk/bulk-remove.component";
import { BulkStatusComponent } from "./bulk/bulk-status.component";
import { CollectionAddEditComponent } from "./collection-add-edit.component";
import { CollectionsComponent as ManageCollectionsComponent } from "./collections.component";
import { EntityEventsComponent } from "./entity-events.component";
import { EventsComponent } from "./events.component";
import { GroupAddEditComponent } from "./group-add-edit.component";
import { GroupsComponent } from "./groups.component";
import { ManageComponent } from "./manage.component";
import { PeopleComponent } from "./people.component";
import { PolicyEditComponent } from "./policy-edit.component";
import { ResetPasswordComponent } from "./reset-password.component";
import { UserAddEditComponent } from "./user-add-edit.component";
import { UserConfirmComponent } from "./user-confirm.component";
import { UserGroupsComponent } from "./user-groups.component";
import { PoliciesComponent } from "./policies.component";
import { OrganizationPoliciesModule } from "../policies/organization-policies.module";
import { OrganizationManageRoutingModule } from "./organization-manage-routing.module";

@NgModule({
  imports: [
    OrganizationManageRoutingModule,
    OrganizationPoliciesModule,
    SharedModule,
    ScrollingModule,
  ],
  declarations: [
    EntityUsersComponent,
    BulkConfirmComponent,
    BulkRemoveComponent,
    BulkStatusComponent,
    CollectionAddEditComponent,
    EntityEventsComponent,
    EventsComponent,
    GroupAddEditComponent,
    GroupsComponent,
    ManageCollectionsComponent,
    ManageComponent,
    PeopleComponent,
    PolicyEditComponent,
    ResetPasswordComponent,
    UserAddEditComponent,
    UserConfirmComponent,
    UserGroupsComponent,
    PoliciesComponent,
  ],
  exports: [EntityUsersComponent],
})
export class OrganizationManageModule {}
