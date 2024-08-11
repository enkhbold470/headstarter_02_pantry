import { Button } from "@/components/ui/button";
import Link from "next/link";
const texts = {
  motto: "Шим тэжээлээ хянаарай",
  main: "Хүнсээ хянах",
  description: "1000+ илүү хүн өдөр тутамдаа ашиглаж байна",
};
export default function HeroSectionGradientBackground() {
  return (
    <>
      {/* Hero */}
      <div className="relative py-24 lg:py-32">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* End Gradients */}
        <div className="relative">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="">{texts.motto}</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  {texts.main}
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  {texts.description}
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Button size={"lg"} asChild>
                  <Link href="/scanGrocery">Эхлэх </Link>
                </Button>
                <Button size={"lg"} variant={"outline"}>
                  <Link href="/scanGrocery">Нэвтрэх</Link>
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
