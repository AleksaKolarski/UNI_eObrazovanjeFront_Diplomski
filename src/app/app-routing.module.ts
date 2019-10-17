import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login-page/login/login.component';
import { TestComponent } from './component/test-page/test/test.component';
import { ResultsComponent } from './component/results-page/results/results.component';
import { ResultAnalyzeComponent } from './component/result-analyze-page/result-analyze/result-analyze.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
	  path: 'results',
	  component: ResultsComponent
  },
  {
	  path: 'result/analyze',
	  component: ResultAnalyzeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
