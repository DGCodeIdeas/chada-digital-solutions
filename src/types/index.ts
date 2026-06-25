export interface NavItem {
  href: string;
  text: string;
}

export interface CTAButton {
  href: string;
  text: string;
  primary: boolean;
}

export interface HeroData {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctas: CTAButton[];
}

export interface ClientType {
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
  badge: string;
  clients: ClientType[];
}

export interface Link {
  href: string;
  text: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  link: Link;
}

export interface ServicesData {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  services: Service[];
}

export interface Project {
  href: string;
  alt: string;
  image: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  button: Link & { id: string };
  featured: Project[];
}

export interface Product {
  icon: string;
  title: string;
  description: string;
  link: Link;
}

export interface ProductsData {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  products: Product[];
}

export interface ContactInfo {
  label: string;
  value: string;
  icon: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  rows?: number;
}

export interface FormConfig {
  action: string;
  method: string;
  fields: FormField[];
  submitText: string;
}

export interface ContactData {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  info: ContactInfo[];
  socials: SocialLink[];
  form: FormConfig;
}

export interface FooterColumn {
  title: string;
  links: Link[];
}

export interface FooterData {
  company: string;
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
}

export interface ModalData {
  badge: string;
  title: string;
  projects: Project[];
}

export interface SchemaAddress {
  locality: string;
  country: string;
}

export interface SchemaOpeningHours {
  days: string[];
  opens: string;
  closes: string;
}

export interface SchemaContact {
  type: string;
  language: string;
}

export interface SchemaData {
  address: SchemaAddress;
  openingHours: SchemaOpeningHours;
  contact: SchemaContact;
}

export interface SiteSettings {
  name: string;
  url: string;
  logo: string;
  ogImage: string;
  slogan: string;
  author: string;
  copyright: string;
  themeColor: string;
  locale: string;
  priceRange: string;
  areaServed: string;
  schema: SchemaData;
}

export interface Error404Data {
  code: string;
  title: string;
  message: string;
  button: Link;
}

export interface SiteData {
  settings: SiteSettings;
  nav: NavItem[];
  hero: HeroData;
  about: AboutData;
  services: ServicesData;
  portfolio: PortfolioData;
  products: ProductsData;
  contact: ContactData;
  footer: FooterData;
  modal: ModalData;
  404: Error404Data;
}
