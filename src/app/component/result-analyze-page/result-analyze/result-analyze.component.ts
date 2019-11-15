import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/model/result';
import { ResultService } from 'src/app/service/result.service';
import { Timeline } from 'vis';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/model/question';

@Component({
	selector: 'app-result-analyze',
	templateUrl: './result-analyze.component.html',
	styleUrls: ['./result-analyze.component.scss']
})
export class ResultAnalyzeComponent implements OnInit {

	resultID: number;
	result: Result;
	lista: Object[];
	grupe: Object[];
	timeline: Timeline;
	questions: Question[];

	constructor(private route: ActivatedRoute,
		private resultService: ResultService,
		private questionService: QuestionService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.resultID = params['resultID'];
			this.resultService.getResult(this.resultID).subscribe(data => {
				this.result = data;
				this.createTimeline();
				this.initQuestionList();
			});
		});
	}

	initQuestionList() {
		this.questions = [];
		this.result.answers.forEach(element => {
			this.questionService.getById(element.questionId).subscribe((data: Question) => {
				data['selectedAnswerId'] = element.answerId;
				this.questions.push(data);
			});
		});
	}

	setAnswerColor(question, answer) {
		return {
			'class-answer-green': answer.id == question.selectedAnswerId && answer.correct,
			'class-answer-red': answer.id == question.selectedAnswerId && !answer.correct,
			'class-answer-yellow': answer.id != question.selectedAnswerId && answer.correct
		};
	}

	createData() {
		this.lista = [];
		this.grupe = [];
		var questionID = -1;
		var answerID = -1;
		var questionBegin: Date;
		var answerBegin: Date;

		this.result.log.forEach(logEntry => {
			if (logEntry.type == "question") {
				if (questionID == -1 && logEntry.after != -1) {
					questionID = logEntry.after;
					questionBegin = logEntry.time;
				}
				else if (questionID != -1 && (logEntry.after != questionID || logEntry.after == -1)) {
					if (this.grupe.find((element) => {
						return element['id'] == questionID.toString();
					}) == undefined) {
						this.grupe.push({ id: questionID.toString() });
					}
					this.lista.push({
						content: questionID.toString(), 
						start: new Date(questionBegin), 
						end: new Date(logEntry.time), 
						group: questionID.toString(), 
						style: 'background-color: LightGray; line-height: 0; z-index: 0; font-size: 11px; height: 37px;' 
					});
					questionID = logEntry.after;
					questionBegin = logEntry.time;
				}
			}
			if (logEntry.type == "answer") {
				if (answerID == -1 && logEntry.after != -1) {
					answerID = logEntry.after;
					answerBegin = logEntry.time;
				}
				else if (answerID != -1 && (logEntry.after != answerID || logEntry.after == -1)) {
					this.lista.push({
						content: answerID.toString(), 
						start: new Date(answerBegin), 
						end: new Date(logEntry.time), 
						group: questionID.toString(), 
						style: 'text-align: center; height: 20px; font-size: 11px; z-index: 1;' 
					});
					answerID = logEntry.after;
					answerBegin = logEntry.time;
				}
			}
		});
	}

	createTimeline() {
		var container = document.getElementById('visualization');
		this.createData();
		this.timeline = new Timeline(container, this.lista, this.grupe, {stack: false});
	}
}
