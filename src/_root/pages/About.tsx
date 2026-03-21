import { ShieldCheck, HeartPulse, Recycle, Globe, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black text-white px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Store showcase" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Our Story.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl animate-fade-in-up delay-100">
            Redefining commerce for the modern era. We build products that inspire and empower people worldwide.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Where Quality Meets Vision
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Founded with a rebellious spirit and a lofty objective: to offer premium, curated products at fair prices, while leading the way for socially conscious businesses.
              </p>
              <p>
                Our mission is to make shopping easy, enjoyable, and accessible for everyone. From bespoke collections to seamless one-click checkout, we put our customers first at every step of the journey. We believe in transparency, sustainability, and uncompromising quality.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-black border border-transparent rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                Explore Our Collection
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop" 
              alt="Our Team" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">The principles that guide everything we do and every product we create.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 border border-gray-100 group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Uncompromising Quality</h3>
              <p className="text-gray-600 leading-relaxed">We source only the finest materials and work with ethical manufacturers to ensure our products stand the test of time.</p>
            </div>

            {/* Value 2 */}
            <div className="p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 border border-gray-100 group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HeartPulse className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600 leading-relaxed">Your satisfaction is our obsession. We provide 24/7 dedicated support and a hassle-free return policy.</p>
            </div>

            {/* Value 3 */}
            <div className="p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 border border-gray-100 group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Recycle className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sustainable Future</h3>
              <p className="text-gray-600 leading-relaxed">We are committed to reducing our carbon footprint through eco-friendly packaging and conscious logistics planning.</p>
            </div>

            {/* Value 4 */}
            <div className="p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 border border-gray-100 group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">Bringing premium products to your doorstep, no matter where you are in the world, with fast and reliable shipping.</p>
            </div>

            {/* Value 5 */}
            <div className="p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 border border-gray-100 group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">We actively listen to our community's feedback to continuously improve and evolve our product lines.</p>
            </div>

            {/* Value 6 */}
            <div className="p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 border border-gray-100 group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Constant Innovation</h3>
              <p className="text-gray-600 leading-relaxed">We never settle. Our team is constantly researching and developing next-generation solutions for modern living.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Join the Nexton Family</h2>
          <p className="text-xl text-gray-400">Experience the difference of true quality and dedicated service. Sign up today and enjoy exclusive benefits.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-colors">
              Create an Account
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-gray-700 text-white font-bold hover:bg-gray-800 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
