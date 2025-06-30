/**
 * Tipo de Medicamento - Categoría/clasificación de medicamentos
 */
export interface TipoMedicamento {
  CodTipoMed?: number;
  descripcionTipo: string;
  categoria?: string;
  // Relaciones opcionales (cuando vienen del backend con includes)
  medicamentos?: Medicamento[];
}

/**
 * Medicamento - Producto farmacéutico
 */
export interface Medicamento {
  CodMedicamento?: number;
  descripcionMed: string;
  fechaFabricacion?: string;
  fechaVencimiento?: string;
  Presentacion?: string;
  stock: number;
  precioVentaUni: number;
  precioVentaPres?: number;
  CodTipoMed?: number;
  Marca?: string;
  // Relaciones opcionales
  tipoMedicamento?: TipoMedicamento;
  recetas?: Receta[];
}

/**
 * Médico - Profesional de la salud autorizado
 */
export interface Medico {
  CodMedico?: number;
  nombre: string;
  apellido: string;
  especialidad?: string;
  numeroColegioMedico: string;
  telefono?: string;
  email?: string;
  estado?: string; // 'activo' | 'inactivo'
  // Relaciones opcionales
  recetas?: Receta[];
}

/**
 * Receta - Prescripción médica (como una "boleta")
 */
export interface Receta {
  CodReceta?: number;
  CodMedico: number;
  CodMedicamento: number;
  nombrePaciente: string;
  apellidoPaciente: string;
  fechaEmision?: string;
  cantidad: number;
  dosificacion?: string;
  instrucciones?: string;
  precioUnitario: number;
  subtotal?: number;
  estado?: string; // 'pendiente' | 'entregado' | 'cancelado'
  // Relaciones opcionales
  medico?: Medico;
  medicamento?: Medicamento;
}

// =================================================================================
// TIPOS PARA FORMULARIOS Y OPERACIONES
// =================================================================================

/**
 * Datos para crear/actualizar tipo de medicamento
 */
export interface TipoMedicamentoFormData {
  descripcionTipo: string;
  categoria?: string;
}

/**
 * Datos para crear/actualizar medicamento
 */
export interface MedicamentoFormData {
  descripcionMed: string;
  fechaFabricacion?: string;
  fechaVencimiento?: string;
  Presentacion?: string;
  stock: number;
  precioVentaUni: number;
  precioVentaPres?: number;
  CodTipoMed?: number;
  Marca?: string;
}

/**
 * Datos para crear/actualizar médico
 */
export interface MedicoFormData {
  nombre: string;
  apellido: string;
  especialidad?: string;
  numeroColegioMedico: string;
  telefono?: string;
  email?: string;
  estado?: string;
}

/**
 * Datos para crear/actualizar receta
 */
export interface RecetaFormData {
  CodMedico: number;
  CodMedicamento: number;
  nombrePaciente: string;
  apellidoPaciente: string;
  cantidad: number;
  dosificacion?: string;
  instrucciones?: string;
  precioUnitario: number;
  estado?: string;
}

// =================================================================================
// TIPOS PARA RESPUESTAS DE API
// =================================================================================

/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Respuesta paginada
 */
export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Respuesta de error de la API
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// =================================================================================
// TIPOS PARA ESTADÍSTICAS Y REPORTES
// =================================================================================

/**
 * Estadísticas de medicamentos
 */
export interface MedicamentoStats {
  total: number;
  stockAlto: number;
  stockMedio: number;
  stockBajo: number;
  valorTotal: number;
  tiposUnicos: number;
}

/**
 * Estadísticas de médicos
 */
export interface MedicoStats {
  total: number;
  activos: number;
  inactivos: number;
  especialidades: number;
}

/**
 * Estadísticas de recetas
 */
export interface RecetaStats {
  total: number;
  pendientes: number;
  entregadas: number;
  canceladas: number;
  valorTotal: number;
}

/**
 * Estadísticas de tipos de medicamento
 */
export interface TipoMedicamentoStats {
  total: number;
  conCategoria: number;
  categoriasUnicas: number;
  medicamentosVinculados: number;
}

// =================================================================================
// TIPOS PARA FILTROS Y BÚSQUEDAS
// =================================================================================

/**
 * Filtros para medicamentos
 */
