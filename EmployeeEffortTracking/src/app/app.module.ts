import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { HomenextComponent } from './homenext/homenext.component';
import {DatePipe} from '@angular/common';
import { IrttrendchartComponent } from './irttrendchart/irttrendchart.component';
import { QddtstrendchartComponent } from './qddtstrendchart/qddtstrendchart.component';
import { IrtbarchartComponent } from './irtbarchart/irtbarchart.component';
import { TimstrendchartComponent } from './timstrendchart/timstrendchart.component';
import { PrrqtrendchartComponent } from './prrqtrendchart/prrqtrendchart.component';
import { CqitrendchartComponent } from './cqitrendchart/cqitrendchart.component';
import { BprtrendchartComponent } from './bprtrendchart/bprtrendchart.component';
import { CfntrendchartComponent } from './cfntrendchart/cfntrendchart.component';
import { TimsbarchartComponent } from './timsbarchart/timsbarchart.component';
import { OverallapplicationComponent } from './overallapplication/overallapplication.component';
import {MatButtonModule, MatGridListModule, MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DatatableComponent } from './datatable/datatable.component';
import {DataTableModule} from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import { PreventDoubleSubmitModule } from 'ngx-prevent-double-submission';
import { DebounceClickDirective } from './datatable/debounce-click-directive';




@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
		routing,
		MatButtonModule,
		BrowserAnimationsModule,
		MatGridListModule,
		MatDialogModule	,
		NgbModule.forRoot(),
		NgbPaginationModule,
		NgbAlertModule,
		MDBBootstrapModule.forRoot(),
		AngularFontAwesomeModule,
		DataTableModule,
		FormsModule ,
		PreventDoubleSubmitModule.forRoot() ,
		
		
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HomenextComponent,
        IrttrendchartComponent,
        QddtstrendchartComponent,
        IrtbarchartComponent,
        TimstrendchartComponent,
        PrrqtrendchartComponent,
        CqitrendchartComponent,
        BprtrendchartComponent,
        CfntrendchartComponent,
        TimsbarchartComponent,
        OverallapplicationComponent,
		DatatableComponent,
		DebounceClickDirective,
	
	
		
	],
	
    providers: [
		AuthGuard,
		IrttrendchartComponent,
        AlertService,
        AuthenticationService,
        DatePipe,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
		fakeBackendProvider,
		
		
    ],
    bootstrap: [AppComponent, HomeComponent]
})

export class AppModule { }