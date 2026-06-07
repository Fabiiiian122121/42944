import { Component, input } from "@angular/core";
import { Context } from "../../app.component";
import { BrnButton } from "@spartan-ng/brain/button";
import { HlmButtonDirective } from "../ui/hlm-button.directive";
import { HlmBadgeDirective } from "../ui/hlm-badge.directive";

@Component({
  selector: 'widget-content',
  standalone: true,
  templateUrl: './widget-content.component.html',
  styleUrls: ['./widget-content.component.scss'],
  imports: [
    BrnButton,
    HlmButtonDirective,
    HlmBadgeDirective,
  ]
})
export class WidgetContentComponent {
  public context = input.required<Context>();
}