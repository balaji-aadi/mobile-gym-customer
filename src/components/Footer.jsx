import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#2d2d2d] text-[#bfc3c6] pt-10 md:pt-16 pb-6 md:pb-8 px-4 sm:px-6 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12 border-b border-[#444] pb-8 md:pb-12">
                <div className="flex flex-col gap-6 md:gap-8 min-w-0 md:min-w-[250px]">
                    <div>
                        <span className="text-4xl font-bold text-white">OutBox</span>
                    </div>
                    <div>
                        <span className="text-sm font-semibold text-white tracking-widest">FOLLOW US</span>
                        <div className="flex gap-6 mt-4">
                            {/* Facebook */}
                            <a href="#" aria-label="Facebook">
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#bfc3c6] hover:text-white"><path d="M17 2.1A2.1 2.1 0 0 1 19.1 4.2v15.6a2.1 2.1 0 0 1-2.1 2.1H6.9A2.1 2.1 0 0 1 4.8 19.8V4.2A2.1 2.1 0 0 1 6.9 2.1h10.2zM12 7.5v3.6H10.5v2.1H12v6h2.1v-6h1.5l.3-2.1h-1.8V8.4c0-.3.1-.6.6-.6h1.2V6.3h-1.5c-1.5 0-2.1.6-2.1 2.1z" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" aria-label="Instagram">
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#bfc3c6] hover:text-white"><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle cx="17.2" cy="6.8" r="1" /></svg>
                            </a>
                            {/* X (Twitter) */}
                            <a href="#" aria-label="X">
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#bfc3c6] hover:text-white"><path d="M17.53 6.47L6.47 17.53M6.47 6.47l11.06 11.06" strokeWidth="2" strokeLinecap="round" /></svg>
                            </a>
                            {/* Pinterest */}
                            <a href="#" aria-label="Pinterest">
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#bfc3c6] hover:text-white"><circle cx="12" cy="12" r="10" /><path d="M12 16v-3.2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-8 md:gap-12 justify-between min-w-0 md:min-w-[600px]">
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-widest">OutBox</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">About OutBox</a></li>
                            <li><a href="#" className="hover:text-white">Press</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Participate in Research</a></li>
                            <li><a href="#" className="hover:text-white">Security</a></li>
                            <li><a href="#" className="hover:text-white">OutBox Integrations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-widest">BUSINESS OWNERS</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Product Overview</a></li>
                            <li><a href="#" className="hover:text-white">List your business</a></li>
                            <li><a href="#" className="hover:text-white">Education</a></li>
                            <li><a href="#" className="hover:text-white">Demo</a></li>
                            <li><a href="#" className="hover:text-white">Support</a></li>
                            <li><a href="#" className="hover:text-white">Staff Login</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-widest">EXPLORE</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Find a Class</a></li>
                            <li><a href="#" className="hover:text-white">Find a Studio</a></li>
                        </ul>
                    </div>
                </div>
                {/* Right: App & Support */}
                <div className="flex flex-col gap-6 md:gap-8 min-w-0 md:min-w-[220px]">
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-widest">OutBox APP</h4>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="inline-block">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="h-12" />
                            </a>
                            <a href="#" className="inline-block">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 tracking-widest">SUPPORT</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Help</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center mt-6 md:mt-8 text-xs text-[#bfc3c6] gap-2 md:gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap text-center md:text-left">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="privacy" className="h-4 w-4" />
                    <span>Your Privacy Choices</span>
                    <span className="hidden sm:inline mx-1">|</span>
                    <a href="#" className="hover:text-white">Legal</a>
                    <span className="hidden sm:inline mx-1">|</span>
                    <a href="#" className="hover:text-white">Privacy Policy &amp; Your Privacy Rights</a>
                    <span className="hidden sm:inline mx-1">|</span>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <span className="hidden sm:inline mx-1">|</span>
                    <a href="#" className="hover:text-white">Copyright Policy &amp; Claims</a>
                </div>
                <div className="text-center md:text-right mt-2 md:mt-0">
                    <span>Copyright ©2001-2025 OutBox | OutBox Processing is a registered ISO/MSP of Wells Fargo Bank, N.A., Walnut Creek, CA</span>
                </div>
            </div>
            <div className="max-w-7xl mx-auto text-center text-xs text-[#bfc3c6] mt-2">
                <span>*Images marked with an asterisk are used for display purposes only.</span>
            </div>
        </footer>
    );
};

export default Footer;
