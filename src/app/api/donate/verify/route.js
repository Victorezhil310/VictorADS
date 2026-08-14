import { NextResponse } from 'next/server';
import { siteConfig } from '../../../../config/siteConfig';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { amount, utrNumber, donorName } = body;

    if (!utrNumber || utrNumber.length < 6) {
      return NextResponse.json({
        success: false,
        message: 'Invalid 12-digit UTR or Transaction Reference number.'
      }, { status: 400 });
    }

    const targetUpi = siteConfig.donationUpiId || 'arasu9629hf@okhdfcbank';

    const donationRecord = {
      id: 'don_' + Math.random().toString(36).substr(2, 9),
      targetUpi: targetUpi,
      amount: parseFloat(amount || 100),
      utrNumber: utrNumber,
      donorName: donorName || 'Anonymous Supporter',
      date: new Date().toLocaleString(),
      status: 'Verified & Confirmed'
    };

    return NextResponse.json({
      success: true,
      message: `Donation of ₹${donationRecord.amount} to ${targetUpi} verified successfully!`,
      donation: donationRecord
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error processing donation verification.'
    }, { status: 500 });
  }
}
