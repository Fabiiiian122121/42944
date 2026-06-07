import { Component, input } from "@angular/core";

@Component({
  selector: 'widget-no-context',
  template: `
    <div class="bg-blue-50 h-full p-6">
      <div class="flex gap-10">
        <div class="flex justify-center items-center config-image w-[100px] h-[100px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="400px" height="400px" viewBox="0 0 24 24">
            <path
              d="M11.969 14a1.237 1.237 0 0 0 .044.863l.061.137H8v-1zm5.183-3.25h1.65a1.216 1.216 0 0 1 .198.03V10H8v1h8.412a1.243 1.243 0 0 1 .74-.25zM19 6H8v1h11zM4 13h3v3H4zm1 2h1v-1H5zm5.75 3H2V3h19v9.077l.135-.06a1.1 1.1 0 0 1 .865-.039V2H1v17h9.773a1.201 1.201 0 0 1-.023-.152zM7 8H4V5h3zM6 6H5v1h1zm1 6H4V9h3zm-1-2H5v1h1zm14 8a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm3.414 1.392l-.296.628.724 1.624-1.162 1.17-1.543-.71-.653.236-.636 1.66h-1.65l-.59-1.586-.628-.295-1.627.727-1.167-1.166.71-1.543-.236-.653-1.66-.636v-1.65l1.586-.59.295-.628-.727-1.627 1.166-1.167 1.543.71.653-.236.636-1.66h1.65l.59 1.586.628.296 1.624-.724 1.166 1.167-.705 1.538.235.653 1.66.636v1.65zm-1.277.523l.544-1.158 1.319-.49v-.582l-1.427-.548-.434-1.204.585-1.28-.412-.412-1.397.622-1.158-.544-.49-1.319h-.582l-.548 1.427-1.206.434-1.283-.59-.41.411.626 1.4-.545 1.161-1.319.49v.582l1.427.548.434 1.206-.59 1.283.411.41 1.4-.626 1.161.545.49 1.319h.582l.548-1.427 1.206-.434 1.28.588.411-.413z"/>
            <path fill="none" d="M0 0h24v24H0z"/>
          </svg>
        </div>
        <div class="w-full">
          <div class="text-gray-600 text-xl font-[600] pt-[3px]">Brak kontekstu</div>
          <div class="text-gray-600 mt-2 text-sm">Ustaw wymagany kontekst według wzoru poniżej.</div>
          <div class="text-gray-600 text-sm">Zastosuj się do wymaganego formatu.</div>
        </div>
      </div>

      @if (errorLabel()) {
        <div
          class="text-red-800 border border-red-800 py-1 px-3 mt-4 mb-7"
        >
          {{ errorLabel() }}
        </div>
      }

      <code class="mt-4 bg-gray-200 w-full p-5 block rounded-lg">
        <div class="mb-4">Wymagane pola kontextu:</div>
        <div>
          <span class="inline-block w-28">- schema</span>
        </div>
        <div>
          <span class="inline-block w-28">- table</span>
        </div>
      </code>
    </div>
  `,
  styles: [`
    .config-image {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  `],
})
export class NoContext {
  public errorLabel = input();
}
