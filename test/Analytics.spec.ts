import { expect } from 'chai'
import jsdomGlobal = require('jsdom-global')
import { Analytics } from '..'

describe('Analytics', function() {

    this.beforeEach(() => {
        jsdomGlobal()
    })

    it('should create global ga object even if ga script is not loaded', () => {
        const a: Analytics = new Analytics('test')
        a.create()

        expect(window.ga).to.be.a('function')
    })

    it('should load the ga script in debug mode', () => {
        const a: Analytics = new Analytics('test', true)
        a.loadScript()

        const result: HTMLCollectionOf<HTMLScriptElement> = document.getElementsByTagName('script')

        expect(result.length).to.equal(1)
        expect(result[0].src).to.equal('https://www.google-analytics.com/analytics_debug.js')
    })

    it('should load the ga script in production mode by default', () => {
        const a: Analytics = new Analytics('test')
        a.loadScript()

        const result: HTMLCollectionOf<HTMLScriptElement> = document.getElementsByTagName('script')

        expect(result.length).to.equal(1)
        expect(result[0].src).to.equal('https://www.google-analytics.com/analytics.js')
    })

    it('should opt out', () => {

        const a: Analytics = new Analytics('test')
        a.optOut()
        a.create()

        expect(document.cookie.indexOf('ga-disable-test=true')).to.be.greaterThan(-1)
        expect(window['ga-disable-test']).to.be.true
    })

    it('should only load once', () => {

        const a: Analytics = new Analytics('test')
        a.loadScript()

        expect(a.isLoaded).to.be.true

        a.loadScript()

        const result: HTMLCollectionOf<HTMLScriptElement> = document.getElementsByTagName('script')

        expect(result.length).to.equal(1)
        expect(result[0].src).to.equal('https://www.google-analytics.com/analytics.js')
    })

})
