import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return(
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className="block text-red-400">
                            <Link to='/'>
                            <span className="sr-only">Home</span>
                            <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8.423-3a.923.923 0 00-.923.923v.385a1 1 0 11-2 0v-.385A2.923 2.923 0 019.423 5H10c1.941 0 3.5 1.591 3.5 3.516 0 .927-.48 1.8-1.276 2.29l-1.7 1.046a1 1 0 01-1.048-1.704l1.7-1.046a.691.691 0 00.324-.586C11.5 7.679 10.82 7 10 7h-.577zm.587 8a1 1 0 100-2H10a1 1 0 100 2h.01z"
                                    fill="currentColor"
                                    />
                            </svg>
                            </Link>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            {/* <a
                                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                            >
                                Login
                            </a> */}

                            <div className="hidden sm:flex">
                                <a
                                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-semibold text-red-400
                                            hover:text-white hover:bg-red-400 hover:shadow-md"
                                >
                                <Link to="/leaderboard">
                                    Leaderboard
                                </Link>
                                </a>
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header