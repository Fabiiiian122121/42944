import { createComponentFactory, Spectator, mockProvider } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { AppService } from './services/app/app.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [
      provideHttpClient(),
      mockProvider(AppService, {
        events$: of(),
      }),
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
