# Secure Coding - Bad Example backend

### Build

To build on unix based systems:

```bash
npm install
```

### Run

First run proxy

```bash
npm run proxy
```

Then start both bad and good example apps

```bash
npx nx serve bad-example
npx nx serve good-example
```

Open Proxy URL in browser

```
http://owasp-guidelines-bad.m8c.io
http://owasp-guidelines-good.m8c.io
```