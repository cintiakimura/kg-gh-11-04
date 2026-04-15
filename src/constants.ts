import { Client, Vehicle, Connector, Supplier, Quotation, Order } from './types';

export const SAMPLE_CLIENTS: Client[] = [
  { id: 'c1', name: 'IMPERIAL VALLEY CC', email: 'contact@imperial.com', phone: '+1 555 0101', address: '123 Valley St, CA', vehicles: ['v1', 'v2'] },
  { id: 'c2', name: 'GARAC', email: 'info@garac.fr', phone: '+33 1 23 45 67 89', address: '45 Rue de Paris', vehicles: [] },
  { id: 'c3', name: 'IVY TECH CC', email: 'admin@ivytech.edu', phone: '+1 555 0202', address: '789 Tech Blvd, IN', vehicles: [] },
  { id: 'c4', name: 'CFA HENRI MARTIN', email: 'contact@cfa-henri.fr', phone: '+33 2 34 56 78 90', address: '12 Avenue Henri Martin', vehicles: [] },
];

export const SAMPLE_VEHICLES: Vehicle[] = [
  { 
    id: 'v1', 
    brand: 'Lincoln', 
    model: 'Navigator 3rd gen Ecoboost', 
    vin: '1LN...5678', 
    year: '2015', 
    fuel: 'Gasoline', 
    engineType: '3.5L V6',
    enginePower: '380 HP',
    engineCode: 'EcoBoost',
    transmissionType: 'Automatic',
    transmissionGears: '6',
    system: 'ABS' 
  },
  { 
    id: 'v2', 
    brand: 'Nissan', 
    model: 'Qashqai J11', 
    vin: 'SJN...1234', 
    year: '2018', 
    fuel: 'Diesel', 
    engineType: '1.6 dCi',
    enginePower: '130 HP',
    engineCode: 'R9M',
    transmissionType: 'Manual',
    transmissionGears: '6',
    system: 'Engine Management' 
  },
  { 
    id: 'v3', 
    brand: 'Renault', 
    model: 'Captur II', 
    vin: 'VF1...9012', 
    year: '2022', 
    fuel: 'Diesel', 
    engineType: '1.5 Blue dCi',
    enginePower: '115 HP',
    engineCode: 'K9K',
    transmissionType: 'EDC',
    transmissionGears: '7',
    system: 'ABS' 
  },
];

export const SAMPLE_CONNECTORS: Connector[] = [
  { 
    id: 'con1', 
    vehicleId: 'v1', 
    name: 'Connector 1', 
    photos: {}, 
    documentation: {
      wiringDiagram: 'WD-001.pdf',
      pinningList: 'PL-001.xlsx',
      ecuLabel: 'ECU-L-001.jpg'
    },
    mapGenerator: {
      pins: 'Car/Minifit/Sub-DB',
      twisting: 'Twisting and Shielding',
      wireDiameter: '0.5mm'
    },
    status: 'TO QUOTE',
    supplierId: 's1'
  },
  { 
    id: 'con2', 
    vehicleId: 'v1', 
    name: 'Connector 2', 
    photos: {}, 
    documentation: {},
    status: 'ORDERED',
    supplierId: 's1'
  }
];

export const SAMPLE_SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Breakoutbox', contactName: 'John Smith', email: 'sales@breakoutbox.com', phone: '+44 20 1234 5678', address: 'London, UK' },
  { id: 's2', name: 'OR Technocabos', contactName: 'Maria Silva', email: 'info@technocabos.pt', phone: '+351 21 000 0000', address: 'Lisbon, Portugal' },
  { id: 's3', name: 'Cloom Tech', contactName: 'Li Wei', email: 'contact@cloom.com', phone: '+86 10 8888 8888', address: 'Beijing, China' },
  { id: 's4', name: 'Add Solutions', contactName: 'Sarah Jones', email: 'info@addsolutions.de', phone: '+49 89 123456', address: 'Munich, Germany' },
];

export const SAMPLE_QUOTATIONS: Quotation[] = [
  { id: 'q1', connectorId: 'con1', supplierId: 's1', price: '2500', leadTime: '60', currency: '€', status: 'SENT', date: '2026-04-01' },
];

export const SAMPLE_ORDERS: Order[] = [
  { 
    id: 'o1', 
    vehicleId: 'v1', 
    connectorId: 'con1', 
    supplierId: 's1', 
    status: 'ORDERED', 
    price: '2500', 
    orderDate: '2026-04-05',
    shippingDateInitial: '2026-06-05',
    shippingDateCurrent: '2026-06-10'
  }
];
