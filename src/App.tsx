import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  ArrowRight, 
  Car, 
  FileText, 
  Image as ImageIcon, 
  Map, 
  User, 
  Building2, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Download,
  ChevronRight,
  Search,
  Mail,
  Phone,
  MapPin,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Panel, Input, Select, Button } from './components/UI';
import { 
  SAMPLE_CLIENTS, 
  SAMPLE_VEHICLES, 
  SAMPLE_CONNECTORS, 
  SAMPLE_SUPPLIERS, 
  SAMPLE_QUOTATIONS, 
  SAMPLE_ORDERS 
} from './constants';
import { UserRole, Vehicle, Connector, Client, Supplier } from './types';

export default function App() {
  const [role, setRole] = useState<UserRole>('CLIENT');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(SAMPLE_VEHICLES[0]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(SAMPLE_CLIENTS[0]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(SAMPLE_SUPPLIERS[0]);

  const renderHeader = () => (
    <header className="flex justify-between items-center p-6 border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-brand tracking-tighter">KG</span>
          <span className="text-lg tracking-[0.2em] uppercase text-white/90 font-light hidden sm:block">ProTech</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10 mx-2" />
        <nav className="flex gap-6">
          <button onClick={() => setRole('CLIENT')} className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${role === 'CLIENT' ? 'text-brand' : 'text-white/40 hover:text-white'}`}>Client View</button>
          <button onClick={() => setRole('MANAGER')} className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${role === 'MANAGER' ? 'text-brand' : 'text-white/40 hover:text-white'}`}>Manager View</button>
          <button onClick={() => setRole('SUPPLIER')} className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${role === 'SUPPLIER' ? 'text-brand' : 'text-white/40 hover:text-white'}`}>Supplier View</button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Logged in as</p>
          <p className="text-xs">{role}</p>
        </div>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <LogOut size={14} className="text-white/60" />
        </button>
      </div>
    </header>
  );

  const renderClientView = () => {
    if (currentPage === 1) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Access & Organization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Access">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Email" type="email" placeholder="email@company.com" />
                <Input label="Password" type="password" />
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1">Login</Button>
                <Button variant="secondary" className="flex-1">Sign Up</Button>
              </div>
            </Panel>
            <Panel title="Organization">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
                <Input label="Company Name" placeholder="Organization Name" />
                <Select label="Country" options={[{value: 'us', label: 'United States'}, {value: 'fr', label: 'France'}]} />
                <Input label="Street" />
                <Input label="Email" />
                <Input label="Phone" />
                <div className="flex items-end mb-4">
                  <Button className="w-full"><Save size={14} className="mr-2" /> Save</Button>
                </div>
              </div>
            </Panel>
          </div>

          {/* Row 2: Vehicles & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="My Vehicles" rightElement={<Button variant="secondary" className="p-1 h-6 w-6 flex items-center justify-center"><Plus size={14}/></Button>}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAMPLE_VEHICLES.slice(0, 2).map(v => (
                  <div 
                    key={v.id} 
                    onClick={() => setSelectedVehicle(v)}
                    className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between ${selectedVehicle?.id === v.id ? 'border-brand bg-brand/5' : 'border-white/5 bg-white/2 hover:bg-white/5'}`}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wider">{v.brand}</p>
                      <p className="text-[10px] text-white/40">{v.model}</p>
                    </div>
                    <ChevronRight size={14} className={selectedVehicle?.id === v.id ? 'text-brand' : 'text-white/20'} />
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Vehicle Specs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                <Input label="Brand and Model" defaultValue={selectedVehicle?.brand + ' ' + selectedVehicle?.model} />
                <Input label="Version and Year" defaultValue={selectedVehicle?.year} />
                <Input label="VIN" defaultValue={selectedVehicle?.vin} />
                <Input label="Engine Type/Size" defaultValue={selectedVehicle?.engineType} />
                <Input label="Power and Fuel" defaultValue={selectedVehicle?.enginePower + ' / ' + selectedVehicle?.fuel} />
                <Input label="Engine Code" defaultValue={selectedVehicle?.engineCode} />
                <Input label="Transmission Type" defaultValue={selectedVehicle?.transmissionType} />
                <Input label="Number of Gears" defaultValue={selectedVehicle?.transmissionGears} />
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1"><Save size={14} className="mr-2" /> Save</Button>
                <Button variant="secondary" className="flex-1" onClick={() => setCurrentPage(2)}>+ Connectors</Button>
              </div>
            </Panel>
          </div>

          {/* Row 3: Detailed View */}
          <Panel title="Details: Renault Captur II">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 p-4 bg-white/5 rounded border border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-brand mb-4">ABS System</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-video bg-black/40 rounded flex items-center justify-center border border-white/5">
                      <ImageIcon size={24} className="text-white/20" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-64 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Documentation</p>
                <Button variant="secondary" className="w-full text-[10px] justify-start"><FileText size={14} className="mr-2"/> Wiring Diagrams</Button>
                <Button variant="secondary" className="w-full text-[10px] justify-start"><FileText size={14} className="mr-2"/> Pinning Lists</Button>
                <Button variant="secondary" className="w-full text-[10px] justify-start"><ImageIcon size={14} className="mr-2"/> ECU Labels</Button>
                <div className="pt-4">
                  <Button className="w-full">Save Changes</Button>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      );
    }

    if (currentPage === 2) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Vehicle Selection & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Panel title="My Vehicles">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {SAMPLE_VEHICLES.slice(0, 2).map(v => (
                  <div key={v.id} className="min-w-[200px] p-3 rounded border border-white/5 bg-white/2 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider">{v.brand}</p>
                      <p className="text-[10px] text-white/40">{v.model}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Vehicle Detail">
              <div className="flex items-center gap-4 h-full">
                <div className="p-4 bg-brand/10 border border-brand/20 rounded">
                  <Car className="text-brand" size={32} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest">{selectedVehicle?.brand} {selectedVehicle?.model}</p>
                  <div className="flex gap-2 mt-2">
                    <Button className="text-[10px] py-1 px-3">Connectors</Button>
                    <Button variant="secondary" className="text-[10px] py-1 px-3">Edit</Button>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel title="Vehicle Specs">
              <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                <Input label="Brand" defaultValue={selectedVehicle?.brand} />
                <Input label="Model" defaultValue={selectedVehicle?.model} />
              </div>
            </Panel>
          </div>

          {/* Row 2: Connector Editing Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Connector 1">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="aspect-square bg-black/40 rounded border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-[10px] uppercase text-white/40 mb-4">Female Photos (Front/Side)</p>
                    <Button variant="secondary" className="text-[10px]">Upload</Button>
                  </div>
                  <div className="aspect-square bg-black/40 rounded border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-[10px] uppercase text-white/40 mb-4">Male Photos</p>
                    <Button variant="secondary" className="text-[10px]">Upload</Button>
                  </div>
                  <div className="aspect-square bg-black/40 rounded border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-[10px] uppercase text-white/40 mb-4">Connector Map</p>
                    <Button variant="secondary" className="text-[10px]">Upload</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Documentation</p>
                    <Button variant="secondary" className="w-full text-[10px] justify-start"><FileText size={14} className="mr-2"/> + Wiring Diagrams</Button>
                    <Button variant="secondary" className="w-full text-[10px] justify-start"><FileText size={14} className="mr-2"/> + Pinning Lists</Button>
                    <Button variant="secondary" className="w-full text-[10px] justify-start"><ImageIcon size={14} className="mr-2"/> + ECU Labels</Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Map Generator</p>
                    <Input label="Car/Minifit/Sub-DB Pins" placeholder="Enter pins" />
                    <Input label="Twisting and Shielding" placeholder="Specify" />
                    <Input label="Wire Diameter" placeholder="e.g. 0.5mm" />
                    <Button className="w-full mt-2">Generate Map</Button>
                  </div>
                </div>
                <Button className="w-full">Save Connector 1</Button>
              </div>
            </Panel>
            <Panel title="Connector 2">
              <div className="flex flex-col gap-6 opacity-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="aspect-square bg-black/40 rounded border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-[10px] uppercase text-white/40 mb-4">Visual Assets</p>
                    <Button variant="secondary" className="text-[10px]">Upload</Button>
                  </div>
                </div>
                <Button className="w-full" disabled>Locked</Button>
              </div>
            </Panel>
          </div>
        </div>
      );
    }
  };

  const renderManagerView = () => {
    if (currentPage === 3) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Clients List (Horizontal) */}
          <Panel title="Clients">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {SAMPLE_CLIENTS.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => setSelectedClient(c)}
                  className={`min-w-[240px] p-3 rounded border transition-all cursor-pointer ${selectedClient?.id === c.id ? 'border-brand bg-brand/5' : 'border-white/5 bg-white/2 hover:bg-white/5'}`}
                >
                  <p className="text-xs uppercase tracking-wider">{c.name}</p>
                  <p className="text-[10px] text-white/40">{c.email}</p>
                </div>
              ))}
            </div>
          </Panel>

          {/* Row 2: Client Details & Vehicles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title={`Client: ${selectedClient?.name}`} rightElement={<Button variant="secondary" className="text-[10px]">Contact</Button>}>
              <div className="grid grid-cols-2 gap-4">
                {SAMPLE_VEHICLES.slice(0, 2).map(v => (
                  <div key={v.id} className="p-3 bg-white/5 border border-white/10 rounded">
                    <p className="text-[10px] uppercase text-brand mb-1">{v.brand}</p>
                    <p className="text-xs">{v.model}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/5 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Detailed View: Lincoln Navigator</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-3 bg-black/40 rounded border border-white/5">
                    <p className="text-[10px] uppercase text-brand mb-2">ABS -&gt; Connector 1</p>
                    <div className="flex gap-2 mb-4">
                      <div className="w-10 h-10 bg-white/5 rounded border border-white/10 flex items-center justify-center"><ImageIcon size={12} className="text-white/20"/></div>
                      <div className="w-10 h-10 bg-white/5 rounded border border-white/10 flex items-center justify-center"><FileText size={12} className="text-white/20"/></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="Status" defaultValue="Pending" />
                      <Input label="Supplier" defaultValue="Breakoutbox" />
                    </div>
                  </div>
                  <div className="w-full md:w-32 flex items-end">
                    <Button variant="secondary" className="w-full text-[10px]">Connector Map</Button>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel title="Connector Map Generator">
              <div className="space-y-4">
                <div className="p-3 bg-brand/5 border border-brand/20 rounded">
                  <p className="text-[10px] leading-relaxed text-white/80">
                    Automatic table generation based on uploaded pinning lists and wiring diagrams. 
                    Manual pin configuration options available for custom overrides.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-2 bg-black/20 rounded border border-white/5 text-center">
                      <p className="text-[8px] uppercase text-white/40">Pin {i}</p>
                      <p className="text-[10px]">{i === 1 ? 'Ground' : i === 2 ? 'VCC 12V' : 'CAN High'}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full" onClick={() => setCurrentPage(4)}>Generate Map <ArrowRight size={14} className="ml-2"/></Button>
              </div>
            </Panel>
          </div>
        </div>
      );
    }

    if (currentPage === 4) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Vehicle Info & Quotations Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Panel title="Vehicle + Connector">
              <div className="flex items-center gap-4 h-full">
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="text-[10px] uppercase text-brand">Lincoln Navigator</p>
                  <p className="text-xs">ABS Connector 1</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/40">Status</span>
                    <span className="text-brand">To Quote</span>
                  </div>
                  <Button variant="secondary" className="w-full text-[10px] py-1" onClick={() => setCurrentPage(5)}>Select Supplier</Button>
                </div>
              </div>
            </Panel>
            <div className="lg:col-span-2">
              <Panel title="Quotations">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/40">
                        <th className="pb-2 font-normal uppercase tracking-widest text-[10px]">Supplier</th>
                        <th className="pb-2 font-normal uppercase tracking-widest text-[10px]">Lead Time</th>
                        <th className="pb-2 font-normal uppercase tracking-widest text-[10px]">Price</th>
                        <th className="pb-2 font-normal uppercase tracking-widest text-[10px]">PDF</th>
                        <th className="pb-2 font-normal uppercase tracking-widest text-[10px]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {SAMPLE_SUPPLIERS.map(s => (
                        <tr key={s.id} className="group hover:bg-white/2">
                          <td className="py-2">{s.name}</td>
                          <td className="py-2">60 Days</td>
                          <td className="py-2">€2,500</td>
                          <td className="py-2"><FileText size={14} className="text-white/40 group-hover:text-brand cursor-pointer" /></td>
                          <td className="py-2">
                            <Button variant="secondary" className="text-[8px] py-1 px-2">Request</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>
          </div>

          {/* Row 2: Selected Supplier & Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Breakoutbox Quotation">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl tracking-tighter">€2,500</span>
                    <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-1 rounded">60 Days</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[10px]">
                    <div><span className="text-white/40 block">Valid Until</span><span>2026-06-10</span></div>
                    <div><span className="text-white/40 block">Sent Date</span><span>2026-04-10</span></div>
                  </div>
                  <Button variant="secondary" className="w-full"><Download size={14} className="mr-2"/> Show Quotation PDF</Button>
                </div>
                <div className="w-full md:w-64 flex flex-col justify-between">
                  <div className="p-3 bg-brand/10 border border-brand/40 rounded flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] uppercase text-brand">Selected</p>
                      <p className="text-xs">BREAKOUTBOX</p>
                    </div>
                    <CheckCircle2 size={20} className="text-brand" />
                  </div>
                  <Button className="w-full" onClick={() => setCurrentPage(6)}>Mark as Done</Button>
                </div>
              </div>
            </Panel>
            <Panel title="Add Solutions">
              <div className="flex items-center gap-6 h-full">
                <div className="flex-1 p-4 bg-black/40 rounded border border-white/5">
                  <p className="text-xs text-white/60 mb-4">Need custom solutions or have specific requirements? Contact our team.</p>
                  <Button variant="secondary" className="w-full">Open Contact Form</Button>
                </div>
                <div className="hidden md:block">
                  <ArrowRight size={32} className="text-white/10" />
                </div>
              </div>
            </Panel>
          </div>
        </div>
      );
    }

    if (currentPage === 5) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Suppliers List & New Supplier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <Panel title="Suppliers" rightElement={<Button variant="secondary" className="p-1 h-6 w-6 flex items-center justify-center"><Plus size={14}/></Button>}>
                <div className="flex flex-col gap-2">
                  {SAMPLE_SUPPLIERS.map(s => (
                    <div key={s.id} className="p-3 bg-white/5 border border-white/10 rounded hover:border-brand/40 transition-colors cursor-pointer flex justify-between items-center">
                      <div>
                        <p className="text-xs uppercase tracking-wider">{s.name}</p>
                        <p className="text-[10px] text-white/40">{s.contactName}</p>
                      </div>
                      <ChevronRight size={14} className="text-white/20" />
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
            <div className="lg:col-span-8">
              <Panel title="New Supplier">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-0">
                  <Input label="Company Name" />
                  <Input label="Contact Name" />
                  <Input label="Email" />
                  <Input label="Phone" />
                  <div className="md:col-span-2">
                    <Input label="Address" />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="w-full md:w-48"><Save size={14} className="mr-2"/> Save Supplier</Button>
                </div>
              </Panel>
            </div>
          </div>

          {/* Row 2: Add Solutions & History */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <Panel title="Add Solutions Contact">
                <div className="space-y-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Direct Inquiry</p>
                  <Input label="Subject" />
                  <Input label="Message" />
                  <Button className="w-full">Send Inquiry</Button>
                </div>
              </Panel>
            </div>
            <div className="lg:col-span-4">
              <Panel title="Quotations History">
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-3 bg-white/2 border-b border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs">Product {i}</p>
                        <p className="text-[10px] text-white/40">2026-04-0{i}</p>
                      </div>
                      <span className="text-xs font-mono">€{i},500</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
            <div className="lg:col-span-4">
              <Panel title="Orders History">
                <div className="space-y-2">
                  {[1, 2].map(i => (
                    <div key={i} className="p-3 bg-white/2 border-b border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs">Order #00{i}</p>
                        <p className="text-[10px] text-white/40">2026-03-2{i}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-brand border border-brand/20 px-2 py-1 rounded">Shipped</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 6) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Orders Tracking (Full Width) */}
          <Panel title="Orders Tracking">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase text-brand">Lincoln Navigator</p>
                    <p className="text-xs">ABS Connector 1 & 2</p>
                  </div>
                  <span className="text-[10px] uppercase bg-white/10 px-3 py-1 rounded tracking-widest">Breakoutbox</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-brand" />
                  </div>
                  <span className="text-[10px] uppercase text-brand">Ordered</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[8px] uppercase px-2 py-1 rounded bg-brand text-black">Ordered</span>
                  <span className="text-[8px] uppercase px-2 py-1 rounded bg-white/10">Confirmed</span>
                  <span className="text-[8px] uppercase px-2 py-1 rounded bg-white/10">Shipped</span>
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase text-brand">Nissan Qashqai</p>
                    <p className="text-xs">Engine Connector 1</p>
                  </div>
                  <span className="text-[10px] uppercase bg-white/10 px-3 py-1 rounded tracking-widest">Cloom Tech</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-brand" />
                  </div>
                  <span className="text-[10px] uppercase text-brand">Confirmed</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[8px] uppercase px-2 py-1 rounded bg-brand text-black">Ordered</span>
                  <span className="text-[8px] uppercase px-2 py-1 rounded bg-brand text-black">Confirmed</span>
                  <span className="text-[8px] uppercase px-2 py-1 rounded bg-white/10">Shipped</span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Row 2: Status Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Status: Ordered">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand border border-brand/20">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest">Awaiting Confirmation</p>
                    <p className="text-[10px] text-white/40">Order placed on 2026-04-05</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-[10px] text-white/40 uppercase">Total Price</p><p className="text-sm">€2,500</p></div>
                    <div><p className="text-[10px] text-white/40 uppercase">Lead Time</p><p className="text-sm">60 Days</p></div>
                  </div>
                  <div className="p-3 bg-black/40 rounded border border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest">Status</span>
                    <span className="text-[10px] text-brand">Pending</span>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel title="Status: Confirmed">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand border border-brand/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest">Order Confirmed</p>
                    <p className="text-[10px] text-white/40">Confirmed on 2026-04-08</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Shipping Timeline</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase text-white/40">Confirmed Status</span>
                      <div className="w-4 h-4 rounded-full bg-brand border border-brand/20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-white/5 rounded text-center">
                      <p className="text-[8px] text-white/40 uppercase mb-1">Initial</p>
                      <p className="text-[10px]">06-05</p>
                    </div>
                    <div className="p-2 bg-brand/10 rounded text-center border border-brand/20">
                      <p className="text-[8px] text-brand uppercase mb-1">Expected</p>
                      <p className="text-[10px]">06-10</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded text-center">
                      <p className="text-[8px] text-white/40 uppercase mb-1">Actual</p>
                      <p className="text-[10px]">--</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full text-[10px]">View Shipping Docs</Button>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      );
    }
  };

  const renderSupplierView = () => {
    if (currentPage === 7) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Requests & Sent List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Requests Received">
              <div className="flex gap-4 overflow-x-auto pb-2">
                <div className="min-w-[280px] p-4 bg-brand/5 border border-brand/20 rounded flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-brand">Lincoln ABS</p>
                    <p className="text-xs">Connector 1</p>
                  </div>
                  <Button className="text-[10px] py-1 px-4">To Quote</Button>
                </div>
              </div>
            </Panel>
            <Panel title="Quotations Sent">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {['Nissan Engine Con 1', 'Lincoln ABS Con 2'].map((item, i) => (
                  <div key={i} className="min-w-[240px] p-3 bg-white/5 border border-white/10 rounded flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-white/40">{item}</p>
                      <p className="text-xs">€{i+1},200</p>
                    </div>
                    <Button variant="secondary" className="text-[8px] py-1 px-2">Edit</Button>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Row 2: Quotation Form & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <Panel title="Quotation Form: Lincoln Con 1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Price" type="number" placeholder="0.00" />
                      <Select label="Currency" options={[{value: 'eur', label: 'EUR (€)'}, {value: 'usd', label: 'USD ($)'}]} />
                    </div>
                    <Input label="Lead Time (Days)" type="number" placeholder="60" />
                    <div className="p-4 border border-dashed border-white/10 rounded text-center bg-black/20">
                      <FileText size={24} className="mx-auto mb-2 text-white/20" />
                      <p className="text-[10px] uppercase tracking-widest text-white/40">Upload Quotation PDF</p>
                      <Button variant="secondary" className="mt-2 text-[10px]">Select File</Button>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setCurrentPage(8)}>Send Quotation <ArrowRight size={14} className="ml-2"/></Button>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Connector Assets</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-video bg-black/40 rounded border border-white/5 flex items-center justify-center"><ImageIcon size={20} className="text-white/20"/></div>
                      <div className="aspect-video bg-black/40 rounded border border-white/5 flex items-center justify-center"><ImageIcon size={20} className="text-white/20"/></div>
                    </div>
                    <div className="space-y-1">
                      <Button variant="secondary" className="w-full text-[10px] justify-start"><Download size={12} className="mr-2"/> Wiring Diagram</Button>
                      <Button variant="secondary" className="w-full text-[10px] justify-start"><Download size={12} className="mr-2"/> Pinning List</Button>
                      <Button variant="secondary" className="w-full text-[10px] justify-start"><Download size={12} className="mr-2"/> ECU Label</Button>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
            <div className="lg:col-span-5">
              <Panel title="Connector Assets">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="aspect-video bg-black/40 rounded border border-white/5 flex items-center justify-center"><ImageIcon size={20} className="text-white/20"/></div>
                  <div className="aspect-video bg-black/40 rounded border border-white/5 flex items-center justify-center"><ImageIcon size={20} className="text-white/20"/></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-[10px] uppercase">Wiring</span>
                    <Download size={14} className="text-brand cursor-pointer" />
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-[10px] uppercase">Pinning</span>
                    <Download size={14} className="text-brand cursor-pointer" />
                  </div>
                </div>
                <Button variant="secondary" className="w-full mt-4 text-[10px]">Download All</Button>
              </Panel>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 8) {
      return (
        <div className="flex flex-col gap-6 p-6 overflow-auto h-[calc(100vh-80px)]">
          {/* Row 1: Orders Received & Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <Panel title="Orders Received">
                <div className="space-y-2">
                  <div className="p-4 bg-brand/5 border border-brand/40 rounded flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-brand">Lincoln ABS Con 1</p>
                      <p className="text-xs">Confirmed</p>
                    </div>
                    <CheckCircle2 size={16} className="text-brand" />
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-white/40">Lincoln ABS Con 2</p>
                      <p className="text-xs">New Order</p>
                    </div>
                    <Button className="text-[10px] py-1 px-4">Confirm</Button>
                  </div>
                </div>
              </Panel>
            </div>
            <div className="lg:col-span-8">
              <Panel title="Order Detail: Connector 1">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 rounded border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase mb-1">Price</p>
                        <p className="text-xl font-mono">€2,500</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase mb-1">Lead Time</p>
                        <p className="text-xl font-mono">60 Days</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded border border-white/10 flex flex-col justify-center items-center">
                        <p className="text-[10px] text-white/40 uppercase mb-1">Confirmed</p>
                        <div className="w-4 h-4 rounded-full bg-brand border border-brand/20" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/40">Initial Shipping</p>
                          <p className="text-lg">2026-06-05</p>
                        </div>
                        <Clock size={24} className="text-white/10" />
                      </div>
                      <div className="p-4 bg-brand/5 border border-brand/20 rounded flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-brand">Expected Shipping</p>
                          <p className="text-lg">2026-06-10</p>
                        </div>
                        <Clock size={24} className="text-brand/40" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-64 flex flex-col gap-2 justify-center">
                    <Button className="w-full">Show Quotation</Button>
                    <Button variant="secondary" className="w-full">Download PDF</Button>
                  </div>
                </div>
              </Panel>
            </div>
          </div>

          {/* Row 2: Shipping Update & Assets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <Panel title="Update Shipping Date">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                  <div className="flex-1 w-full">
                    <p className="text-xs text-white/40 mb-4">Select a new shipping date if the initial estimate has changed. This will notify the manager.</p>
                    <Input label="New Shipping Date" type="date" />
                  </div>
                  <div className="w-full md:w-64 mb-4">
                    <Button className="w-full">Confirm New Date</Button>
                  </div>
                </div>
              </Panel>
            </div>
            <div className="lg:col-span-4">
              <Panel title="Assets: Connector 1">
                <div className="flex items-center gap-4 h-full">
                  <div className="w-20 h-20 bg-black/40 rounded border border-white/5 flex items-center justify-center">
                    <ImageIcon size={24} className="text-white/20" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/10">
                      <span className="text-[10px] uppercase">Docs</span>
                      <Download size={14} className="text-brand cursor-pointer" />
                    </div>
                    <Button variant="secondary" className="w-full text-[10px]">View All</Button>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-brand selection:text-black">
      {renderHeader()}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${role}-${currentPage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {role === 'CLIENT' && renderClientView()}
            {role === 'MANAGER' && renderManagerView()}
            {role === 'SUPPLIER' && renderSupplierView()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Navigation Helper for Demo */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full z-50">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
          <button
            key={p}
            onClick={() => {
              setCurrentPage(p);
              if (p <= 2) setRole('CLIENT');
              else if (p <= 6) setRole('MANAGER');
              else setRole('SUPPLIER');
            }}
            className={`w-8 h-8 rounded-full text-[10px] transition-all flex items-center justify-center ${currentPage === p ? 'bg-brand text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
