import {ShivaEvent} from './events';

export enum LifecycleEventTypes {
  bootstrapped = 'bootstrapped',
  destroyed = 'destroyed',
}

export class ShivaLifecycleEvent extends ShivaEvent {
  static isLifecycleEvent(event: ShivaEvent): event is ShivaLifecycleEvent {
    return (
      event && event.constructor && event.constructor.name === ShivaLifecycleEvent.name
    );
  }

  static bootstrapped(): ShivaLifecycleEvent {
    return new ShivaLifecycleEvent(LifecycleEventTypes.bootstrapped);
  }

  static isBootstrappedEvent(event: ShivaLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.bootstrapped;
  }

  static destroyed(): ShivaLifecycleEvent {
    return new ShivaLifecycleEvent(LifecycleEventTypes.destroyed);
  }

  static isDestroyedEvent(event: ShivaLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.destroyed;
  }
}
