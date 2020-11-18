declare global {
  interface Window {
    // @ts-ignore
    ga: UniversalAnalytics.ga;
    [index: string]: any;
  }
}

import { getFirstParentId } from '@remindgmbh/typescript-utility-lib'

/**
 * This class provides methods to load and configure google analytics.
 */
export class Analytics {

  /**
   * The prefix required to disable a tracker id via cookie.
   */
  protected readonly disablePrefix: string = 'ga-disable-'

  /**
   * An analytics tracker id.
   */
  protected trackerId: string = 'UA-00000000-1'

  /**
   * Load the analytics debug script.
   */
  protected isDebug: boolean = false

  /**
   * Automatically created during class instanciation.
   * The string is used as an identifier for analytics to disable tracking.
   */
  protected disableString: string = ''

  /**
   * Creates a new instance.
   *
   * @param trackerId A tracker id
   * @param isDebug Load the debug script
   */
  constructor(trackerId: string, isDebug: boolean = false) {
    this.trackerId = trackerId
    this.isDebug = isDebug
    this.disableString = this.disablePrefix + trackerId

    /* Use real analytics if loaded or substitute with a minimal placeholder */
    window.ga = window.ga || function(): void {
      (window.ga.q = window.ga.q || []).push(arguments)
    }

    /* Google demands this */
    window.ga.l = new Date().getTime()
  }

  /**
   * Creates and appends the google analytics.js script tag to the document body.
   */
  public loadScript(): void {

    /* Create a script tag */
    const googleScript: HTMLScriptElement = document.createElement('script') as HTMLScriptElement

    /* Set the async attribute */
    googleScript.async = true

    /* Either include analytics.js oder analytics_debug.js */
    googleScript.src = 'https://www.google-analytics.com/analytics' + (this.isDebug ? '_debug' : '') + '.js'

    /* Append script to body */
    document.body.appendChild(googleScript)
  }

  /**
   * Runs ga() functions to create and configure the tracker.
   */
  public create(): void {

    this.checkForOptOut()

    /* Create the tracker */
    window.ga('create', this.trackerId, 'auto')

    /* Require IP anonymization */
    window.ga('set', 'anonymizeIp', true)

    /* Set beacon transport mode */
    window.ga('set', 'transport', 'beacon')

    /* Load linkid module */
    window.ga('require', 'linkid')
  }

  /**
   * Check if the tracker id has the optout cookie set and disable tracking.
   */
  protected checkForOptOut(): void {

    /* Check if cookie is set for tracker id */
    if (document.cookie.indexOf(this.disableString + '=true') > -1) {

      /* Disable tracking */
      window[this.disableString] = true
    }
  }

  /**
   * This method sets the cookie and window property to disable tracking.
   */
  public optOut(): void {

    /* Set the optout cookie */
    document.cookie = this.disableString + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'

    /* Disable tracking */
    window[this.disableString] = true
  }

  /**
   *
   * @param event
   */
  public static anchorClickEventHandler(event: Event): void {

    const target: HTMLAnchorElement = event.target as HTMLAnchorElement

    /* Try to avoid handling multiple clicks */
    if (target.dataset.anaylticsClick) {
      return
    }

    /* Assign any value to mark as clicked */
    target.dataset.anaylticsClick = '1'

    const parent: HTMLElement = target.parentNode as HTMLElement

    /* Send the actual click event */
    window.ga('send', 'event', {
      eventCategory: document.location.pathname,
      eventAction: getFirstParentId(parent),
      eventLabel: target.getAttribute('href')
    });
  }

  /**
   *
   */
  public assignClickEventHandler(): void {

    /* Get all anchor elements */
    const targets = document.getElementsByTagName('a')

    /* Iterate the elements */
    for (let n = 0; n < targets.length; n++) {

      /* Make sure the target is an actual element; strange things happen here */
      if (targets[n].tagName) {

        /* Attach the onclick event listener to the elements */
        targets[n].addEventListener('click', Analytics.anchorClickEventHandler)
      }
    }
  }
}
