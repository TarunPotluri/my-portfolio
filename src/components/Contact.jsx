// src/components/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, Linkedin, Copy, CheckCheck, MessageSquare } from "lucide-react";

const YOUR_EMAIL = "potluri.tarun.18@gmail.com";
const YOUR_PHONE_DISPLAY = "(470) 655-9431"; // shown to users
const YOUR_PHONE_E164 = "14706559431"; // for tel:/WhatsApp links (digits only)
const YOUR_LINKEDIN = "https://www.linkedin.com/in/potluri-tarun-8951a5368/";
const YOUR_WHATSAPP = `https://wa.me/${YOUR_PHONE_E164}`; // opens chat if WhatsApp installed

const Contact = () => {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const canSend =
    formData.user_name.trim().length >= 2 &&
    isValidEmail(formData.user_email) &&
    formData.message.trim().length >= 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Build mailto link
  const buildMailto = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${formData.user_name}`);
    const bodyLines = [
      `Name: ${formData.user_name}`,
      `Email: ${formData.user_email}`,
      "",
      formData.message,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  };

  const copyFallback = async () => {
    try {
      const plain = `To: ${YOUR_EMAIL}
Subject: Portfolio contact from ${formData.user_name}

Name: ${formData.user_name}
Email: ${formData.user_email}

${formData.message}`;
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setFormStatus("copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setFormStatus("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    setIsSubmitting(true);
    setFormStatus("sending");

    // Try to open mail client
    const mailto = buildMailto();
    try {
      // window.location works best across browsers
      window.location.href = mailto;
      setFormStatus("success");
      setFormData({ user_name: "", user_email: "", message: "" });
    } catch {
      // If for some reason the mail client can't open, copy message
      await copyFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading, matching your style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-white/70 mb-2">
            <Mail className="w-4 h-4" />
            <span className="text-[11px] tracking-wider uppercase">Get in touch</span>
            <Mail className="w-4 h-4" />
          </div>
          <h2 className="text-4xl font-bold mb-2 gradient-text">Contact</h2>
          <p className="text-lg text-gray-400">
            Prefer no forms? Email or DM works great too.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact quick cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Phone</p>
                <a href={`tel:${YOUR_PHONE_E164}`} className="text-xl font-semibold gradient-text">
                  {YOUR_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <a href={`mailto:${YOUR_EMAIL}`} className="text-xl font-semibold gradient-text">
                  {YOUR_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Linkedin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">LinkedIn</p>
                <a
                  href={YOUR_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl font-semibold text-blue-300 hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">WhatsApp</p>
                <a
                  href={YOUR_WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl font-semibold text-green-300 hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Lightweight “form” that composes an email or copies as fallback */}
          <motion.form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <label className="block text-gray-400 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me a bit about your project or enquiry…"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
                required
              />
            </motion.div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                type="submit"
                disabled={isSubmitting || !canSend}
                whileHover={{ scale: canSend ? 1.02 : 1 }}
                whileTap={{ scale: canSend ? 0.98 : 1 }}
                className={`px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 ${
                  !canSend || isSubmitting
                    ? "bg-gray-500/40 cursor-not-allowed text-white/70"
                    : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow hover:opacity-95"
                }`}
              >
                {isSubmitting ? "Opening mail…" : "Send via Email"}
                <Send className="w-5 h-5" />
              </motion.button>

              <motion.button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `Name: ${formData.user_name}\nEmail: ${formData.user_email}\n\n${formData.message}`
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white/90 hover:bg-white/10"
              >
                {copied ? "Copied!" : "Copy Message"}
                {copied ? <CheckCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </motion.button>

              <a
                href={`${YOUR_WHATSAPP}?text=${encodeURIComponent(
                  `Hi Tarun, this is ${formData.user_name} (${formData.user_email}).\n\n${formData.message}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 bg-green-600/90 text-white hover:bg-green-600 transition"
              >
                WhatsApp
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>

            {/* Status toast */}
            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-2 text-sm p-3 rounded-lg ${
                  formStatus === "success"
                    ? "bg-green-500/15 text-green-300"
                    : formStatus === "error"
                    ? "bg-red-500/15 text-red-300"
                    : formStatus === "copied"
                    ? "bg-blue-500/15 text-blue-300"
                    : "bg-white/5 text-white/70"
                }`}
              >
                {formStatus === "success" && "Your email client should be open. If not, use the Copy button and paste into any app."}
                {formStatus === "copied" && "Message copied to clipboard—paste it anywhere you like!"}
                {formStatus === "error" && "Couldn’t launch email. Message copied instead—paste into any email/DM."}
                {formStatus === "sending" && "Preparing your message…"}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
