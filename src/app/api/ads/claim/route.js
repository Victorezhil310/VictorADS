import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId, adId } = body;

    const rewardAmount = 2.50; // ₹2.50
    const rewardCoins = 250; // 250 Coins

    const transaction = {
      id: 'tx_ad_' + Math.random().toString(36).substr(2, 9),
      userId: userId || 'guest_user',
      adId: adId || 'sponsor_ad_1',
      rewardAmount: rewardAmount,
      rewardCoins: rewardCoins,
      status: 'Completed',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: `Successfully credited +${rewardCoins} Coins (₹${rewardAmount})!`,
      transaction: transaction
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to process ad claim.'
    }, { status: 500 });
  }
}
