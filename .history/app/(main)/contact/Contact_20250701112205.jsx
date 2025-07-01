"use client";

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
    <section id="contact" className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h2></h2>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-white text-center">Contact Us</h1>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
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
                className="dark-input w-full px-6 py-4 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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
                className="dark-input w-full px-6 py-4 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            {/* Message Input */}
            <div>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="dark-input w-full px-6 py-4 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg resize-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="dark-button w-full py-4 px-8 text-black font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-8 p-6 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
              <div className="text-green-400 font-medium mb-2 text-lg">Message Sent Successfully!</div>
              <p className="text-green-300">Thank you for reaching out. I'll get back to you soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;