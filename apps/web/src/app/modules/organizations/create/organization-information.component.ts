import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-org-info",
  templateUrl: "organization-information.component.html",
})
export class OrganizationInformationComponent implements OnInit {
  @Input() nameOnly = false;
  @Output() valueChange = new EventEmitter<FormGroup>();

  formData = this.formBuilder.group({
    name: ["", [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    if (!this.nameOnly) {
      this.formData = this.formBuilder.group({
        name: ["", [Validators.required]],
        billingEmail: ["", [Validators.required, Validators.email]],
        businessOwned: [false],
      });
    }
  }

  emitFormValue() {
    this.valueChange.emit(this.formData);
  }
}
