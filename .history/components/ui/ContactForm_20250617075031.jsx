"use client";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./button";

export default function ContactForm() {
const form = useRef();

const sendEmail = (e) => {
    e.preventDefault();
    emailjs
    .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY")
    .then(
        (result) => {
        alert("Message sent ✅");
        },
        (error) => {
        alert("Failed to send ❌");
        }
    );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5 w-full">
    <input type="text" name="user_name" placeholder="What's your good name?" className="bg-muted p-3 rounded-md" required />
    <input type="email" name="user_email" placeholder="What's your email address?" className="bg-muted p-3 rounded-md" required />
    <textarea name="message" placeholder="How can I help you?" className="bg-muted p-3 rounded-md" rows="5" required />
    <Button type="submit" className="mt-2">Send Message
    </Button>
    </form>
  );
}
