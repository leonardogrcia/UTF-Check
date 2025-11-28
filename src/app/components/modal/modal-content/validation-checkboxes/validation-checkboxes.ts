import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-validation-checkboxes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './validation-checkboxes.html',
  styleUrls: ['./validation-checkboxes.scss'],
})
export class ValidationModalComponent {
  percentage = 0;
  options = ['Áreas comuns', 'Banheiros', 'Produção', 'Utensílios', 'Resíduos', 'Manipuladores'];

  @Output() percentageChange = new EventEmitter<number>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      options: this.fb.array(this.options.map(() => new FormControl(false))),
    });

    this.form.valueChanges.subscribe(() => {
      this.calculatePercentage();
    });
  }

  selectedValues(): string[] {
    const selected: string[] = [];
    this.form.value.options.forEach((checked: boolean, i: number) => {
      if (checked) {
        selected.push(this.options[i]);
      }
    });
    return selected;
  }

  private calculatePercentage() {
    const total = this.options.length;
    const selected = this.form.value.options.filter((checked: boolean) => checked).length;
    const percentage = Math.round((selected / total) * 100);
    this.percentageChange.emit(percentage);
  }
}
