module.exports = {
	name: 'ArtGallery',
	version: '1.0.0',
	extra: {
		clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
		apiKey: process.env.API_KEY,
		authDomain: process.env.AUTH_DOMAIN,
		projectId: process.env.PROJECT_ID,
		storageBucket: process.env.STORAGE_BUCKET,
		messagingSenderId: process.env.MESSAGING_SENDER_ID,
		appId: process.env.APP_ID,
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        stripeApiUrl: process.env.STRIPE_API_URL,
	},
};
