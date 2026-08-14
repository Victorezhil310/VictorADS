import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { voucherType, rupeeAmount, coinCost, targetDetails } = body;

    if (!voucherType || !rupeeAmount || !coinCost) {
      return NextResponse.json({
        success: false,
        message: 'Invalid request. Missing voucher configuration.'
      }, { status: 400 });
    }

    // Generate unique redeem voucher code based on type
    const randomCode = Math.random().toString(36).substr(2, 4).toUpperCase() + '-' +
                       Math.random().toString(36).substr(2, 4).toUpperCase() + '-' +
                       Math.random().toString(36).substr(2, 4).toUpperCase() + '-' +
                       Math.floor(1000 + Math.random() * 9000);

    let voucherTitle = 'Google Play Redeem Code';
    let codePrefix = 'GP';
    if (voucherType === 'amazon') {
      voucherTitle = 'Amazon Pay Gift Voucher';
      codePrefix = 'AMZ';
    } else if (voucherType === 'flipkart') {
      voucherTitle = 'Flipkart Gift Card';
      codePrefix = 'FLIP';
    } else if (voucherType === 'upi') {
      voucherTitle = 'Instant UPI Cash Transfer';
      codePrefix = 'UPI';
    }

    const fullVoucherCode = `${codePrefix}-${randomCode}`;

    const voucher = {
      id: 'vouch_' + Math.random().toString(36).substr(2, 9),
      type: voucherType,
      title: voucherTitle,
      rupeeAmount: parseFloat(rupeeAmount),
      coinCost: parseInt(coinCost, 10),
      code: fullVoucherCode,
      targetDetails: targetDetails || 'Official Payout Gateway',
      date: new Date().toLocaleString(),
      status: 'Active / Redeemed'
    };

    return NextResponse.json({
      success: true,
      message: `Successfully generated ${voucherTitle} for ₹${rupeeAmount}!`,
      voucher: voucher
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error processing voucher redemption.'
    }, { status: 500 });
  }
}
