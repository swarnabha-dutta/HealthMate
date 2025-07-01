import ContactForm from "@/components/ui/ContactForm";



export default function ContactPage() {
return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 gap-10 py-12">
        <div className="w-full md:w-1/2 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <ContactForm />
        </div>
        <div className="w-full md:w-1/2 h-[400px] bg-card rounded-xl overflow-hidden">
            
        </div>
    </div>
);
}
