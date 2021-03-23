export class Event {
  constructor(public readonly type: string) {}
}

// todo: подумать над ивентами жизненного цикла
export class LifecycleEvent extends Event {
  constructor() {
    super('LifecycleEvent');
  }
}

// todo: подумать над сообщениями
export class MessageEvent extends Event {
  constructor() {
    super('MessageEvent');
  }
}

// todo: подумать над ивентами роутинга
export class NavigationEvent extends Event {
  constructor() {
    super('NavigationEvent');
  }
}
