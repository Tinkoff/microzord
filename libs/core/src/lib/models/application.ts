import {RooferEvent, RooferMessageEvent, RooferNavigationEvent} from './events';
import {RooferLifecycleEvent} from './lifecycle';

export type Listener<T extends RooferEvent> = (event: T) => void;

export abstract class Application<T extends Record<string, any> = Record<string, any>> {
  isBootstrapped = false;
  isDestroyed = true;
  container: string | Element;

  protected readonly hook = new Set<Listener<RooferLifecycleEvent>>();
  protected readonly message = new Set<Listener<RooferMessageEvent>>();
  protected readonly navigationEvent = new Set<Listener<RooferNavigationEvent>>();

  // todo: заспекать типы props
  constructor(public readonly name: string, public props?: T) {}

  onMessage(fn: Listener<RooferMessageEvent>): () => void {
    this.message.add(fn);

    return () => {
      this.message.delete(fn);
    };
  }

  emitMessage(event: RooferMessageEvent) {
    this.callListeners(this.message, event);
  }

  onRouteChange(fn: Listener<RooferNavigationEvent>): () => void {
    this.navigationEvent.add(fn);

    return () => {
      this.navigationEvent.delete(fn);
    };
  }

  emitRouteChange(event: RooferNavigationEvent) {
    this.callListeners(this.navigationEvent, event);
  }

  onHook(fn: Listener<RooferLifecycleEvent>): () => void {
    this.hook.add(fn);

    return () => {
      this.hook.delete(fn);
    };
  }

  emitHook(event: RooferLifecycleEvent) {
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

  abstract send(msg: string | RooferMessageEvent): Promise<void>;

  // todo: шо за пропс? Надо придумать
  abstract navigate(url: string, props?: unknown): Promise<void>;

  protected callListeners<K extends RooferEvent>(listeners: Set<Listener<K>>, event: K) {
    event.target = this;

    [...listeners].forEach(fn => {
      fn(event);
    });
  }
}

export interface ApplicationConstructor<
  T extends Record<string, any> = Record<string, any>
> {
  new (name: string, props?: T): Application<T>;
}
