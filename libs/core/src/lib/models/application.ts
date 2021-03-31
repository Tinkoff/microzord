import {ShivaEvent, ShivaMessageEvent, ShivaNavigationEvent} from './events';
import {ShivaLifecycleEvent} from './lifecycle';

export type Listener<T extends ShivaEvent> = (event: T) => void;

export abstract class Application<T = void> {
  isBootstrapped = false;
  isDestroyed = true;
  container: string | Element;

  protected readonly hook = new Set<Listener<ShivaLifecycleEvent>>();
  protected readonly message = new Set<Listener<ShivaMessageEvent>>();
  protected readonly navigationEvent = new Set<Listener<ShivaNavigationEvent>>();

  // todo: заспекать типы props
  constructor(public readonly name: string, public props?: T) {}

  onMessage(fn: Listener<ShivaMessageEvent>): () => void {
    this.message.add(fn);

    return () => {
      this.message.delete(fn);
    };
  }

  emitMessage(event: ShivaMessageEvent) {
    this.callListeners(this.message, event);
  }

  onRouteChange(fn: Listener<ShivaNavigationEvent>): () => void {
    this.navigationEvent.add(fn);

    return () => {
      this.navigationEvent.delete(fn);
    };
  }

  emitRouteChange(event: ShivaNavigationEvent) {
    this.callListeners(this.navigationEvent, event);
  }

  onHook(fn: Listener<ShivaLifecycleEvent>): () => void {
    this.hook.add(fn);
    console.log('hooks');

    return () => {
      console.log('hooks 1');
      this.hook.delete(fn);
    };
  }

  emitHook(event: ShivaLifecycleEvent) {
    this.callListeners(this.hook, event);
  }

  destroy() {
    this.hook.clear(); // todo: в этот поток перед комплитом нужен евент дестроя
    this.message.clear();
    this.navigationEvent.clear();

    this.isBootstrapped = false;
    this.isDestroyed = true;
  }

  async bootstrap(container: string | Element, _props?: T): Promise<void> {
    this.isBootstrapped = true;
    this.container = container;
  }

  abstract send(msg: string | ShivaMessageEvent): Promise<void>;

  // todo: шо за пропс? Надо придумать
  abstract navigate(url: string, props?: unknown): Promise<void>;

  protected callListeners<K extends ShivaEvent>(listeners: Set<Listener<K>>, event: K) {
    event.target = this;

    [...listeners].forEach(fn => {
      fn(event);
    });
  }
}

export interface ApplicationConstructor<T = void> {
  new (name: string, props?: T): Application<T>;
}
