import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import jewelry from "/76237953771.png";
import women from "/image (2).png";
import men from "/8896469042.png";
import{ 
  FiArrowRight, FiChevronLeft, FiChevronRight, FiStar, FiHeart, 
  FiAward, FiPause, FiPlay, FiZap, FiTrendingUp, 
  FiHeadphones, FiShield, FiGift, FiShoppingBag, FiTruck,
  FiClock, FiRefreshCw, FiMail
} from 'react-icons/fi';
import { FaShoppingCart, FaCrown, FaRocket, FaMagic, FaRegSmile } from 'react-icons/fa';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroSlides = [
    {
      id: 4,
      title: "Smart Living Starts Here",
      subtitle: "Electronics & Gadgets",
      description: "Explore the latest smartphones, laptops, and gadgets designed for modern life.",
      cta: "Shop Electronics",
      ctaLink: "/shop?category=electronics",
      bgGradient: "from-purple-600 via-indigo-600 to-blue-600",
      image: "https://cdni.iconscout.com/illustration/premium/thumb/gadgets-3395110-2862652.png",
      stats: { sold: "20K+", rating: "4.9", reviews: "5.5K" }
    },
    {
      id: 1,
      title: "Style That Defines You",
      subtitle: "Men's Exclusive Collection",
      description: "Upgrade your wardrobe with premium outfits designed for comfort.",
      cta: "Shop Men's",
      ctaLink: "/shop?category=men",
      bgGradient: "from-blue-600 via-sky-600 to-indigo-700",
      image: men,
      stats: { sold: "12K+", rating: "4.7", reviews: "3.2K" }
    },
    {
      id: 2,
      title: "Elegance Redefined",
      subtitle: "Women's Fashion Trends",
      description: "Discover chic styles, modern outfits, and timeless classics made for every occasion.",
      cta: "Shop Women's",
      ctaLink: "/shop?category=women",
      bgGradient: "from-pink-600 via-rose-500 to-fuchsia-600",
      image: women,
      stats: { sold: "15K+", rating: "4.9", reviews: "4.1K" }
    },
    {
      id: 3,
      title: "Luxury That Shines",
      subtitle: "Jewelry & Accessories",
      description: "Adorn yourself with our stunning collection of jewelry crafted to perfection.",
      cta: "Shop Jewelry",
      ctaLink: "/shop?category=jewelry",
      bgGradient: "from-amber-500 via-yellow-500 to-orange-600",
      image: jewelry,
      stats: { sold: "7K+", rating: "4.8", reviews: "2.3K" }
    },
    
  ];

  const features = [
    { icon: FaRocket, title: 'Lightning Fast', description: 'Blazing-fast performance', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { icon: FiShield, title: 'Secure & Reliable', description: '24/7 bank-grade security', color: 'text-green-500', bgColor: 'bg-green-50' },
    { icon: FiHeadphones, title: 'Expert Support', description: 'Certified technicians anytime', color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { icon: FiGift, title: 'Exclusive Deals', description: 'Special promotional offers', color: 'text-orange-500', bgColor: 'bg-orange-50' }
  ];

  const services = [
    { icon: FiTruck, title: 'Free Shipping', description: 'On orders over $50', color: 'text-blue-500' },
    { icon: FiRefreshCw, title: 'Easy Returns', description: '30-day return policy', color: 'text-green-500' },
    { icon: FiShield, title: 'Secure Payment', description: 'Safe transaction guarantee', color: 'text-amber-500' },
    { icon: FiClock, title: '24/7 Support', description: 'Dedicated customer service', color: 'text-purple-500' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Fashion Blogger', comment: 'The quality of their products is exceptional. I always get compliments when I wear their clothes!', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Michael Chen', role: 'Tech Entrepreneur', comment: 'Fast shipping and excellent customer service. Will definitely shop here again!', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Emma Williams', role: 'Interior Designer', comment: 'Their jewelry collection is stunning. I\'ve found so many unique pieces for my collection.', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' }
  ];

  const stats = [
    { value: 50, suffix: 'K+', label: 'Happy Customers', icon: FaRegSmile, color: 'text-blue-500' },
    { value: 100, suffix: '+', label: 'Brand Partners', icon: FiAward, color: 'text-purple-500' },
    { value: 500, suffix: '+', label: 'Products', icon: FiShoppingBag, color: 'text-amber-500' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: FiStar, color: 'text-green-500' }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleAutoplay = () => setIsPlaying(!isPlaying);
  const nextSlide = () => setCurrentSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);

  const slideVariants = {
    enter: { opacity: 0, scale: 0.9 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, scale: 1.1, transition: { duration: 0.7 } }
  };

  // Define text styles for each slide
  const textStyles = [
    { bg: 'bg-blue-100', text: 'text-blue-800' },
    { bg: 'bg-pink-100', text: 'text-pink-800' },
    { bg: 'bg-amber-100', text: 'text-amber-800' }
  ];

  // Responsive text sizes
  const titleSize = windowWidth < 400 ? 'text-2xl' : windowWidth < 768 ? 'text-3xl' : 'text-4xl md:text-5xl';
  const descSize = windowWidth < 400 ? 'text-sm' : windowWidth < 768 ? 'text-base' : 'text-lg';

  // Counter animation component
  const Counter = ({ value, suffix }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let start = 0;
      const end = value;
      const duration = 2000; // ms
      const incrementTime = Math.floor(duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }, [value]);
    
    return (
      <span className="text-4xl md:text-5xl font-bold">
        {count}{suffix}
      </span>
    );
  };

  return (
    <motion.div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] md:min-h-screen bg-white flex items-center justify-center overflow-hidden px-4 py-12 md:py-0">
  {/* Decorative Bubbles - 8 total with varied sizes and positions */}
  {windowWidth > 300 && (
    <>
      {/* Top Left Bubbles */}
      <div className="absolute top-8 left-6 md:top-16 md:left-16 w-14 h-14 md:w-20 md:h-20 bg-blue-100 rounded-full opacity-60 animate-float" />
      <div className="absolute top-20 left-12 md:top-28 md:left-24 w-10 h-10 md:w-14 md:h-14 bg-indigo-100 rounded-full opacity-50 animate-float delay-700" />
      
      {/* Top Right Bubbles */}
      <div className="absolute top-12 right-8 md:top-20 md:right-20 w-16 h-16 md:w-22 md:h-22 bg-purple-100 rounded-full opacity-50 animate-float delay-1000" />
      <div className="absolute top-28 right-14 md:top-40 md:right-32 w-8 h-8 md:w-12 md:h-12 bg-pink-100 rounded-full opacity-60 animate-float delay-1300" />
      
      {/* Bottom Left Bubbles */}
      <div className="absolute bottom-16 left-10 md:bottom-28 md:left-24 w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full opacity-60 animate-float delay-1600" />
      <div className="absolute bottom-8 left-20 md:bottom-20 md:left-40 w-10 h-10 md:w-14 md:h-14 bg-yellow-100 rounded-full opacity-50 animate-float delay-1900" />
      
      {/* Bottom Right Bubbles */}
      <div className="absolute bottom-20 right-10 md:bottom-32 md:right-24 w-14 h-14 md:w-18 md:h-18 bg-green-100 rounded-full opacity-50 animate-float delay-2200" />
      <div className="absolute bottom-10 right-24 md:bottom-24 md:right-44 w-9 h-9 md:w-13 md:h-13 bg-teal-100 rounded-full opacity-60 animate-float delay-2500" />
    </>
  )}

  {/* Content Grid */}
<div
  className="relative z-10 container mx-auto 
             grid grid-cols-1 lg:grid-cols-2 
             items-center justify-center text-center 
             gap-10 min-h-[80vh] md:min-h-screen"
>
  {/* Right: Hero Image (on top in small, left in lg) */}
  <motion.div
    className="relative order-1 lg:order-2 w-full mx-auto overflow-visible 
               flex justify-center items-center min-h-[50vh] md:min-h-[70vh]"
    whileHover={{ scale: windowWidth > 768 ? 1.02 : 1 }}
    transition={{ duration: 0.4 }}
  >
    <AnimatePresence mode="wait">
      <motion.img
        key={currentSlide}
        src={heroSlides[currentSlide].image}
        alt={heroSlides[currentSlide].title}
        className="w-full max-w-md md:max-w-xl h-80 md:h-[28rem] object-contain"
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
      />
    </AnimatePresence>
  </motion.div>
   {/* Slide Controls */}
  

  {/* Left: Card-Like Text Box */}
  <motion.div
    className="order-2 m-auto  lg:order-1 w-full max-w-xs md:max-w-sm p-4 md:p-6 rounded-xl 
               flex-shrink-0 self-start lg:self-center shadow-lg 
               border border-gray-200 bg-gray-100 bg-opacity-90 z-20"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    style={{
      backgroundColor: textStyles[currentSlide % textStyles.length].bg.replace('bg-', '')
    }}
  >
    <h1
      className={`${titleSize} font-bold leading-tight mb-4 
                  ${textStyles[currentSlide % textStyles.length].text}`}
    >
      {heroSlides[currentSlide].title}
    </h1>
    <p
      className={`${descSize} opacity-90 mb-6 
                  ${textStyles[currentSlide % textStyles.length].text}`}
    >
      {heroSlides[currentSlide].description}
    </p>
    <Link
      to={heroSlides[currentSlide].ctaLink}
      className="inline-flex items-center bg-white text-gray-900 px-4 py-2 
                 md:px-6 md:py-3 rounded-xl font-semibold gap-2 
                 hover:bg-gray-100 transition border border-gray-300"
    >
      {heroSlides[currentSlide].cta} <FiArrowRight />
    </Link>
  </motion.div>
