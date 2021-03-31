import {Application} from './application';

export class ShivaEvent {
  target: Application<any>;
  constructor(public readonly type: string) {}
}

// todo: подумать над сообщениями
export class ShivaMessageEvent extends ShivaEvent {
  static isMessageEvent(event: ShivaEvent): event is ShivaMessageEvent {
    return (
      event && event.constructor && event.constructor.name === ShivaMessageEvent.name
    );
  }
}

// todo: подумать над ивентами роутинга
export class ShivaNavigationEvent extends ShivaEvent {
  static isNavigationEvent(event: ShivaEvent): event is ShivaNavigationEvent {
    return (
      event && event.constructor && event.constructor.name === ShivaNavigationEvent.name
    );
  }
}
