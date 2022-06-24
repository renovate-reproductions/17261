import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { OrganizationService } from "@bitwarden/common/abstractions/organization.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { OrganizationApiKeyType } from "@bitwarden/common/enums/organizationApiKeyType";
import { OrganizationConnectionType } from "@bitwarden/common/enums/organizationConnectionType";
import { ScimConfigApi } from "@bitwarden/common/models/api/scimConfigApi";
import { Organization } from "@bitwarden/common/models/domain/organization";

@Component({
  selector: "app-org-manage-scim",
  templateUrl: "scim.component.html",
})
export class ScimComponent implements OnInit {
  loading = true;
  organizationId: string;
  organization: Organization;
  formPromise: Promise<any>;

  endpointUrl: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private platformUtilsService: PlatformUtilsService,
    private i18nService: I18nService,
    private organizationService: OrganizationService
  ) {}

  async ngOnInit() {
    this.route.parent.parent.params.subscribe(async (params) => {
      this.organizationId = params.organizationId;
      await this.load();
    });
  }

  async load() {
    this.organization = await this.organizationService.get(this.organizationId);
    //TODO: Load the SCIM configuration (connection) and API Key
    this.endpointUrl = "https://example.com/callback/scim";
    this.loading = false;
  }

  async submit() {
    //this.validateForm();

    //TODO: POST data update to server and update display
    //this.formPromise = POST;

    try {
      //const response = await this.formPromise;
      //this.populateForm(response);
      this.platformUtilsService.showToast("success", null, this.i18nService.t("scimSettingsSaved"));
    } catch {
      // Logged by appApiAction, do nothing
    }

    this.formPromise = null;
  }
}
