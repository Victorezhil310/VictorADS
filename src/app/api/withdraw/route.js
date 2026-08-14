import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { amount, method, upiId, accountNo, ifscCode } = body;

    if (!amount || parseFloat(amount) <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Please specify a valid withdrawal amount.'
      }, { status: 400 });
    }

    if (method === 'upi' && (!upiId || !upiId.includes('@'))) {
      return NextResponse.json({
        success: false,
        message: 'Invalid UPI VPA ID provided.'
      }, { status: 400 });
    }

    const withdrawalTx = {
      id: 'wd_' + Math.random().toString(36).substr(2, 9),
      amount: parseFloat(amount),
      method: method || 'upi',
      destination: method === 'upi' ? upiId : `Bank Account: ${accountNo} (IFSC: ${ifscCode})`,
      status: 'Queued for Instant Settlement',
      date: new Date().toLocaleString()
    };

    return NextResponse.json({
      success: true,
      message: `Withdrawal request of ₹${amount} queued successfully for ${withdrawalTx.destination}`,
      transaction: withdrawalTx
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error processing withdrawal.'
    }, { status: 500 });
  }
}
