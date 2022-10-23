import { ChangeDetectorRef, Component, Input, OnChanges, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateHelper } from '@shared/helpers/translate.helper';
import { ErrorStateMatcher } from '@angular/material/core';

type OnChangeFn = (value: ModelValue) => void;
type OnTouchedFn = () => void;
type InputValue = string | null;
type ModelValue = string | number | null;

class InputErrorStateMatcher implements ErrorStateMatcher {
  constructor(private readonly ngControl: NgControl) {}

  isErrorState(): boolean {
    const control = this.ngControl.control;
    return !!control && control.invalid && control.enabled && control.touched;
  }
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  @Input() label?: string;
  @Input() labelTranslation?: string;
  @Input() placeholder?: string;
  @Input() placeholderTranslation?: string;
  @Input() hint?: string;
  @Input() hintTranslation?: string;
  @Input() iconName?: string;
  @Input() type: 'text' | 'number' = 'text';

  readonly controlName?: string;
  readonly inputErrorStateMatcher: InputErrorStateMatcher;
  disabled = false;
  value: InputValue = null;
  translatedLabel = '';
  translatedPlaceholder = '';
  translatedHint = '';

  constructor(
    @Self() private readonly ngControl: NgControl,
    private readonly translateHelper: TranslateHelper,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.ngControl.valueAccessor = this;
    this.inputErrorStateMatcher = new InputErrorStateMatcher(this.ngControl);
    this.controlName = this.ngControl.name?.toString();
  }

  get errorMessage(): string {
    let message = '';
    Object.entries(this.ngControl.errors ?? {}).forEach(([validatorName, params]) => {
      const error = this.translateHelper.translate.instant(`validators.${validatorName}`, params);
      message += ` ${error}`;
    });
    return message;
  }

  ngOnChanges(): void {
    this.setTranslatedLabel();
    this.setTranslatedPlaceholder();
    this.setTranslatedHint();
  }

  onChange: OnChangeFn = () => null;

  onTouched: OnTouchedFn = () => null;

  registerOnChange(onChange: OnChangeFn): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: OnTouchedFn): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(modelValue: ModelValue): void {
    this.value = modelValue != null ? `${modelValue}` : null;
    this.cdr.detectChanges();
  }

  updateModelValue(inputValue: InputValue): void {
    const modelValue: ModelValue = this.type === 'number' && inputValue ? parseInt(inputValue, 10) : this.value;
    this.onChange(modelValue);
    this.onTouched();
    this.cdr.detectChanges();
  }

  private setTranslatedLabel(): void {
    this.translatedLabel = this.translateHelper.getRawOrTranslatedOrEmpty(this.label, this.labelTranslation);
  }

  private setTranslatedPlaceholder(): void {
    this.translatedPlaceholder = this.translateHelper.getRawOrTranslatedOrEmpty(
      this.placeholder,
      this.placeholderTranslation,
    );
  }

  private setTranslatedHint(): void {
    this.translatedHint = this.translateHelper.getRawOrTranslatedOrEmpty(this.hint, this.hintTranslation);
  }
}
