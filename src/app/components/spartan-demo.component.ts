import { Component, signal } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { BrnSwitchImports } from '@spartan-ng/brain/switch';
import { BrnCheckboxImports } from '@spartan-ng/brain/checkbox';
import { HlmButtonDirective } from './ui/hlm-button.directive';
import { HlmBadgeDirective } from './ui/hlm-badge.directive';

@Component({
  selector: 'spartan-demo',
  standalone: true,
  imports: [
    BrnButton,
    HlmButtonDirective,
    HlmBadgeDirective,
    ...BrnSwitchImports,
    ...BrnCheckboxImports,
  ],
  template: `
    <div class="min-h-screen bg-slate-50 p-8 font-sans">
      <div class="max-w-3xl mx-auto space-y-10">

        <!-- Header -->
        <div class="border-b border-slate-200 pb-6">
          <h1 class="text-2xl font-bold text-slate-900">Spartan UI – Demo</h1>
          <p class="text-slate-500 mt-1 text-sm">
            Przykładowe komponenty oparte na <code class="bg-slate-100 px-1 rounded text-xs">@spartan-ng/brain</code>
            + dyrektywach <code class="bg-slate-100 px-1 rounded text-xs">hlm*</code>
          </p>
        </div>

        <!-- Buttons -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400">Przyciski</h2>

          <div class="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <p class="text-xs text-slate-400 font-mono">Warianty</p>
            <div class="flex flex-wrap gap-2">
              <button brnButton hlmBtn>Default</button>
              <button brnButton hlmBtn variant="secondary">Secondary</button>
              <button brnButton hlmBtn variant="outline">Outline</button>
              <button brnButton hlmBtn variant="destructive">Destructive</button>
              <button brnButton hlmBtn variant="ghost">Ghost</button>
              <button brnButton hlmBtn variant="link">Link</button>
            </div>

            <p class="text-xs text-slate-400 font-mono">Rozmiary</p>
            <div class="flex flex-wrap items-center gap-2">
              <button brnButton hlmBtn size="sm">Small</button>
              <button brnButton hlmBtn size="default">Default</button>
              <button brnButton hlmBtn size="lg">Large</button>
            </div>

            <p class="text-xs text-slate-400 font-mono">Stany</p>
            <div class="flex flex-wrap gap-2">
              <button brnButton hlmBtn [disabled]="true">Disabled</button>
              <button brnButton hlmBtn variant="outline" [disabled]="true">Disabled outline</button>
            </div>
          </div>
        </section>

        <!-- Badges -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400">Odznaki</h2>

          <div class="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <p class="text-xs text-slate-400 font-mono">Warianty</p>
            <div class="flex flex-wrap gap-2">
              <span hlmBadge>Default</span>
              <span hlmBadge variant="secondary">Secondary</span>
              <span hlmBadge variant="outline">Outline</span>
              <span hlmBadge variant="destructive">Destructive</span>
            </div>

            <p class="text-xs text-slate-400 font-mono">Użycie z przyciskami</p>
            <div class="flex flex-wrap items-center gap-3">
              <button brnButton hlmBtn variant="outline">
                Powiadomienia
                <span hlmBadge variant="destructive">3</span>
              </button>
              <button brnButton hlmBtn variant="secondary">
                Status
                <span hlmBadge>aktywny</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Switch -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400">Przełącznik (Switch)</h2>

          <div class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <p class="text-xs text-slate-400 font-mono">
              Stan: <span class="text-slate-700 font-semibold">{{ switch1() ? 'włączony' : 'wyłączony' }}</span>
            </p>

            <div class="flex items-center gap-4">
              <brn-switch
                [(checked)]="switch1"
                [class]="'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ' + (switch1() ? 'bg-slate-900' : 'bg-slate-200')"
              >
                <brn-switch-thumb
                  [class]="'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ' + (switch1() ? 'translate-x-5' : 'translate-x-0')"
                />
              </brn-switch>
              <span class="text-sm text-slate-700">Tryb ciemny</span>
            </div>

            <div class="flex items-center gap-4">
              <brn-switch
                [(checked)]="switch2"
                [class]="'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ' + (switch2() ? 'bg-emerald-500' : 'bg-slate-200')"
              >
                <brn-switch-thumb
                  [class]="'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ' + (switch2() ? 'translate-x-5' : 'translate-x-0')"
                />
              </brn-switch>
              <span class="text-sm text-slate-700">Powiadomienia e-mail</span>
            </div>

            <div class="flex items-center gap-4">
              <brn-switch
                [disabled]="true"
                [class]="'inline-flex h-6 w-11 shrink-0 cursor-not-allowed items-center rounded-full border-2 border-transparent transition-colors opacity-50 bg-slate-200'"
              >
                <brn-switch-thumb
                  class="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 translate-x-0"
                />
              </brn-switch>
              <span class="text-sm text-slate-400">Wyłączony</span>
            </div>
          </div>
        </section>

        <!-- Checkbox -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400">Checkbox</h2>

          <div class="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <p class="text-xs text-slate-400 font-mono">
              Zaznaczone: <span class="text-slate-700 font-semibold">{{ selectedCount() }} / 3</span>
            </p>

            <div class="space-y-3">
              @for (item of checkboxItems; track item.id) {
                <label class="flex items-center gap-3 cursor-pointer group">
                  <brn-checkbox
                    [(checked)]="item.checked"
                    [class]="'h-5 w-5 shrink-0 rounded border-2 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ' + (item.checked() ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-300 group-hover:border-slate-400')"
                  >
                    @if (item.checked()) {
                      <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    }
                  </brn-checkbox>
                  <span class="text-sm text-slate-700 select-none">{{ item.label }}</span>
                </label>
              }

              <label class="flex items-center gap-3 cursor-not-allowed opacity-50">
                <brn-checkbox
                  [disabled]="true"
                  class="h-5 w-5 shrink-0 rounded border-2 border-slate-300 bg-white flex items-center justify-center"
                />
                <span class="text-sm text-slate-400 select-none">Wyłączona opcja</span>
              </label>
            </div>
          </div>
        </section>

        <!-- Stack info -->
        <div class="text-xs text-slate-400 text-center pb-4">
          Angular {{ angularVersion }} · Spartan-ng Brain · Tailwind CSS v4
        </div>

      </div>
    </div>
  `,
})
export class SpartanDemoComponent {
  switch1 = signal(false);
  switch2 = signal(true);

  checkboxItems = [
    { id: 1, label: 'Opcja pierwsza', checked: signal(true) },
    { id: 2, label: 'Opcja druga', checked: signal(false) },
    { id: 3, label: 'Opcja trzecia', checked: signal(true) },
  ];

  selectedCount = () => this.checkboxItems.filter(i => i.checked()).length;

  readonly angularVersion = '20';
}