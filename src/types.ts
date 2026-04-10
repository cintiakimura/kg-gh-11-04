import { LucideIcon } from 'lucide-react';

export type UserRole = 'CLIENT' | 'MANAGER' | 'SUPPLIER';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  vin: string;
  year: string;
  fuel: string;
  engineDetails: string;
  system: string;
}

export interface Connector {
  id: string;
  vehicleId: string;
  name: string;
  photos: {
    femaleFront?: string;
    femaleSide?: string;
    maleFront?: string;
    maleSide?: string;
    ecuLabel?: string;
  };
  documentation: {
    wiringDiagram?: string;
    pinningList?: string;
  };
  status?: string;
  supplierId?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicles: string[]; // IDs
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Quotation {
  id: string;
  connectorId: string;
  supplierId: string;
  price: string;
  leadTime: string;
  currency: string;
  pdfUrl?: string;
  status: 'PENDING' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  date: string;
}

export interface Order {
  id: string;
  vehicleId: string;
  connectorId: string;
  supplierId: string;
  status: 'ORDERED' | 'CONFIRMED' | 'SHIPPED';
  price: string;
  orderDate: string;
  confirmationDate?: string;
  shippingDateInitial?: string;
  shippingDateCurrent?: string;
  shippingDateActual?: string;
}
