import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
              <div>
                <Button
                  asChild
                  className='bg-emrald-600 gtext-white hover:bg-emerald700'
                >
                  <Link>
                  </Link>
                  
                </Button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
