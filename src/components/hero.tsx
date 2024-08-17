import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
const texts = {
  motto: "",
  main: "Хүнсээ хянах",
  description: "Хүнсны жагсаалт гаргах шийдэл",
};
export default function HeroSectionGradientBackground() {
  return (
    <>
      {/* Hero */}
      <div className="relative py-24 lg:py-32  ">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661375373095-e83281f8a851?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={1920}
          height={1080}
          alt="background"
          className="blur-2xl absolute top-20 left-0 w-full h-full object-cover"
        />
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2 "
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* End Gradients */}
        <div className="relative">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="drop-shadow-xl">{texts.motto}</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl  drop-shadow-xl">
                  {texts.main}
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground drop-shadow-xl">
                  {texts.description}
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center drop-shadow-xl">
                <Button size={"lg"} asChild>
                  <Link href="/scanGrocery">Эхлэх </Link>
                </Button>
                {/* <Button size={"lg"} variant={"outline"}>
                  <Link href="/scanGrocery">Нэвтрэх</Link>
                </Button> */}
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
