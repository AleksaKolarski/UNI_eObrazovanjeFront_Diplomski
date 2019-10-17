import { Component, OnInit, Input } from '@angular/core';
import { ResultService } from 'src/app/service/result.service';
import { ResultName } from 'src/app/model/result-name';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

	resultNames: ResultName[];

	constructor(private resultService: ResultService) { }

	ngOnInit() {
		this.resultService.getAllResultNames().subscribe(data => {
			this.resultNames = data;
		});
	}

}
