import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import useLocalStorage from "../hooks/useLocalStorage";
// import useSessionStorage from "../hooks/useSessionStorage";

// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const PrivacyPolicy = () => {
	// const [confirmation, setConfirmation] = useState(false);
	// const [session, setSession] = useState(null);
	// const { removeItem } = useLocalStorage();
	// const { clearSessionStorage } = useSessionStorage();

	// const handleConfirmation = () => {
	// 	setConfirmation(true);
	// };

	// const handleLogout = async () => {
	// 	const { error } = await supabase.auth.signOut();
	// 	if (error) console.error("Error: ", error.message);
	// };

	// const handleAccountDelete = () => {
	// 	console.log("Account deleted");
	// 	handleLogout();
	// 	removeItem("DCWAuth", "provider_token");
	// 	clearSessionStorage();
	// 	setConfirmation(false);
	// };

	// // Check if user is signed in
	// useEffect(() => {
	// 	const { data } = supabase.auth.onAuthStateChange((event, session) => {
	// 		if (session) setSession(session);
	// 	});

	// 	return () => {
	// 		data.subscription.unsubscribe();
	// 	};
	// }, []);

	return (
		<main className="text-white flex items-center justify-center p-10 gdpr">
			<section className="rounded-lg bg-darkBlack p-4 max-w-[720px] leading-snug font-outfit">
				<Link to={"/"} className="flex items-center gap-2 text-sm underline underline-offset-2">
					<FaArrowLeft className="w-3 h-3" /> Back to home
				</Link>
				<br />
				<h1>Cookie and Privacy Policy</h1>
				<br />
				<h2>Introduction</h2>
				<p>
					This website, wheel.wilzzu.dev, values your privacy. This policy explains our use of local
					storage and cookies, and how we use third party services to provide a functional and
					secure website experience.
				</p>
				<br />

				<h2>Local Storage</h2>
				<h3>What is local storage?</h3>
				<p>
					Local storage is a browser feature allowing websites to store small amounts of data on
					your device. It is used to save user preferences and settings.
				</p>
				<h3>How we use local storage</h3>
				<p>
					We only use local storage to save your user preferences and other strictly necessary
					details for the website to function correctly, such as:
				</p>
				<ul>
					<li>
						<b>Wheel settings</b>
					</li>
					<li>
						<b>Selected players list</b>
					</li>
				</ul>
				<p>
					If you are logged in, your Discord token will be saved to local storage to make future
					requests, such as checking what guilds you are part of. This token is never sent to our
					servers and will only exist on your machine until you log off.
				</p>
				<h3>How to manage local storage</h3>
				<p>
					You can adjust your browser settings to manage or delete local storage data. Note that
					disabling it may prevent preference saving on our website.
				</p>
				<br />

				<h2>Cookies</h2>
				<h3>What are cookies?</h3>
				<p>
					Cookies are small files that are stored on your device when you visit a website. They are
					used to remember your preferences and provide a personalized experience.
				</p>
				<h3>How we use cookies</h3>
				<p>
					We use cookies to provide secure login functionality and website protection. We use
					trusted external providers to handle these services.
				</p>

				<h3>How to manage cookies</h3>
				<p>
					You can adjust your browser settings to manage or delete cookies. Note that disabling them
					may prevent some website functionality.
				</p>
				<br />

				<h2>Third Party Services</h2>
				<p>We use essential third-party services to provide necessary website functionality:</p>

				<h3>Supabase</h3>
				<p>
					We use Supabase for secure login functionality and user data storage. Supabase may use
					cookies to manage secure login sessions. For details, please refer to{" "}
					<a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">
						their privacy policy
					</a>
					.
				</p>

				<h3>Cloudflare</h3>
				<p>
					We use Cloudflare for website protection and performance optimization. Cloudflare may use
					cookies to manage website protection and performance. For details, please refer to{" "}
					<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">
						their privacy policy
					</a>{" "}
					and{" "}
					<a
						href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/"
						target="_blank"
						rel="noreferrer">
						cookie policy
					</a>
					.
				</p>

				<br />

				<h2>Data we collect</h2>
				<h3>Through Local Storage:</h3>
				<p>
					Non-identifying data associated with your user preferences, as outlined in the{" "}
					{'"Local Storage"'} section.
				</p>
				<h3>Through Supabase:</h3>
				<p>
					Data associated with your user account, as outlined in{" "}
					<a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">
						{"Supabase's"} privacy policy
					</a>
					.
				</p>
				<h3>Through Cloudflare:</h3>
				<p>
					Non-identifying data associated with website protection and performance, as outlined in{" "}
					<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">
						{"Cloudflare's"} privacy policy
					</a>
					.
				</p>
				<br />

				<h2>Data Security</h2>
				<p>
					We take data security seriously and have implemented measures to protect your data. We use
					secure and trusted third-party services to handle user data and website protection.
				</p>
				<br />

				<h2>Your Rights under GDPR</h2>
				<p>
					You have the right to access, update, or delete your personal data. If you wish to
					exercise these rights, you can:
				</p>
				<ul>
					<li>
						<b>
							Submit a request through our{" "}
							<a href="https://forms.gle/ipVAryvFoPNFMYAd8" target="_blank" rel="noreferrer">
								GDPR Data Request Form
							</a>
							.
						</b>
					</li>
					<li>
						<b>Contact us at:</b> <a href="mailto:wilzzudev@gmail.com">wilzzudev@gmail.com</a>
					</li>
					{/* {session && (
						<li>
							<b>Delete your account:</b> To delete your account and associated data, click the{" "}
							{'"Delete my account"'} button below.
						</li>
					)} */}
				</ul>
				{/* {session && (
					<button
						onClick={handleConfirmation}
						className="border-2 border-red-500 rounded-lg p-2 hover:bg-red-500 group duration-150">
						<p className="group-hover:drop-shadow-text !font-normal text-sm">Delete my account</p>
					</button>
				)} */}
				{/* <br /> */}
				<br />
				<h2>Changes to this policy</h2>
				<p>
					We may update this policy to reflect changes in our practices or for other operational,
					legal, or regulatory reasons.
				</p>
				<br />
				<h2>Contact us</h2>
				<p>
					If you have any questions or concerns about our privacy policy, please contact us at{" "}
					<a href="mailto:wilzzudev@gmail.com">wilzzudev@gmail.com</a>.
				</p>
				<br />
				<Link
					to={"/"}
					className="flex items-center gap-2 my-2 text-sm underline underline-offset-2">
					<FaArrowLeft className="w-3 h-3" /> Back to home
				</Link>
			</section>
			{/* Account deletion confirm */}
			{/* {confirmation && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
					<div className="flex flex-col gap-2 bg-darkBlack p-4 rounded-lg">
						<h1>Are you sure?</h1>
						<p>
							This action will permanently delete your account and all associated data. This action
							cannot be undone.
						</p>
						<div className="flex gap-2">
							<button
								onClick={handleAccountDelete}
								className="bg-red-600 rounded-md p-3 hover:bg-red-500 group duration-150">
								<p className="group-hover:drop-shadow-text !font-normal text-sm">
									Delete my account
								</p>
							</button>
							<button
								onClick={() => setConfirmation(false)}
								className="bg-highlightBlack rounded-md py-3 px-5 hover:bg-normalBlack group duration-150">
								<p className="group-hover:drop-shadow-text !font-normal text-sm">Cancel</p>
							</button>
						</div>
					</div>
				</div>
			)} */}
		</main>
	);
};

export default PrivacyPolicy;
