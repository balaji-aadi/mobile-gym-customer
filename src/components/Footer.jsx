const Footer = () => {
  return (
    <footer className="bg-[#2d2d2d] text-[#bfc3c6] pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl flex-wrap mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 lg:gap-12 border-b border-[#444] pb-8 md:pb-10 lg:pb-12">
        {/* Left: Logo & Social */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full md:w-auto md:min-w-[200px] lg:min-w-[250px]">
          <div>
            <span className="text-3xl sm:text-4xl font-bold text-white">OutBox</span>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-semibold text-white tracking-widest">
              FOLLOW US
            </span>
            <div className="flex gap-4 sm:gap-5 md:gap-6 mt-3 sm:mt-4">
              {/* Social icons */}
              {['Facebook', 'Instagram', 'X', 'Pinterest'].map((platform) => (
                <a key={platform} href="#" aria-label={platform}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-[#bfc3c6] hover:text-white transition-colors duration-200"
                  >
                    {platform === 'Facebook' && (
                      <path d="M17 2.1A2.1 2.1 0 0 1 19.1 4.2v15.6a2.1 2.1 0 0 1-2.1 2.1H6.9A2.1 2.1 0 0 1 4.8 19.8V4.2A2.1 2.1 0 0 1 6.9 2.1h10.2zM12 7.5v3.6H10.5v2.1H12v6h2.1v-6h1.5l.3-2.1h-1.8V8.4c0-.3.1-.6.6-.6h1.2V6.3h-1.5c-1.5 0-2.1.6-2.1 2.1z" />
                    )}
                    {platform === 'Instagram' && (
                      <>
                        <rect x="4" y="4" width="16" height="16" rx="4" />
                        <circle cx="12" cy="12" r="3.2" />
                        <circle cx="17.2" cy="6.8" r="1" />
                      </>
                    )}
                    {platform === 'X' && (
                      <path
                        d="M17.53 6.47L6.47 17.53M6.47 6.47l11.06 11.06"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    )}
                    {platform === 'Pinterest' && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-3.2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2" />
                      </>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-10 flex-1 w-full md:w-auto md:min-w-[500px] lg:min-w-[600px]">
          {['OutBox', 'BUSINESS OWNERS', 'EXPLORE'].map((section) => (
            <div key={section}>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-widest">
                {section}
              </h4>
              <ul className="space-y-2 text-sm sm:text-base">
                {section === 'OutBox' && (
                  <li><a href="#" className="hover:text-white transition-colors duration-200">About OutBox</a></li>
                )}
                {section === 'BUSINESS OWNERS' && (
                  <>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Support</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Staff Login</a></li>
                  </>
                )}
                {section === 'EXPLORE' && (
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Find a Class</a></li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Right: App & Support */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full md:w-auto md:min-w-[180px] lg:min-w-[220px]">
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-widest">
              OutBox APP
            </h4>
            <div className="flex flex-col gap-2 sm:gap-3">
              <a href="#" className="inline-block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                  alt="App Store"
                  className="h-10 sm:h-12 w-auto"
                />
              </a>
              <a href="#" className="inline-block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10 sm:h-12 w-auto"
                />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-widest">
              SUPPORT
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center mt-4 sm:mt-5 md:mt-6 lg:mt-8 text-xs text-[#bfc3c6] gap-2 sm:gap-3 md:gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-wrap justify-center md:justify-start text-center md:text-left">
          <div className="flex items-center gap-1 sm:gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="privacy"
              className="h-3 sm:h-4 w-3 sm:w-4"
            />
            <span>Your Privacy Choices</span>
          </div>
          <span className="hidden sm:inline mx-1">|</span>
          <a href="#" className="hover:text-white transition-colors duration-200">Legal</a>
          <span className="hidden sm:inline mx-1">|</span>
          <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy &amp; Your Privacy Rights</a>
          <span className="hidden sm:inline mx-1">|</span>
          <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          <span className="hidden sm:inline mx-1">|</span>
          <a href="#" className="hover:text-white transition-colors duration-200">Copyright Policy &amp; Claims</a>
        </div>
        <div className="text-center md:text-right mt-2 sm:mt-3 md:mt-0 text-xs sm:text-sm">
          <span>
            © 2025 OutBox. All rights reserved. | Serving Happy Customers Worldwide
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center text-xs text-[#bfc3c6] mt-2 sm:mt-3">
        <span>
          *Images marked with an asterisk are used for display purposes only.
        </span>
      </div>
    </footer>
  );
};

export default Footer;