import React from 'react';

export function App() {
  return (
    <div>
      <section>
        <h1>Rxnode — reactive nodejs API</h1>
        <img
          alt=""
          className="w-full"
          width="700"
          height="350"
          role="presentation"
          src="https://miro.medium.com/max/1400/1*G-Ivj_albzdM4p9-0w98vQ.png"
          srcSet="
        https://miro.medium.com/max/552/1*G-Ivj_albzdM4p9-0w98vQ.png  276w,
        https://miro.medium.com/max/1104/1*G-Ivj_albzdM4p9-0w98vQ.png 552w,
        https://miro.medium.com/max/1280/1*G-Ivj_albzdM4p9-0w98vQ.png 640w,
        https://miro.medium.com/max/1400/1*G-Ivj_albzdM4p9-0w98vQ.png 700w
      "
          sizes="700px"
        />

        <p>
          At the beginning of 2020, my career as a frontend developer turned in
          an unexpected direction for me. I haven&#39;t written a single Angular
          component in a year. I Replaced Angular with server code and code for
          the CLI. It was a new and interesting experience for me, but it
          wasn&#39;t easy to solve my usual tasks without RxJS.
        </p>

        <p>
          Let&#39;s look at a simple example of reading and writing a file using
          the native features of nodejs
        </p>

        <p>
          Code with callbacks after Angular seems complicated. First, I
          translated callbacks to promises.
        </p>

        <p>
          I was OK with this solution until I needed to implement several
          tasks&#39; competitive execution with a limit. RxJS has such an
          opportunity out of the box. Why would I invent my own algorithm on
          promises?
        </p>

        <p>
          The <code>promisify</code> function is replaced by the{' '}
          <code>bindNodeCallback</code> function, which RxJS itself supplies.
        </p>

        <p>
          It quickly became apparent that you need to import and wrap the API in
          each file or move it to the library at the project level. And when
          there was more than one such project, I decided to put my developments
          in separate packages with the <code>@rxnode</code> scopes and
          published{' '}
          <a href="https://github.com/IKatsuba/rxnode">the GitHub code</a>.
        </p>

        <p>
          The project is NX Workspace. Each core package from nodejs corresponds
          to one library in a scope. If you want to use the <code>fs</code>{' '}
          package, you import functions with the same names from the
          <code>@rxnode/fs</code> packages.
        </p>

        <p>This is how you can start a simple server.</p>

        <p>
          Currently, Rxnode contains only 4 packages out of 20 planned. An
          up-to-date list can be found in the{' '}
          <a href="https://rxnode.gitbook.io/docs/">documentation</a>. We will
          be glad to receive any help in project development! We need your ideas
          and your hands!
        </p>

        <h2>About logo</h2>

        <p>
          The Rxnode logo features an{' '}
          <a href="https://en.wikipedia.org/wiki/Axolotl">axolotl</a>. And this
          is the merit of my wife, for which many thanks to her!
        </p>

        <p>
          While working on the library, she looked at the RxJS logo and asked
          me, &quot;Is this an axolotl?&quot; When I replied negatively, she
          suggested depicting the axolotl on the Rxnode logo in Node.js shades.
          So I did!
        </p>
      </section>
    </div>
  );
}

export default App;
