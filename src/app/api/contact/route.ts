import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // In a real app, you would integrate Resend here:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });

    // For now, simulate a successful API call
    console.log(`Received message from ${name} (${email}): ${message}`);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
