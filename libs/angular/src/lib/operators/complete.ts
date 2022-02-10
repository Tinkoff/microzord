import {NEVER} from 'rxjs';
import {finalize, startWith, switchMap} from 'rxjs/operators';

export const complete = <T>(fn: (value: T) => void) =>
  switchMap((value: T) =>
    NEVER.pipe(
      startWith(value),
      finalize(() => {
        fn(value);
      }),
    ),
  );
