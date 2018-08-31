/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(() => {
	/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */


	describe('RSS Feeds', () => {
		/* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
		it('are defined', () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// Confirms that each feed has a defined URL and not an empty URL
		it('defined URL', () => {
			for (feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
		});

		// Confirms each feed is defined and is not empty
		it('defined name', () => {
			for (feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});
	});

	describe('The menu', () => {
		const menuIcon = document.querySelector('.menu-icon-link');
		const	body = document.querySelector('body');

		// Confirms that when the page is loaded that the menu is hidden
		it('hidden', () => {
			expect(body.classList.contains('menu-hidden')).toBe(true);
		});

		// Confirms that the menu hidden status toggles when clicking on the menuIcon
		it('toggle visibility', () => {
			menuIcon.click();
			expect(body.classList.contains('menu-hidden')).toBe(false);
			menuIcon.click();
			expect(body.classList.contains('menu-hidden')).toBe(true);
		});
	});

	describe('Initial Entries', () => {
		// Confirm that the loadFeed function loads at least one .entry element into the .feed container

		// Loop through each feed
		beforeEach((done) => {
			loadFeed(0, done);
		});

		it('an entry loaded', () => {
			const entries = $('.feed .entry');
			expect(entries.length).not.toBe(0);
		});
	});

	describe('New Feed Selection', () => {
		const container = document.querySelector('.feed');
		const feedZero = [];
		const feedOne = [];

		// Loop through the first feed loaded and save each entry into an array, for comparison
		beforeEach((done) => {
			loadFeed(0);
			Array.from(container.children).forEach((entry) => {
				feedZero.push(entry.textContent);
			});
			// Load a second feed for comparison
			loadFeed(1, done);
		});
		// Compares the content from the first feed, saved in the array, to the second feed loaded and makes sure it is different
		it('content changes', () => {
			Array.from(container.children).forEach((entry) => {
				feedOne.push(entry.textContent);
				expect(feedZero === feedOne).toBe(false);
			});
		});
	});
});
