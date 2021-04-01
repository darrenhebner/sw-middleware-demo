import {VercelRequest, VercelResponse} from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  const email = req.body?.email ?? '';

  res.setHeader('content-type', 'text/html');
  res.send(`
    <html>
      <head>
        <title>SW Middleware</title>
      </head>
      <body>
        <form id="information">
          <input type="email" name="email" value="${email}" />
          <input type="submit" />
        </form>

        Server rendered with:
        <pre>
${JSON.stringify({email}, null, 2)}
        </pre>

        <script>
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
          }
        </script>

        <script type="module">
          import {set} from 'https://cdn.jsdelivr.net/npm/idb-keyval@5/dist/esm/index.js';

          document.forms.information.elements.email.addEventListener('input', (event) => {
            set('email', event.target.value)
          })
        </script>
      </body>
    </html>
  `);
}
