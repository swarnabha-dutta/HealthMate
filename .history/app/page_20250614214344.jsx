import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-background grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge
                className={'bg-emerald-900/30 bg-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium '}
                variant="outline">Healthmate: Simplifying healthcare for everyone, everywhere
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with doctors <br />{" "}
                <span className="gradient-title">anytime , anywhere</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Book appointments, consult via video, and manage your healthcare
                journey all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Get Started Button */}
                <Button
                  asChild
                  className='bg-emerald-600 grid-text-white hover:bg-emerald700'
                >
                  <Link href={'/onboarding'}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4"/>
                  </Link>
                </Button>
                {/*Find doctors button  */}
                <Button
                  asChild
                  variant='outline'
                  className='border-emerald-700/30 hover:bg-muted/80'
                >
                  <Link href={'/doctors'}>
                  Find doctors
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/banner2.png"
                alt="Doctors Consultation"
                fill
                priority
                className="object-cover md:pt-14 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md items-center jus">
              Book appointments, consult via video, and manage your healthcare
              journey all in one secure platform.
            </p>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
}
