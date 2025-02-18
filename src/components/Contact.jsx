// src/components/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const formRef = useRef();
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = {
    phone: '(470) 655-9431',
    email: 'potluri.tarun.18@gmail.com',
    instagram: 'https://www.instagram.com/_tarun.potluri_'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('sending');

    try {
      await emailjs.sendForm(
        'service_s72qota',
        'template_zf1crok',
        formRef.current,
        'jrfbJ8gKBdnab0PhF'
      );
      setFormStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusMessages = {
    sending: { text: 'Sending...', class: 'text-blue-500' },
    success: { text: 'Message sent successfully!', class: 'text-green-500' },
    error: { text: 'Failed to send message. Please try again.', class: 'text-red-500' }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Let's connect and discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            {/* Phone */}
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-4"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-4"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold mb-4">Follow me on</h4>
              <motion.a
                whileHover={{ y: -3 }}
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                <span>@_tarun.potluri_</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {formStatus && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center ${statusMessages[formStatus].class}`}
                >
                  {statusMessages[formStatus].text}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'} 
                  text-white transition-colors`}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};