# REMIND - TypeScript Utility Library

[travis-img]: https://img.shields.io/travis/remindgmbh/typescript-google-analytics.svg?style=flat-square
[codecov-img]: https://img.shields.io/codecov/c/github/remindgmbh/typescript-google-analytics.svg?style=flat-square
[github-issues-img]: https://img.shields.io/github/issues/remindgmbh/typescript-google-analytics.svg?style=flat-square
[contrib-welcome-img]: https://img.shields.io/badge/contributions-welcome-blue.svg?style=flat-square
[license-img]: https://img.shields.io/github/license/remindgmbh/typescript-google-analytics.svg?style=flat-square

[![travis-img]](https://travis-ci.com/github/remindgmbh/typescript-google-analytics)
[![codecov-img]](https://codecov.io/gh/remindgmbh/typescript-google-analytics)
[![github-issues-img]](https://github.com/remindgmbh/typescript-google-analytics/issues)
[![contrib-welcome-img]](https://github.com/remindgmbh/typescript-google-analytics/blob/master/CONTRIBUTING.md)
[![license-img]](https://github.com/remindgmbh/typescript-google-analytics/blob/master/LICENSE)

Minimal implementation of Google Analytics.

```typescript
import { Analytics } from '@remindgmbh/typescript-google-analytics'

/** Create a new analytics instance with your tracker id */
const analytics: Analytics = new Analytics('UA-123456789-1')

/** Load and create analytics. This also checks for optout. */
analytics.loadScript()
analytics.create()

/** You can now use analytics to send a pageview */
window.ga('send', 'pageview')

/** Enable tracking of link clicks */
analytcs.assignClickEventHandler()
```

## Todos
* Add configuration options
