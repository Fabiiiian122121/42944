import { Component, input } from "@angular/core";
import { JsonPipe } from "@angular/common";

@Component({
  selector: 'widget-error',
  imports: [
    JsonPipe
  ],
  template: `
    <div class="bg-red-50 text-red-800 p-4 h-full">
      <div class="mb-4 font-[600]">ERROR:</div>
      <code class="block bg-red-100 p-4 rounded-lg">
        {{ errorMessage() | json }}
      </code>
    </div>
  `
})
export class WidgetError {
  public errorMessage = input.required();
}
