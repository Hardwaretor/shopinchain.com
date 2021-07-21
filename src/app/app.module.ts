import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContractService } from './services/contract/contract.service';
import { AccountService } from './services/account.service';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HomeComponent } from './home/home.component';
import { VRComponent } from './vr/vr.component';
import { AccountComponent } from './account/account.component';
import { AppMaterialModule } from "./app-material.module";
import { AppRoutingModule } from './app-routing.module';
import { ThriftComponent } from './thrift/thrift.component';
import { NftComponent } from './nft/nft.component';
import { GamesComponent } from './games/games.component';
import { ProjectsComponent } from './projects/projects.component';
import { NewsComponent } from './news/news.component';
import { ParcelsComponent } from './parcels/parcels.component';


@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    AccountComponent,
    HomeComponent,
    ThriftComponent,
    NftComponent,
    GamesComponent,
    ProjectsComponent,
    NewsComponent,
    ParcelsComponent,
    VRComponent
  ],
  imports: [
    AppRoutingModule,
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ContractService,AccountService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
