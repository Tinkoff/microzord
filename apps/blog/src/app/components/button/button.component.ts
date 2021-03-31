import {Component, HostBinding} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @HostBinding('class')
  sss =
    // eslint-disable-next-line max-len
    'inline-block flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white';
}
