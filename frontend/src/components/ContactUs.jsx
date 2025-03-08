import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/items/comment", {
        name,
        comment,
      });
      setName("");
      setComment("");
      toast.success("thank you for your comment");
    } catch (error) {
      console.log(error);
      toast.error("network failed");
    }
  };

  return (
    <section className=" py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Get in Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div>
            <p className="text-gray-600 mb-4">
              Have questions or need support? Contact us and we’ll get back to
              you as soon as possible!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin className="text-primary" />
                <p className="text-gray-700">123 Food Street, Flavor Town 🍔</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-primary" />
                <p className="text-gray-700">+251 (911) 717-142</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-primary" />
                <p className="text-gray-700">fikeryilkaltaged@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white p-3 md:p-6 rounded-2xl shadow-lg">
            <form onSubmit={handleComment} className="space-y-4">
              <div>
                <label className="text-gray-700 font-medium">Your Name</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Message</label>
                <textarea
                  rows={4}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                  placeholder="Type your message..."
                  required
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/50 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
