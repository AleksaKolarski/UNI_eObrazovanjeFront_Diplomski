import { Component, OnInit, Input } from '@angular/core';
import { ResultName } from 'src/app/model/result-name';

@Component({
	selector: 'app-result-name',
	templateUrl: './result-name.component.html',
	styleUrls: ['./result-name.component.scss']
})
export class ResultNameComponent implements OnInit {

	@Input()
	resultName: ResultName;

	constructor() { }

	ngOnInit() {
	}

}
