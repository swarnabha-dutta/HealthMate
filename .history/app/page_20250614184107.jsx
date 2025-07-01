import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div>
            <div>
              <Badge
                className={'bg-emerald-900/30 bg-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium '}
                variant="outline">Healthmate: Simplifying healthcare for everyone, everywhere
              </Badge>
              <h1 className="text-4xl">
                Connect with doctors <br /> <span>anytime , anywhere</span>
              </h1>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
