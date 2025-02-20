// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, Instagram } from 'lucide-react';

export const Contact = () => {
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('sending');

    try {
      // Email.js implementation here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Get in Touch</h2>
          <p className="text-xl text-gray-400">Let's create something amazing together</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <a href="tel:4706559431" className="text-xl font-semibold gradient-text">
                  (470) 655-9431
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <a href="mailto:potluri.tarun.18@gmail.com" className="text-xl font-semibold gradient-text">
                  potluri.tarun.18@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Instagram className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Instagram</p>
                <a href="https://instagram.com/tarunpotluri_" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-xl font-semibold gradient-text">
                  @tarunpotluri_
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Form Fields */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 rounded-lg glass-effect bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 rounded-lg glass-effect bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg glass-effect bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                ></textarea>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2
                ${isSubmitting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'}`}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <Send className="w-5 h-5" />
            </motion.button>

            {/* Form Status */}
            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-3 rounded-lg ${
                  formStatus === 'success' ? 'bg-green-500/20 text-green-400' :
                  formStatus === 'error' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}
              >
                {formStatus === 'success' && 'Message sent successfully!'}
                {formStatus === 'error' && 'Failed to send message. Please try again.'}
                {formStatus === 'sending' && 'Sending message...'}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;