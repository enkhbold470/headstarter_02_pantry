import Contact from './form';
import { DataTableDemo } from './table';
export default function ScanGrocery() {
  return (
    <main>
      {/* <Input placeholder="Хүнсний нэр" /> */}
      <h1>Scan Grocery</h1>
      <Contact />
      <div className='p-6'>

        <DataTableDemo />
      </div>
      {/* <AddItems /> */}

      {/* <CameraComponent /> */}
    </main>
  );
}
