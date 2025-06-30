export interface Medicamento {
  CodMedicamento?: number;
  descripcionMed: string;
  fechaFabricacion?: string;
  fechaVencimiento?: string;
  Presentacion?: string;
  stock: number;
  precioVentaUni: number;
  precioVentaPres: number;
  Marca?: string;
}

export interface DetalleOrden {
  CodOrdenCompra: number;
  CodMedicamento: number;
  descripcion?: string;
  cantidad: number;
  precio: number;
  montoPres?: number;
}