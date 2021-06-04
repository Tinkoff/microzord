import {Application} from './application';

export class MicrozordEvent {
  target: Application<any> | null = null;
  constructor(public readonly type: string) {}
}

// todo: подумать над сообщениями
export class MicrozordMessageEvent extends MicrozordEvent {
  static isMessageEvent(event: MicrozordEvent): event is MicrozordMessageEvent {
    return (
      event && event.constructor && event.constructor.name === MicrozordMessageEvent.name
    );
  }
}

// todo: подумать над ивентами роутинга
export class MicrozordNavigationEvent extends MicrozordEvent {
  static isNavigationEvent(event: MicrozordEvent): event is MicrozordNavigationEvent {
    return (
      event &&
      event.constructor &&
      event.constructor.name === MicrozordNavigationEvent.name
    );
  }
}
