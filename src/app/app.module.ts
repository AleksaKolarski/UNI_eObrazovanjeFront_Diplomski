import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RxStompService } from '@stomp/ng2-stompjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login-page/login/login.component';
import { QuestionComponent } from './component/test-page/question/question.component';
import { AnswerComponent } from './component/test-page/answer/answer.component';
import { TestComponent } from './component/test-page/test/test.component';
import { ResultsComponent } from './component/results-page/results/results.component';
import { ResultNameComponent } from './component/results-page/result-name/result-name.component';
import { ResultAnalyzeComponent } from './component/result-analyze-page/result-analyze/result-analyze.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		QuestionComponent,
		AnswerComponent,
		TestComponent,
		ResultsComponent,
		ResultNameComponent,
		ResultAnalyzeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
		RxStompService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
