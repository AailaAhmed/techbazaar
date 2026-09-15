import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#0D0D7B] mb-6">Contact Us</h1>
      <p className="text-gray-700 mb-8">
        Have a question or feedback? We'd love to hear from you.
      </p>

      {submitted ? (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <p className="text-[#0D0D7B] font-semibold">
            Thanks for reaching out! We'll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-[#436EDF] text-[#F8FAE5] px-6 py-2 rounded-lg font-semibold hover:bg-[#2f52b0] transition"
          >
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
export default Contact;