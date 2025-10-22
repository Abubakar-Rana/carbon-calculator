import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ReportData {
  month: string;
  totalEmissions: number;
  scope1: number;
  scope2: number;
  scope3: number;
}

/**
 * Exports a full visual carbon report (with charts, styles, and summary)
 * as a high-quality A4 PDF file.
 */
export async function exportCarbonReport(
  elementId: string,
  data: ReportData
): Promise<void> {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`❌ Element with ID "${elementId}" not found.`);
    return;
  }

  try {
    // Scroll to top and wait for rendering (charts etc.)
    window.scrollTo(0, 0);
    await new Promise((res) => setTimeout(res, 500));

    // Capture element as high-res canvas
    const canvas = await html2canvas(input, {
      scale: 3, // higher = sharper PDF
      useCORS: true, // allow external images/fonts
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add more pages if the image is taller than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add a footer with metadata
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    const footerText = `CarbonBNU Emission Report — ${data.month} • Generated on ${new Date().toLocaleDateString()}`;
    pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: "center" });

    // Save file
    const filename = `Carbon_Report_${data.month.replace(/\s+/g, "_")}.pdf`;
    pdf.save(filename);

    console.log(`✅ Report successfully saved as ${filename}`);
  } catch (err) {
    console.error("⚠️ Failed to export report:", err);
  }
}
