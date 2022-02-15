import {MicrozordEvent, MicrozordMessageEvent, MicrozordNavigationEvent} from './events';
import {MicrozordLifecycleEvent} from './lifecycle';
import {EntityConstructor} from './entity';

export type Listener<T extends MicrozordEvent> = (event: T) => void;

export abstract class Application<T extends Record<string, any> = Record<string, any>> {
  isBootstrapped = false;
  isDestroyed = true;
  container: Element | string = '';

  protected readonly hook = new Set<Listener<MicrozordLifecycleEvent>>();
  protected readonly message = new Set<Listener<MicrozordMessageEvent>>();
  protected readonly navigationEvent = new Set<Listener<MicrozordNavigationEvent>>();

  // todo: заспекать типы props
  constructor(public readonly name: string, public props?: T) {}

  onMessage(fn: Listener<MicrozordMessageEvent>): () => void {
    this.message.add(fn);

    return () => {
      this.message.delete(fn);
    };
  }

  emitMessage(event: MicrozordMessageEvent) {
    this.callListeners(this.message, event);
  }

  onRouteChange(fn: Listener<MicrozordNavigationEvent>): () => void {
    this.navigationEvent.add(fn);

    return () => {
      this.navigationEvent.delete(fn);
    };
  }

  emitRouteChange(event: MicrozordNavigationEvent) {
    this.callListeners(this.navigationEvent, event);
  }

  onHook(fn: Listener<MicrozordLifecycleEvent>): () => void {
    this.hook.add(fn);

    return () => {
      this.hook.delete(fn);
    };
  }

  emitHook(event: MicrozordLifecycleEvent) {
    this.callListeners(this.hook, event);
  }

  destroy() {
    this.emitHook(MicrozordLifecycleEvent.destroyed());

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

  abstract send(msg: string | MicrozordMessageEvent): Promise<void>;

  // todo: шо за пропс? Надо придумать
  abstract navigate(url: string, props?: unknown): Promise<void>;

  protected callListeners<K extends MicrozordEvent>(
    listeners: Set<Listener<K>>,
    event: K,
  ) {
    event.target = this;

    [...listeners].forEach(fn => {
      fn(event);
    });
  }
}

export type ApplicationConstructor<T extends Record<string, any> = Record<string, any>> =
  EntityConstructor<T, Application<T>>;
