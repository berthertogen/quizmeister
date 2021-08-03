import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDefault } from '../login/user';

@Component({
  selector: 'app-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent {
  @Input() user = new UserDefault();
}
