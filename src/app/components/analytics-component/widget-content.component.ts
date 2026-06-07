import { Component, computed, input } from "@angular/core";
import { Context } from "../../app.component";
import { HlmBadgeDirective } from "../ui/hlm-badge.directive";

@Component({
  selector: 'widget-content',
  standalone: true,
  templateUrl: './widget-content.component.html',
  styleUrls: ['./widget-content.component.scss'],
  imports: [
    HlmBadgeDirective,
  ]
})
export class WidgetContentComponent {
  public context = input.required<Context>();

  protected readonly summary = computed(() => {
    const contextKey = `${this.context().schema}.${this.context().table}`;
    const seed = [...contextKey].reduce((sum, char) => sum + char.charCodeAt(0), 0);

    return {
      revenue: 118000 + (seed % 31) * 1250,
      orders: 840 + (seed % 19) * 23,
      conversion: 7.4 + (seed % 9) / 10,
      retention: 64 + (seed % 7),
      growth: 12.8 + (seed % 6),
    };
  });

  protected readonly kpis = computed(() => [
    {
      label: 'Przychód',
      value: `${this.formatCurrency(this.summary().revenue)} zł`,
      change: '+12,8%',
      tone: 'good',
    },
    {
      label: 'Zamówienia',
      value: this.summary().orders.toLocaleString('pl-PL'),
      change: '+8,4%',
      tone: 'good',
    },
    {
      label: 'Konwersja',
      value: `${this.formatPercent(this.summary().conversion, 1)}`,
      change: '+1,9 pp',
    },
  ]);

  protected readonly channels = [
    { name: 'Sprzedaż bezpośrednia', value: 46, amount: '62 400 zł' },
    { name: 'Partnerzy', value: 28, amount: '37 950 zł' },
    { name: 'Marketplace', value: 18, amount: '24 300 zł' },
    { name: 'Pozostałe', value: 8, amount: '10 850 zł' },
  ];

  protected readonly insights = [
    'Największy wzrost widoczny jest w segmencie klientów powracających.',
    'Kanał partnerski utrzymuje stabilny udział przy niższym koszcie pozyskania.',
    'Warto sprawdzić produkty z wysokim ruchem i niską konwersją.',
  ];

  protected readonly growth = computed(() => this.formatPercent(this.summary().growth, 1));
  protected readonly retention = computed(() => this.formatPercent(this.summary().retention, 0));

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pl-PL', {
      maximumFractionDigits: 0,
    }).format(value);
  }

  private formatPercent(value: number, fractionDigits: number): string {
    return `${value.toFixed(fractionDigits).replace('.', ',')}%`;
  }
}
