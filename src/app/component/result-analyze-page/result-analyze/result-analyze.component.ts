import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/model/result';
import { ResultService } from 'src/app/service/result.service';

@Component({
	selector: 'app-result-analyze',
	templateUrl: './result-analyze.component.html',
	styleUrls: ['./result-analyze.component.scss']
})
export class ResultAnalyzeComponent implements OnInit {

	resultID: number;
	result: Result;

	constructor(private route: ActivatedRoute,
		private resultService: ResultService) { }

	ngOnInit() {

		// extract result ID from url
		this.route.params.subscribe(params => {
			this.resultID = params['resultID'];
			this.resultService.getResult(this.resultID).subscribe(data=>{
				this.result = data;
				console.log(this.result);
			});
		});
	}

}
