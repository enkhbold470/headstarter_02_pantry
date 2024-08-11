import { Button } from "@/components/ui/button";
import { DataTableDemo } from "./table";
import Link from "next/link";
export default function ScanGrocery() {
  return (
    <main>
      {/* <Contact /> */}
      <div className="p-6  ">
        <div className="flex justify-between p-4">
          <Button>
            <Link href="/scanGrocery/add">Хүнс гараар нэмэх</Link>
          </Button>
          <Button>
            <Link href="/scanGrocery/takepic">Хүнс баркодоор нэмэх</Link>
          </Button>
        </div>
        <DataTableDemo />
      </div>
      {/* <AddItems /> */}

      {/* <CameraComponent /> */}
    </main>
  );
}
