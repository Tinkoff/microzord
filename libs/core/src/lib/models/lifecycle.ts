import {RooferEvent} from './events';

export enum LifecycleEventTypes {
  bootstrapped = 'bootstrapped',
  destroyed = 'destroyed',
}

export class RooferLifecycleEvent extends RooferEvent {
  static isLifecycleEvent(event: RooferEvent): event is RooferLifecycleEvent {
    return (
      event && event.constructor && event.constructor.name === RooferLifecycleEvent.name
    );
  }

  static bootstrapped(): RooferLifecycleEvent {
    return new RooferLifecycleEvent(LifecycleEventTypes.bootstrapped);
  }

  static isBootstrappedEvent(event: RooferLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.bootstrapped;
  }

  static destroyed(): RooferLifecycleEvent {
    return new RooferLifecycleEvent(LifecycleEventTypes.destroyed);
  }

  static isDestroyedEvent(event: RooferLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.destroyed;
  }
}