</div>
<div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-20">
    <button 
      onClick={prevSlide}
      className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition"
      aria-label="Previous slide"
    >
      <FiChevronLeft className="text-xl" />
    </button>
    
    <button 
      onClick={toggleAutoplay}
      className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition"
      aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
    >
      {isPlaying ? <FiPause className="text-xl" /> : <FiPlay className="text-xl" />}
    </button>
    
    <button 
      onClick={nextSlide}
      className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition"
      aria-label="Next slide"
    >
      <FiChevronRight className="text-xl" />
    </button>
  </div>
 
  {/* Slide Indicators */}
  <div className="absolute bottom-4 right-4 flex gap-2 z-20">
    {heroSlides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>
      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white px-4 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-4 bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className={`text-3xl mx-auto mb-3 ${stat.color}`} />
                <div className="mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-white px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-sm md:text-lg text-slate-600">
              We offer more than just products - experience our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white p-5 rounded-xl shadow-sm flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <service.icon className={`text-2xl mt-1 ${service.color}`} />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-white px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-sm md:text-lg text-slate-600">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic">"{testimonial.comment}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-white px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div 
            className="bg-gray-100 p-6 md:p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <FiMail className="text-4xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Stay Updated
            </h2>
            <p className="text-slate-600 mb-6">
              Subscribe to our newsletter for exclusive deals and new product announcements
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-white px-4">
        <div className="container mx-auto text-center">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 md:p-12 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Elevate Your Style?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already experienced our premium products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/shop" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Shop Now
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;