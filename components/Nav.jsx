'use client';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

import Link from 'next/link';
import Image from 'next/image';

function Nav() {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropDown, setToggleDropDown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};
		setUpProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-container">
				<Image
					src="/assets/images/logo.svg"
					alt="Promptopia logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">ProDev</p>
			</Link>

			{/* Desktop Nav */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button onClick={signOut} className="outline_btn">
							Sign Out
						</button>
						<Link href="/profile" className="">
							<Image
								src={session.user.image}
								alt="profile"
								width={37}
								height={37}
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Nav */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						{/* <button type='button' className='outline_btn'>Sign Out</button> */}
						<Image
							src={session.user.image}
							alt="profile"
							width={37}
							height={37}
							className="rounded-full"
							onClick={() => setToggleDropDown((prev) => !prev)}
						/>
						{toggleDropDown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropDown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropDown(false)}
								>
									Ceate Prompt
								</Link>
								<button
									className="mt-5 w-full black_btn"
									onClick={() => {
										setToggleDropDown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
