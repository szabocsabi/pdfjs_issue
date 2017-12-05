declare var require: any;

declare module "ojs/*" {
  const content: any;
  export = content;
}

declare module "*.html" {
  const template: any;
  export = template;
}
