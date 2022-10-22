import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateHelper } from '@shared/helpers/translate.helper';

type OnChangeFn = (value: ModelValue) => void;
type OnTouchedFn = () => void;
type InputValue = string | null;
type ModelValue = string | number | null;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() labelTranslation?: string;
  @Input() placeholder?: string;
  @Input() placeholderTranslation?: string;
  @Input() hint?: string;
  @Input() hintTranslation?: string;
  @Input() iconName?: string;
  @Input() type: 'text' | 'number' = 'text';

  controlName?: string;
  disabled = false;
  value: InputValue = null;

  constructor(
    @Self() private readonly ngControl: NgControl,
    private readonly translateHelper: TranslateHelper,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.ngControl.valueAccessor = this;
    this.controlName = this.ngControl.name?.toString();
  }

  get translatedLabel(): string {
    return this.translateHelper.getRawOrTranslatedOrEmpty(this.label, this.labelTranslation);
  }

  get translatedPlaceholder(): string {
    return this.translateHelper.getRawOrTranslatedOrEmpty(this.placeholder, this.placeholderTranslation);
  }

  get translatedHint(): string {
    return this.translateHelper.getRawOrTranslatedOrEmpty(this.hint, this.hintTranslation);
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
  }
}
