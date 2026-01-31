import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, device, issue } = body;

    // Validate required fields
    if (!name || !email || !phone || !device || !issue) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // For now, we'll use Resend (popular choice for Next.js)
    // Install with: npm install resend
    // You'll need to add RESEND_API_KEY to your .env.local
    
    // If you want to use a different service like SendGrid or Nodemailer,
    // you can replace this section with your preferred email service

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-email@example.com';

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // You'll need to verify your domain
        to: ADMIN_EMAIL,
        subject: `New Repair Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">New Device Repair Request</h2>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 10px 0;"><strong>Device:</strong> ${device}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #7c3aed;">Issue Description:</h3>
              <p style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #7c3aed; border-radius: 4px;">
                ${issue}
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from your Apple Device Repair website contact form.
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
