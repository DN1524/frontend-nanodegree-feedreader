$(function() {
    // Checks attributes of the feeds
    describe('RSS Feeds', function() {

        it('Are Defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('Have URLs', function() {
            allFeeds.forEach(function(feeds) {
                expect(feeds.url).toBeDefined();
                expect(feeds.url.length).not.toBe(0);
            });
        });

        it('Have names', function() {
            allFeeds.forEach(function(feeds) {
                expect(feeds.name).toBeDefined();
                expect(feeds.name.length).not.toBe(0);
            });
        });
    });
    // Checking the hamburger menu functionality
    describe('The menu', function() {
        const body = $('body');
        const menuIcon = $('.menu-icon-link');

        it('Is hidden on page load', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it('Opens and closes when clicked', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        // Loads the first feed before the test is run
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('Feed has at least one entry element', function() {
            //makes sure that there is at least 1 entry
            expect($('.feed .entry').length).not.toBe(0)
        });
            
    });

    describe('New Feed Selection', function() { 
        let feedText0;
        let feedText1;
        // Loads both the 1st and 2nd feeds before the test runs
        beforeEach(function(done) {
            loadFeed(1, function () {
                // Saves the text content of the 2nd feed
                feedText1 = $('.feed').text();

                loadFeed(0, function() {
                    // Saves the text content of the 1st feed
                    feedText0 = $('.feed').text();
                    done();
                });
            });
        });

        it('Feed changes when new feed is selected', function() {
            // Grabs both the text from the 1st and 2nd feeds and
            // compares them to see if they are different. If they are
            // different, that means that the feed changed and the test
            // is successful!
            expect(feedText0).not.toBe(feedText1);
        });
    });
}());
