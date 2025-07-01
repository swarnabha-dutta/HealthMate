"use client";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./button";

export default function ContactForm() {
const form = useRef();

const sendEmail = (e) => {
    e.preventDefault();
    emailjs
    .sendForm("service_3mno4cj", "template_vr72cpq", form.current, "Ayjuws480ArLZ3lix")
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
    <Button type="submit" className="cl-pricingTableCardFooterButton cl-button 🔒️ cl-internal-1odp14a text-white text-tighter">
        Send Message
    </Button>
    </form>
);
}
