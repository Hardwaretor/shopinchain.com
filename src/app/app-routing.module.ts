import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { VRComponent } from './vr/vr.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { ThriftComponent } from './thrift/thrift.component';
import { NftComponent } from './nft/nft.component';
import { GamesComponent } from './games/games.component';
import { ProjectsComponent } from './projects/projects.component';
import { NewsComponent } from './news/news.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { PreSaleComponent } from './pre-sale/pre-sale.component';

const routes: Routes = [

  { path: '*',  redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', component: HomeComponent},
  { path: 'pre-sale', pathMatch: 'full', component: PreSaleComponent},
  //{ path: 'vr', pathMatch: 'full', component: VRComponent},
  { path: 'account', pathMatch: 'full', component: AccountComponent},
  { path: 'thrift', pathMatch: 'full', component: ThriftComponent},
  { path: 'games', pathMatch: 'full', component: GamesComponent},
  { path: 'nft', pathMatch: 'full', component: NftComponent},
  { path: 'projects', pathMatch: 'full', component: ProjectsComponent},
  { path: 'news', pathMatch: 'full', component: NewsComponent},
  { path: 'parcels', pathMatch: 'full', component: ParcelsComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
