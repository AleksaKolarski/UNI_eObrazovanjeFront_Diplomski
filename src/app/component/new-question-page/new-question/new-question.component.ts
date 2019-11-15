import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuestionService } from 'src/app/service/question.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-question',
	templateUrl: './new-question.component.html',
	styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

	forma: FormGroup;

	constructor(private formBuilder: FormBuilder,
		private questionService: QuestionService,
		private _router: Router) { }

	ngOnInit() {

		this.forma = this.formBuilder.group({
			question: [''],
			answer1: [''],
			answer2: [''],
			answer3: [''],
			answer4: [''],
			answer1Correct: [''],
			answer2Correct: [''],
			answer3Correct: [''],
			answer4Correct: ['']
		});
	}

	onSubmit() {
		var question: Question = {} as Question;
		question.answers = [] as Answer[];

		question.answers.push({} as Answer);
		question.answers.push({} as Answer);
		question.answers.push({} as Answer);
		question.answers.push({} as Answer);

		question.answers[0].body = this.forma.controls.answer1.value;
		question.answers[0].correct = this.forma.controls.answer1Correct.value == true;

		question.answers[1].body = this.forma.controls.answer2.value;
		question.answers[1].correct = this.forma.controls.answer2Correct.value == true;

		question.answers[2].body = this.forma.controls.answer3.value;
		question.answers[2].correct = this.forma.controls.answer3Correct.value == true;

		question.answers[3].body = this.forma.controls.answer4.value;
		question.answers[3].correct = this.forma.controls.answer4Correct.value == true;

		question.body = this.forma.controls.question.value;

		this.questionService.create(question).subscribe(data => {
			location.href = "/addQuestion";
		});
	}

}
