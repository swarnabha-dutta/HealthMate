import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div>
          <div>
            <div>
              <Badge
                className={'ng-emrald'}
                variant="outline">Healthmate: Simplifying healthcare for everyone, everywhere </Badge>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
