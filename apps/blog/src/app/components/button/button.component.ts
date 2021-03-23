import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @HostBinding('class')
  sss =
    'inline-block flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white';

  constructor() {}

  ngOnInit(): void {}
}
