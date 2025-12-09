import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-validation-checkboxes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './validation-checkboxes.html',
  styleUrls: ['./validation-checkboxes.scss'],
})
export class ValidationModalComponent implements OnChanges {
  @Input() options: { name: string; checked?: boolean }[] = [];
  @Output() progressChange = new EventEmitter<{ percentage: number; selected: number; total: number }>();

  percentage = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.buildForm([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.form = this.buildForm(this.options || []);
      this.form.valueChanges.subscribe(() => {
        this.calculatePercentage();
      });
      this.calculatePercentage();
    }
  }

  selectedValues(): string[] {
    const selected: string[] = [];
    this.form.value.options.forEach((checked: boolean, i: number) => {
      if (checked) {
        selected.push(this.options[i]?.name ?? '');
      }
    });
    return selected;
  }

  private calculatePercentage() {
    const total = this.options.length;
    const selected = this.form.value.options.filter((checked: boolean) => checked).length;
    const percentage = total ? Math.round((selected / total) * 100) : 0;
    this.progressChange.emit({ percentage, selected, total });
  }

  private buildForm(options: { name: string; checked?: boolean }[]): FormGroup {
    return this.fb.group({
      options: this.fb.array(options.map((opt) => new FormControl(!!opt.checked))),
    });
  }
}
