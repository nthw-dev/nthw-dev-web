// src/app/api/resume/generate-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Configure Chromium for Vercel
chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function POST(req: NextRequest) {
  let browser;
  
  try {
    const isDev = process.env.NODE_ENV != 'production';
    
    console.log('🚀 Starting PDF generation...', { isDev });
    
    // Launch Puppeteer browser with different configs for dev/prod
    browser = await puppeteer.launch({
      args: isDev ? ['--no-sandbox'] : [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: isDev 
        ? process.platform === 'win32'
          ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          : process.platform === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : '/usr/bin/google-chrome'
        : await chromium.executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
    });

    console.log('✅ Browser launched successfully');

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 2,
    });

    // Get the base URL from the request
    const baseUrl = req.nextUrl.origin;
    const targetUrl = `${baseUrl}/resume/cv-preview`;
    
    console.log('🌐 Navigating to:', targetUrl);
    
    // Navigate to the CV page with extended timeout
    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
      timeout: isDev ? 10000 : 30000,
    });

    console.log('📄 Page loaded, waiting for fonts...');

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    // Additional wait to ensure everything is rendered
    await page.waitForTimeout(2000);

    console.log('🎨 Generating PDF...');

    // Generate PDF with A4 settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });

    console.log('✅ PDF generated successfully', { size: pdfBuffer.length });

    // Return PDF as response
    // Node's Buffer isn't a valid BodyInit under this project's stricter
    // TypeScript config; hand the response a plain byte view instead.
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Resume_Natthawat_Narin.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        message: error instanceof Error ? error.message : 'Unknown error',
        isDev: process.env.NODE_ENV != 'production'
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Browser closed');
    }
  }
}

// Add OPTIONS method for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}