import "css!./Main.css";
import { PDFJSViewer } from "pdfjs-dist/web/pdf_viewer";
import * as PDFJSWorker from "pdfjs-dist/build/pdf.worker";

export class Main {
  constructor() {
    PDFJSViewer.workerSrc = PDFJSWorker;

    let container = $(`#pdf-container`);
    let pdfLinkService = new PDFJSViewer.PDFLinkService();
    let pdfViewer = this.getPdfViewer(container[0], pdfLinkService);

    pdfLinkService.setViewer(pdfViewer);

    this.onPdfInit(container, pdfViewer);
    this.loadPdfDocument(pdfViewer, pdfLinkService);
  }

  private getPdfViewer(container: HTMLElement, pdfLinkService: PDFJSViewer.PDFLinkService): PDFJSViewer.PDFViewer {
    return new PDFJSViewer.PDFViewer({
      container: container,
      linkService: pdfLinkService,
    });
  }

  private onPdfInit(container: JQuery<HTMLElement>, pdfViewer: PDFJSViewer.PDFViewer): any {
    container.on('pagesinit', () => {
      pdfViewer.currentScaleValue = 'page-width';
    });
  }

  private loadPdfDocument(pdfViewer: PDFJSViewer.PDFViewer, pdfLinkService: PDFJSViewer.PDFLinkService): void {
    PDFJSViewer.getDocument("pdf-sample.pdf").then(pdfDocument => {
      pdfViewer.setDocument(pdfDocument);
      pdfLinkService.setDocument(pdfDocument, null);
    });
  }
}

let instance;
export function initialize(obj: any) {
  if (!instance) instance = new Main();
  return instance;
}

export default Main;
