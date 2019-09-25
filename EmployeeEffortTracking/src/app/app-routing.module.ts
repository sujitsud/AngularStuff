import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomenextComponent } from './homenext/homenext.component';
import { IrttrendchartComponent } from './irttrendchart/irttrendchart.component';
import { QddtstrendchartComponent } from './qddtstrendchart/qddtstrendchart.component';
import { IrtbarchartComponent} from './irtbarchart/irtbarchart.component';
import { TimstrendchartComponent } from './timstrendchart/timstrendchart.component';
import { PrrqtrendchartComponent } from './prrqtrendchart/prrqtrendchart.component';
import { CqitrendchartComponent } from './cqitrendchart/cqitrendchart.component';
import { BprtrendchartComponent } from './bprtrendchart/bprtrendchart.component';
import { CfntrendchartComponent } from './cfntrendchart/cfntrendchart.component';
import { TimsbarchartComponent } from './timsbarchart/timsbarchart.component';
import { OverallapplicationComponent } from './overallapplication/overallapplication.component';
import {DatatableComponent} from './datatable/datatable.component';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    /* { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent  }, */
    { path: 'applications', component: HomenextComponent},
    { path: 'trendchart/irt', component: IrttrendchartComponent},
    { path: 'trendchart/qddts',component: QddtstrendchartComponent},
	{ path: 'barchart/irt',component: IrtbarchartComponent },
	{ path: 'trendchart/tims' , component : TimstrendchartComponent},
	{ path: 'trendchart/prrq', component: PrrqtrendchartComponent},
	{ path: 'applications/cqi', component: CqitrendchartComponent},
	{ path: 'applications/bpr', component: BprtrendchartComponent},
	{ path: 'applications/cfn', component: CfntrendchartComponent},
	{ path: 'barchart/tims', component: TimsbarchartComponent},
	{ path: '', component: OverallapplicationComponent, canActivate: [AuthGuard]},
	{ path: 'datatable', component: DatatableComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);