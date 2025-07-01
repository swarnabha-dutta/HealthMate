import { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="min-h-screen bg-dark-bg text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-screen">
          {/* Left Side - Contact Form */}
          <div className="flex flex-col justify-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold mb-8 text-white">Contact Us</h1>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="dark-input w-full px-4 py-3 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="dark-input w-full px-4 py-3 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="dark-input w-full px-4 py-3 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="dark-button w-full py-3 px-6 text-black font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>

              {/* Success Message */}
              {showSuccess && (
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="text-green-400 font-medium mb-1">Message Sent Successfully!</div>
                  <p className="text-green-300 text-sm">Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Dark Empty Space */}
          <div className="hidden lg:flex items-center justify-center bg-dark-secondary rounded-2xl">
            <div className="text-center text-gray-500">
              {/* This space can be used for additional content if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;