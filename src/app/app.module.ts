import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService, platformId: Object) {
  return () => {
    console.log('Initializing Keycloak...');
    return keycloak
      .init({
        config: {
          url: 'http://localhost:8090/',
          realm: 'nourdine-realm',
          clientId: 'vetement-app',
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html',
        },
      })
      .then(() => {
        console.log('Keycloak initialized successfully');
      })
      .catch((error) => {
        console.error('Keycloak initialization failed', error);
      });
  };
}

@NgModule({
  declarations: [AppComponent, ProduitsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
