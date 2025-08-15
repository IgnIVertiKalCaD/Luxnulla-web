import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [

    ],
  },

  // {
  //   path: "**",
  //   loadChildren: () =>
  //     import("./errors/errors.module").then((m) => m.ErrorsModule),
  // },
];
