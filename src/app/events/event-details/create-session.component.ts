import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared/event.model';

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html'
})
export class CreateSessionComponent implements OnInit {
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;
  newSessionForm: FormGroup;
  @Output() saveNewSession = new EventEmitter();

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords(['foo', 'bar'])]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  private restrictedWords(words) {
    return (control: FormControl): {[key: string]: any} => {
      if (!words) return null;

      var invalidWords = words
        .map(w => control.value.includes(w) ? w : null)
        .filter(w => w != null)

      return invalidWords  && invalidWords.length > 0
        ? {'restrictedWords' : invalidWords.join(', ')}
        : null
    }
  }

  saveSession(formValues) {
    let session:ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    };

    //this.saveNewSession.emit(session);
  }
}
