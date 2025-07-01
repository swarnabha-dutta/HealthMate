"use client";
import { useRef, useState } from "react";

const Contact = () => {
  // ... state management code ...

  return (
    <section id="contact" className="min-h-screen bg-dark-bg text-white">
     
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-bold text-white">Contact Us</h1>
        </div>
        
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">Contact Use</h2>
            {/* Form fields... */}
          </div>
        </div>
      </div>
    </section>
  );
};