export interface MedicamentoFilters {
  search?: string;
  tipoMedicamento?: string;
  stockLevel?: 'alto' | 'medio' | 'bajo';
  marca?: string;
  vencimiento?: 'proximo' | 'vencido';
}

/**
 * Filtros para médicos
 */
export interface MedicoFilters {
  search?: string;
  especialidad?: string;
  estado?: 'activo' | 'inactivo';
}

/**
 * Filtros para recetas
 */
export interface RecetaFilters {
  search?: string;
  estado?: 'pendiente' | 'entregado' | 'cancelado';
  medico?: number;
  medicamento?: number;
  fechaInicio?: string;
  fechaFin?: string;
}

/**
 * Filtros para tipos de medicamento
 */
export interface TipoMedicamentoFilters {
  search?: string;
  categoria?: string;
}

// =================================================================================
// TIPOS PARA PROPS DE COMPONENTES
// =================================================================================

/**
 * Props base para componentes de tarjetas
 */
export interface BaseCardProps<T> {
  item: T;
  onDelete: (id: number) => void;
  onEdit?: (item: T) => void;
}

/**
 * Props base para componentes de formularios
 */
export interface BaseFormProps<T> {
  item?: T;
  onSubmit: (data: T) => void;
  onCancel: () => void;
  isEditing?: boolean;
  loading?: boolean;
}

/**
 * Props para componentes de lista
 */
export interface BaseListProps<T> {
  items: T[];
  loading?: boolean;
  onDelete: (id: number) => void;
  onEdit?: (item: T) => void;
  onAdd?: () => void;
}

// =================================================================================
// ENUMS Y CONSTANTES
// =================================================================================

/**
 * Estados posibles de recetas
 */
export enum EstadoReceta {
  PENDIENTE = 'pendiente',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado'
}

/**
 * Estados posibles de médicos
 */
export enum EstadoMedico {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo'
}

/**
 * Niveles de stock
 */
export enum NivelStock {
  ALTO = 'alto',      // > 20
  MEDIO = 'medio',    // 6-20
  BAJO = 'bajo'       // <= 5
}

/**
 * Categorías predefinidas de tipos de medicamento
 */
export const CATEGORIAS_MEDICAMENTO = [
  'Analgésicos y Antipiréticos',
  'Antibióticos',
  'Antiinflamatorios',
  'Antihistamínicos',
  'Medicamentos Cardiovasculares',
  'Medicamentos del Sistema Nervioso',
  'Medicamentos Respiratorios',
  'Medicamentos Gastrointestinales',
  'Vitaminas y Suplementos',
  'Medicamentos Dermatológicos',
  'Medicamentos Endocrinos',
  'Medicamentos Oftálmicos',
  'Otros'
] as const;

/**
 * Especialidades médicas comunes
 */
export const ESPECIALIDADES_MEDICAS = [
  'Medicina General',
  'Medicina Interna',
  'Pediatría',
  'Cardiología',
  'Dermatología',
  'Ginecología',
  'Neurología',
  'Psiquiatría',
  'Oftalmología',
  'Otorrinolaringología',
  'Traumatología',
  'Urología',
  'Oncología',
  'Endocrinología',
  'Gastroenterología',
  'Neumología',
  'Nefrología',
  'Reumatología',
  'Infectología',
  'Geriatría'
] as const;

// =================================================================================
// TIPOS AUXILIARES
// =================================================================================

/**
 * Tipo para opciones de select
 */
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/**
 * Tipo para configuración de tabla/lista
 */
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

/**
 * Tipo para configuración de paginación
 */
export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

/**
 * Tipo para configuración de notificaciones/toast
 */
export interface ToastConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

// =================================================================================
// TIPOS PARA VALIDACIÓN
// =================================================================================

/**
 * Errores de validación de formulario
 */
export interface FormValidationErrors {
  [key: string]: string | undefined;
}

/**
 * Estado de validación de campo
 */
export interface FieldValidation {
  isValid: boolean;
  error?: string;
}

/**
 * Configuración de validación de campo
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

// =================================================================================
// EXPORTACIONES POR DEFECTO (para compatibilidad con código existente)
// =================================================================================

// Mantenemos las exportaciones originales para no romper código existente
export interface DetalleOrden {
  CodOrdenCompra: number;
  CodMedicamento: number;
  descripcion?: string;
  cantidad: number;
  precio: number;
  montoPres?: number;
}