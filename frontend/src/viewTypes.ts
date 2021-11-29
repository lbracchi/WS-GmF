import {
  DonationCreationPayload,
  Event,
  EventPayload,
  Family,
  FamilyPayload,
  Food,
  FoodPayload,
  Pack,
  PackPayload,
  SelectableFood,
} from "./types";

export interface CreateEventView {
  form: EventPayload;
  submitLabel: string;
}

export interface EventListView {
  events: Array<Event>;
  tableFields: Array<TableField>;
  deleteEventId: string;
}

export interface ReportFamilyView {
  form: FamilyPayload;
  submitLabel: string;
}

export interface CreateDonationView {
  form: DonationCreationPayload;
  submitLabel: string;
  isLocationLoaded: boolean;
}

export interface FoodManagerView {
  form: FoodPayload;
  foodList: Array<Food>;
  tableFields: Array<string>;
  availableLables: Array<{ text: string; value: string }>;
  reloadIndex: number;
}

export interface PackCreateView {
  showScreen: string;
  isPrinted: boolean;
  foodList: Array<SelectableFood>;
  family: Family;
  form: PackPayload;
}

export interface PackManagerView {
  view: string;
  packList: Array<Pack>;
  familyDetails?: Family;
  foodDetails?: Array<Food>;
  tableFields: Array<string>;
  deletePackId: string;
}

interface TableField {
  key: string;
  label: string;
  sortable: boolean;
  formatter?: any;
}

export interface FoodView {
  foodList: Array<Food>;
  tableFields: Array<TableField>;
  totalRows: number;
  currentPage: number;
  perPage: number;
  filter: string;
  filterOn: Array<string>;
  sortBy: string;
  sortDesc: false;
  sortDirection: "asc" | "desc";
  index: number;
  deleteFoodId: string;
}
