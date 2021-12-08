describe('React application home page', () => {
    it("Verify that the app link says Learn React", () => {
        browser.url('/')
        let text = $(".App-link").getText()
        assert.equal(text, 'Learn React')
    })
})