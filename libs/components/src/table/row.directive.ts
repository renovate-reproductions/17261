import { HostBinding, Directive, Input } from "@angular/core";

@Directive({
  selector: "tr[bitRow]",
})
export class RowDirective {
  @HostBinding("class") get classList() {
    return ["hover:tw-bg-background-alt"].concat(
      this.last ? [] : ["tw-border-solid", "tw-border-0", "tw-border-b", "tw-border-secondary-300"]
    );
  }

  @Input() last = false;
}
