import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Activity, Barcode, ChartNoAxesCombined, ClipboardList, Home, Menu, X, BedDouble, Bath, MoveLeft, MoveRight, Star, Send, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Footer from '../components/Footer';



const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <div className={`border-b border-color py-4 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
      <button
        className="flex w-full justify-between items-center text-left hover:bg-surface-secondary rounded-lg px-4 py-2 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 text-secondary" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-secondary" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 px-4 text-secondary" aria-hidden={!isOpen}>
          {answer}
        </div>
      )}
    </div>
  )
}

const FAQ = () => {
  const { theme } = useTheme()
  const faqData = [
    {
      question: "What services does HouseFusion offer?",
      answer: "HouseFusion offers a wide range of real estate services including property listings, home valuations, mortgage assistance, and expert advice on buying and selling properties.",
    },
    {
      question: "How do I schedule a property viewing?",
      answer: "You can schedule a property viewing by contacting our team through the website, calling our office, or using the 'Schedule Viewing' button on any property listing page.",
    },
    {
      question: "What areas does HouseFusion serve?",
      answer: "HouseFusion primarily serves the greater metropolitan area and surrounding suburbs. Please check our 'Service Areas' page for a detailed list of locations.",
    },
    {
      question: "How long does the typical home buying process take?",
      answer: "The home buying process can vary, but typically takes 30-60 days from offer acceptance to closing. Our team works diligently to ensure a smooth and efficient process for all our clients.",
    },
    {
      question: "What documents do I need to sell my house?",
      answer: "To sell your house, you'll typically need proof of ownership, tax records, mortgage information, and any relevant home improvement documentation. Our agents will guide you through the specific requirements for your situation.",
    },
  ]

  return (
    <div className="border-t border-color">
      <div className={`bg-background p-4 sm:p-8 md:p-12 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
          <h2 className=" w-full flex items-center justify-center text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Frequently Asked Questions</h2>
        </header>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(true);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef({
    home: useRef(null),
    properties: useRef(null),
    testimonials: useRef(null),
    faq: useRef(null)
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          // Update URL hash without scrolling
          window.history.replaceState(null, null, `#${sectionId}`);
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionsRef.current).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Update navigation links
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = sectionsRef.current[sectionId].current;
    const offset = 80; // Adjust this value to match your header height
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
    setIsMenuOpen(false)
  };

  // Helper function to check active link
  const isActive = (path, hash = '') => {
    return location.pathname === path && location.hash === hash;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-background' : 'bg-surface'}`}>
      {/* Announcement Bar */}
      {isAnnouncementOpen && (
        <div className="bg-primary/10 px-8 lg:px-16 py-2.5 text-center relative">
          <button
            onClick={() => setIsAnnouncementOpen(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/20 rounded-full transition-colors"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4 text-primary"/>
          </button>
          <p className="text-xs md:text-sm font-medium text-primary pr-8">
            🎉 Discover Your Dream Property with HouseFusion.io{" "}


            <Link to="/features" className="inline-flex items-center font-semibold hover:text-primary-dark underline transition-colors">
              Learn More
            </Link>
          </p>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-20">
        <div className="mx-auto px-8 py-4 border-b border-color">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">

              <img 
                src={logo} 
                alt="HouseFusion Logo" 
                className={`h-8 w-auto filter ${theme === 'dark' ? 'invert-0' : 'invert-100'}`}
              />
              <span className="text-xl font-semibold text-primary">HouseFusion.io</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center text-primary gap-8">
              <button
                onClick={() => handleNavClick('home')}
                className={`hover:text-primary transition-colors ${activeSection === 'home' ? 'font-bold underline' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('properties')}
                className={`hover:text-primary transition-colors ${activeSection === 'properties' ? 'font-bold underline' : ''}`}
              >
                Properties
              </button>
              <button
                onClick={() => handleNavClick('testimonials')}
                className={`hover:text-primary transition-colors ${activeSection === 'testimonials' ? 'font-bold underline' : ''}`}
              >
                Testimonials
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className={`hover:text-primary transition-colors ${activeSection === 'faq' ? 'font-bold underline' : ''}`}
              >
                FAQs
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <ThemeSwitcher />
              <Link 
                to={isSignedIn ? "/dashboard" : "/sign-in"}
                className="px-4 py-2 rounded-lg border border-color hover:bg-surface-secondary transition-colors text-primary"
              >
                {isSignedIn ? "Dashboard" : "Sign In"}
              </Link>
            </div>


            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-surface-secondary text-primary rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed top-18 left-0 right-0 bg-background border-b border-color text-primary">
              <nav className="flex flex-col p-4 gap-4">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`px-4 py-2 hover:bg-surface-secondary rounded-lg transition-colors ${activeSection === 'home' ? 'font-bold underline' : ''}`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('properties')}
                  className={`px-4 py-2 hover:bg-surface-secondary rounded-lg transition-colors ${activeSection === 'properties' ? 'font-bold underline' : ''}`}
                >
                  Properties
                </button>
                <button
                  onClick={() => handleNavClick('testimonials')}
                  className={`px-4 py-2 hover:bg-surface-secondary rounded-lg transition-colors ${activeSection === 'testimonials' ? 'font-bold underline' : ''}`}
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleNavClick('faq')}
                  className={`px-4 py-2 hover:bg-surface-secondary rounded-lg transition-colors ${activeSection === 'faq' ? 'font-bold underline' : ''}`}
                >
                  FAQs
                </button>
                <div className="flex items-center justify-between px-4 py-2">
                  <ThemeSwitcher />
                  <Link 
                    to={isSignedIn ? "/dashboard" : "/sign-in"}
                    className="px-4 py-2 rounded-lg border border-color hover:bg-surface-secondary transition-colors text-primary"
                  >
                    {isSignedIn ? "Dashboard" : "Sign In"}
                  </Link>
                </div>
              </nav>

            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main ref={sectionsRef.current.home} id="home" className=" mx-auto px-8 md:px-16 py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20">
          <div className="flex-1 pt-0 md:pt-10">
            <h1 className="text-3xl md:text-6xl font-semibold leading-tight mb-6 text-primary">
              Discover Your Dream Property with HouseFusion
            </h1>
            <p className="text-secondary mb-8 text-sm md:text-base">
              Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/properties"
                className="px-6 py-3 bg-primary rounded-lg hover:bg-primary-dark transition-colors text-surface text-center"
              >
                Browse Properties
              </Link>
              <Link 
                to="/features"
                className="px-4 py-2 rounded-lg border border-color hover:bg-surface-secondary transition-colors text-primary text-center"
              >
                Learn More
              </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="backdrop-blur-2xl bg-primary/10 rounded-2xl p-8 shadow-lg border border-color flex-1">
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-4xl font-semibold mb-2 text-primary">200+</div>
                  <div className="text-secondary text-sm md:text-base">Happy Customers</div>
                </div>
              </div>
              <div className="backdrop-blur-2xl bg-primary/10 rounded-2xl p-8 shadow-lg border border-color flex-1">
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-4xl font-semibold mb-2 text-primary">10k+</div>
                  <div className="text-secondary text-sm md:text-base">Properties Listed</div>
                </div>
              </div>
              <div className="backdrop-blur-2xl bg-primary/10 rounded-2xl p-8 shadow-lg border border-color flex-1">
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-4xl font-semibold mb-2 text-primary">16+</div>
                  <div className="text-secondary text-sm md:text-base">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <img 
              src="https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Modern building" 
              className="w-full h-[250px] md:h-[450px] lg:h-[600px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <div ref={sectionsRef.current.properties} id="properties" className=" mx-auto px-8 md:px-16 py-8 md:py-16 pb-10 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="group p-6 md:p-8 rounded-xl border border-color hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Home 
                className={`w-8 h-8 filter ${theme === 'dark' ? 'invert-100' : 'invert-0'}`}
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-primary transition-colors">
              Find Your Dream Home
            </h3>
            <p className="text-secondary text-sm md:text-base">
              Unlock the door to your perfect property with our extensive listings.
            </p>
          </div>

          <div className="group p-6 md:p-8 rounded-xl border border-color hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Activity 
                className={`w-8 h-8 filter ${theme === 'dark' ? 'invert-100' : 'invert-0'}`}
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary text-primary transition-colors">
              AI Property Valuation
            </h3>
            <p className="text-secondary text-sm md:text-base">
              Get instant AI-powered property valuations for informed decisions.
            </p>
          </div>

          <div className="group p-6 md:p-8 rounded-xl border border-color hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ClipboardList 
                className={`w-8 h-8 filter ${theme === 'dark' ? 'invert-100' : 'invert-0'}`}
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary text-primary transition-colors">
              Smart Management
            </h3>
            <p className="text-secondary text-sm md:text-base">
              Automated property management powered by AI technology.
            </p>
          </div>

          <div className="group p-6 md:p-8 rounded-xl border border-color hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ChartNoAxesCombined 
                className={`w-8 h-8 filter ${theme === 'dark' ? 'invert-100' : 'invert-0'}`}
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary text-primary transition-colors">
              Market Insights
            </h3>
            <p className="text-secondary text-sm md:text-base">
              Data-driven investment analysis and market trend predictions.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div ref={sectionsRef.current.properties} id="properties" className=" mx-auto px-8 md:px-16 py-8 md:py-16 pb-10 md:pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2 md:mb-4">Featured Properties</h2>
            <p className="text-secondary text-sm md:text-base max-w-2xl">
              Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes available through HouseFusion.
            </p>
          </div>
          <Link 
            to="/properties"
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-color hover:bg-surface-secondary transition-colors text-primary"
          >
            View All Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-background rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-color">
              <img 
                src="https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className="w-full h-36 md:h-48 lg:h-56 object-cover" 
                alt="Property" 
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">Luxury Family Home</h3>
                <p className="text-secondary text-sm mb-4">
                  Stunning 4-bedroom villa with modern amenities. <span className="text-primary hover:underline cursor-pointer">Read More</span>
                </p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="flex items-center gap-2 text-secondary text-sm">
                    <BedDouble/>
                    4-Bed
                  </span>
                  <span className="flex items-center gap-2 text-secondary text-sm">
                    <Bath/>
                    3-Bath
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-secondary text-xs">Price</p>
                    <p className="text-primary font-semibold">$550,000</p>
                  </div>
                  <Link
                    to="/properties/1"
                    className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-secondary">01 of 60</p>
          <div className="flex gap-2">
            <button className="p-2 bg-surface hover:bg-surface-secondary transition-colors rounded-lg text-primary border border-color">
              <MoveLeft/>
            </button>
            <button className="p-2 bg-surface hover:bg-surface-secondary transition-colors rounded-lg text-primary border border-color">
              <MoveRight/>
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div ref={sectionsRef.current.testimonials} id="testimonials" className="mx-auto px-8 md:px-16 py-8 md:py-16 pb-10 md:pb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            What Our Clients Say

          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-sm md:text-base">
            Discover why thousands of clients trust HouseFusion for their real estate needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group p-6 md:p-8 rounded-xl bg-background border border-color hover:border-primary transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                 <img src="https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?t=st=1739256825~exp=1739260425~hmac=9cf52b60a199564c96290717fd662d4faf36194a83372e5673713dee5d9321a7&w=1060" alt="pfp" 
                 className="w-12 h-12 rounded-full"
                 />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Sarah Johnson</h3>
                  <p className="text-secondary text-sm">New Home Owner</p>
                </div>
              </div>
              <p className="text-secondary text-sm md:text-base mb-4">
                "HouseFusion made finding our dream home effortless. Their AI-powered 
                matching system understood our needs better than we did!"
              </p>
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star className="text-yellow-400" fill="currentColor" key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-color hover:bg-surface-secondary transition-colors text-primary"
          >
            Read More Stories
            <MoveRight className="ml-3"/>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div ref={sectionsRef.current.faq} id="faq">
        <FAQ />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;