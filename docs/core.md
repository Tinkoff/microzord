# @tinkoff-shiva/core

@shiva/core - ядро микрофронтового фреймворка. Умеет скачивать, регистрировать и управлять жизненным циклом
микро-приложений. Является вреймворк-агностиком.

Так как изначально Shiva будет направлена на Angular-приложения для удобства будет использован RxJS.

## Регистрация приложений

Регистрируя приложение ядро сохраняет его имя, инструкции по загрузке и данные для передачи в приложение при его
бутстрапе.

```typescript
declare function registerApp(options: {
  name: string;
  props: JsonObject;
  loadApp: (
    props: JsonObject,
  ) =>
    | Observable<ApplicationConstructor>
    | Promise<ApplicationConstructor>
    | ApplicationConstructor;
});
```

Пример регистрации:

```typescript
registerApp({
  name: 'app1',
  props: {key: 'value'},
  loadApp: () => import('/some/app'),
});
```

Функция `loadApp` возвращает `ApplicationConstructor` синхронно или асинхронно. Функция может быть имплементирвоанна
совершенно разными способами. Это может быть и загрузка по некой конфигурации, по index.html, загрузка одиночного
скрипта.

Можно допустить существование пакета `@shiva/loaders`, который содержит фабрики для функции-загрузчика.

```typescript
import {registerApp} from '@shiva/core';
import {fromResourceMapLoaderFactory, loadScriptFactory} from '@shiva/loaders';

registerApp({
  name: 'app1',
  // скачает конфигурацию с указанного урла
  loadApp: fromResourceMapLoaderFactory('/app/assets/resource-map.json'),
});

// or

registerApp({
  name: 'app1',
  // передаем конфигурацию сразу
  loadApp: fromResourceMapLoaderFactory({
    scripts: [['config.js'], ['pollyfill.js', 'main.js']],
  }),
});

// or

registerApp({
  name: 'app1',
  // передаем конфигурацию сразу
  loadApp: loadScriptFactory('main.js'),
});
```

## ApplicationConstructor и Application

`ApplicationConstructor` — это конструктор, то есть функция `loadApp` загружает именно класс, а не его инстанс. Сам
инстанс имеет тип `Application`.

`Application` конечно методы для запуска, дестроя, отправки и получения сообщений, отслеживания жизненнего цикла,
сообщений роутинга.

```typescript
abstract class Application {
  name: string; // имя для поиска по имени
  hook$: Observable<LifecycleEvent>; // lifecycle hooks
  message$: Observable<Message>; // события, отправленные из приложения
  navigationEvent$: Observable<NavigationEvent>; // события навигации

  abstract bootstrap(container: Selector | Element, props: JsonObject); // запуск приложения
  abstract send(msg: string | Message): Observable<void>; // отправка сообщений с реакцией на доставку
  abstract navigate(url: string, props: {}): Observable<void>; // Завершение на разрешение промиса из Angular Router
  abstract destroy(); // уничтожение приложения
}
```

Инстанс `Application` одноразовый. Это значит, что разрушив приложение его уже не запустишь. Нужно создавать новый
инстанс.

В инстансе можно добавит различные проперти состояния вроде `isBootstraped`

## Загрузка приложения

Для загрузки приложения используется функция `loadApp`.

```typescript
import {loadApp} from '@shiva/core';

loadApp('app1').subscribe(app => {
  app.boostrap();
});
```

Под капотом функция будет вызывать `loadApp` из регистрационных данных и обрабатывать ответ. По дефолту уже загруженное
приложение не загружается заново. Но можно предусмотреть принудительную повторную загрузку.

После загрузки класса `loadApp` эмитит созданный инстанс.

## Бутстрап приложения

Что бы не выполнять промежуточных действий после загрузки имплементируем функцию `bootstrapApp`

```typescript
import {bootstrapApp} from '@shiva/core';

bootstrapApp('app', '#container', {key: 'value'}).subscribe(app => {
  app; // инстанс приложения
});
```

## Список созданных приложений

Список созданных приложений можно получить с помощью функции `getActiveApps`. Возвращает массив активных приложений.

## Утилитарные функции

Можно придумать и сделать много утилитарных хэлперов. Например:

- Функция замены приложения

```typescript
declare function replaceApps(from: string, to: string): Observable<Application>;
```

- Отправка сообщения

```typescript
declare function sendToApp(appName: string, msg: Message): Observable<void>;
```

- Разрушение приложения

```typescript
declare function destroyApp(appName: string): Observable<void>;
```
