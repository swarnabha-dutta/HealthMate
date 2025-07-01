"use client";
import dynamic from "next/dynamic";
import ContactForm from "./ContactForm";

const CanvasModel = dynamic(() => import("./CanvasModel"), { ssr: false });

export default function ContactSection() {
return (
    <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-12 bg-background border rounded-2xl shadow-lg">
      {/* Left: Contact Form */}
        <div className="w-full md:w-1/2 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          We'd love to hear from you! Fill out the form and we’ll get back to you soon.
        </p>
        <ContactForm />
      </div>

      {/* Right: Animated 3D Model */}
      <div className="w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden">
        <CanvasModel />
      </div>
    </div>
  );
}
