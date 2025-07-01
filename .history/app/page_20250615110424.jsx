import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creditBenefits, features, testimonials } from "@/lib/data (1)";
import { ArrowRight, Check, Stethoscope } from "lucide-react";
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
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Book appointments, consult via video, and manage your healthcare
              journey all in one secure platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature,index) => {
              return (
                <Card key={index}
                className="border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
                      {feature.icon}</div>
                    <CardTitle className="text-xl font-semibold text-white">
                      {feature.title}</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}</p>
                 </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing section heading part */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
            >
              Affordable Healthcare</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Consultation Packages</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect consultation package that fits your healthcare
              needs
            </p>
          </div>
          
         {/* pricing table  */}
          <div>
            <Card className="mt-12 bg-muted/20 border-emerald-900/30"> 
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
                  How Our Credit System Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map((benefit, index) => {
                    return (
                    <li className="flex items-start" key={index}>
                      <div className="mr-3 mt-1 bg-emerald-900/20 p-1 rounded-full">
                          <Check className="h-4 w-4 text-emerald-400" />
                          
                      </div>    
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={({ __html: benefit })}
                      > 
                      </p>
                    </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      


      {/* Testimonial Section  */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
            variant="outline"
            className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
            >
              Success Stories   
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              What Our Users say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from patients and doctors who use our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial,index) => {
              return (
                <Card key={index}
                className="border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                        <span className="text-emerald-400 font-bold">
                          {testimonial.initials}
                        </span>
                      </div>
                      <div>
                        <h4
                          className="font-semibold text-white"
                        >{testimonial.name}</h4>
                        <p
                        className="text-sm text-muted-foreground"
                        >
                          {testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <Card 
            className="bg-gradient-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20"
            >
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                  <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                    Ready to take control of your healthcare?
                  </h2>
                  <p className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Join thousands of users who have simplified their healthcare
                    journey with our platform. Get started today and experience
                    healthcare the way it should be.
                  </p>
              </div>
              <div className="flex flex-col ">
                {/* Button 1  */}
                <Button
                  size="lg"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  asChild>
                  <Link href="/sign-up"></Link>
                </Button>
                {/* Button 2   */}
                <Button
                  variant="outline"
                  className="border-emerald-700/30  hover:bg-muted/80"
                  asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
