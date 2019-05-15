import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'push-receipt', loadChildren: './push-receipt/push-receipt.module#PushReceiptPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
