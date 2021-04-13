import {Application} from './application';

export class RooferEvent {
  target: Application<any> | null = null;
  constructor(public readonly type: string) {}
}

// todo: подумать над сообщениями
export class RooferMessageEvent extends RooferEvent {
  static isMessageEvent(event: RooferEvent): event is RooferMessageEvent {
    return (
      event && event.constructor && event.constructor.name === RooferMessageEvent.name
    );
  }
}

// todo: подумать над ивентами роутинга
export class RooferNavigationEvent extends RooferEvent {
  static isNavigationEvent(event: RooferEvent): event is RooferNavigationEvent {
    return (
      event && event.constructor && event.constructor.name === RooferNavigationEvent.name
    );
  }
}
