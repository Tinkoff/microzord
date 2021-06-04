import {MicrozordEvent} from './events';

export enum LifecycleEventTypes {
  bootstrapped = 'bootstrapped',
  destroyed = 'destroyed',
}

export class MicrozordLifecycleEvent extends MicrozordEvent {
  static isLifecycleEvent(event: MicrozordEvent): event is MicrozordLifecycleEvent {
    return (
      event &&
      event.constructor &&
      event.constructor.name === MicrozordLifecycleEvent.name
    );
  }

  static bootstrapped(): MicrozordLifecycleEvent {
    return new MicrozordLifecycleEvent(LifecycleEventTypes.bootstrapped);
  }

  static isBootstrappedEvent(event: MicrozordLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.bootstrapped;
  }

  static destroyed(): MicrozordLifecycleEvent {
    return new MicrozordLifecycleEvent(LifecycleEventTypes.destroyed);
  }

  static isDestroyedEvent(event: MicrozordLifecycleEvent): boolean {
    return event.type === LifecycleEventTypes.destroyed;
  }
}
