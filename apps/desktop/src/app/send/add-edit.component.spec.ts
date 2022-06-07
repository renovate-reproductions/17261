import { DatePipe } from "@angular/common";
import { Substitute, SubstituteOf } from "@fluffy-spoon/substitute";

import { EnvironmentService } from "jslib-common/abstractions/environment.service";
import { I18nService } from "jslib-common/abstractions/i18n.service";
import { LogService } from "jslib-common/abstractions/log.service";
import { MessagingService } from "jslib-common/abstractions/messaging.service";
import { PlatformUtilsService } from "jslib-common/abstractions/platformUtils.service";
import { PolicyService } from "jslib-common/abstractions/policy.service";
import { SendService } from "jslib-common/abstractions/send.service";
import { StateService } from "jslib-common/abstractions/state.service";

import { AddEditComponent } from "./add-edit.component";

describe("MyFeatureComponent", () => {
  let component: AddEditComponent;

  let i18nService: SubstituteOf<I18nService>;
  let platformUtilsService: SubstituteOf<PlatformUtilsService>;
  let environmentService: SubstituteOf<EnvironmentService>;
  let datePipe: SubstituteOf<DatePipe>;
  let sendService: SubstituteOf<SendService>;
  let stateService: SubstituteOf<StateService>;
  let messagingService: SubstituteOf<MessagingService>;
  let policyService: SubstituteOf<PolicyService>;
  let logService: SubstituteOf<LogService>;

  beforeEach(() => {
    i18nService = Substitute.for<I18nService>();
    platformUtilsService = Substitute.for<PlatformUtilsService>();
    environmentService = Substitute.for<EnvironmentService>();
    datePipe = Substitute.for<DatePipe>();
    sendService = Substitute.for<SendService>();
    stateService = Substitute.for<StateService>();
    messagingService = Substitute.for<MessagingService>();
    policyService = Substitute.for<PolicyService>();
    logService = Substitute.for<LogService>();

    component = new AddEditComponent(
      i18nService,
      platformUtilsService,
      environmentService,
      datePipe,
      sendService,
      stateService,
      messagingService,
      policyService,
      logService
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
