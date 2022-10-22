import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  readonly vm$ = combineLatest([this.configurationService.getAllGrades()]).pipe(map(([grades]) => ({ grades })));

  constructor(private readonly configurationService: ConfigurationService) {}

  ngOnInit(): void {}
}
