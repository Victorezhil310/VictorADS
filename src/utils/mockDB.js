// Client-side mock database using localStorage

const IS_SERVER = typeof window === 'undefined';

function getStorage(key, defaultValue) {
  if (IS_SERVER) return defaultValue;
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  try {
    return JSON.parse(item);
  } catch (e) {
    return defaultValue;
  }
}

function setStorage(key, value) {
  if (IS_SERVER) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const mockDB = {
  // Authentication
  register(username, email, password) {
    if (IS_SERVER) return { success: false, message: "Server error" };
    
    const users = getStorage('vads_users', []);
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase());
    
    if (userExists) {
      return { success: false, message: "Username or email already registered." };
    }
    
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      username,
      email,
      password,
      balance: 100.00, // Starter bonus ₹100!
      adsWatched: 0,
      dataSharedMB: 0,
      dataSoldMB: 0,
      dataBoughtMB: 0,
      subscriptionPlan: 'Free Tier',
      joinedDate: new Date().toLocaleDateString(),
    };
    
    users.push(newUser);
    setStorage('vads_users', users);
    setStorage('vads_current_user', newUser.id);
    return { success: true, user: newUser };
  },
  
  login(emailOrUsername, password) {
    if (IS_SERVER) return { success: false, message: "Server error" };
    
    const users = getStorage('vads_users', []);
    const user = users.find(u => 
      (u.email.toLowerCase() === emailOrUsername.toLowerCase() || u.username.toLowerCase() === emailOrUsername.toLowerCase()) && 
      u.password === password
    );
    
    if (!user) {
      return { success: false, message: "Invalid email/username or password." };
    }
    
    setStorage('vads_current_user', user.id);
    return { success: true, user };
  },
  
  logout() {
    if (IS_SERVER) return;
    localStorage.removeItem('vads_current_user');
  },
  
  getCurrentUser() {
    if (IS_SERVER) return null;
    const currentUserId = getStorage('vads_current_user', null);
    if (!currentUserId) return null;
    
    const users = getStorage('vads_users', []);
    const user = users.find(u => u.id === currentUserId);
    return user || null;
  },
  
  // Credit balance
  creditUser(amount, type, description) {
    if (IS_SERVER) return null;
    const currentUserId = getStorage('vads_current_user', null);
    if (!currentUserId) return null;
    
    const users = getStorage('vads_users', []);
    const userIdx = users.findIndex(u => u.id === currentUserId);
    if (userIdx === -1) return null;
    
    users[userIdx].balance = parseFloat((users[userIdx].balance + amount).toFixed(2));
    
    if (type === 'ad') {
      users[userIdx].adsWatched += 1;
    } else if (type === 'data') {
      users[userIdx].dataSharedMB = parseFloat((users[userIdx].dataSharedMB + amount * 10).toFixed(2));
    }
    
    setStorage('vads_users', users);
    
    const ledger = getStorage('vads_ledger_' + currentUserId, []);
    ledger.unshift({
      id: 'tx_' + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      type: type === 'ad' ? 'Ad Reward' : 'Bandwidth Earning',
      description: description || `Credited ₹${amount}`,
      amount: amount,
      status: 'Completed',
    });
    setStorage('vads_ledger_' + currentUserId, ledger);
    
    return users[userIdx];
  },
  
  // Data Marketplace: Sell / Buy Data
  listDataForSale(amountMB, pricePerMB) {
    if (IS_SERVER) return { success: false, message: "Server error" };
    const currentUserId = getStorage('vads_current_user', null);
    if (!currentUserId) return { success: false, message: "Not logged in" };

    const listings = getStorage('vads_data_listings', []);
    const users = getStorage('vads_users', []);
    const seller = users.find(u => u.id === currentUserId);

    const newListing = {
      id: 'list_' + Math.random().toString(36).substr(2, 9),
      sellerId: currentUserId,
      sellerName: seller ? seller.username : 'Anonymous User',
      amountMB: parseFloat(amountMB),
      pricePerMB: parseFloat(pricePerMB),
      totalPrice: parseFloat((amountMB * pricePerMB).toFixed(2)),
      createdDate: new Date().toLocaleString(),
      status: 'Active'
    };

    listings.unshift(newListing);
    setStorage('vads_data_listings', listings);
    return { success: true, listing: newListing };
  },

  getDataListings() {
    if (IS_SERVER) return [];
    return getStorage('vads_data_listings', []);
  },

  buyDataListing(listingId) {
    if (IS_SERVER) return { success: false, message: "Server error" };
    const currentUserId = getStorage('vads_current_user', null);
    if (!currentUserId) return { success: false, message: "Not logged in" };

    const listings = getStorage('vads_data_listings', []);
    const listingIdx = listings.findIndex(l => l.id === listingId && l.status === 'Active');
    if (listingIdx === -1) return { success: false, message: "Listing no longer available." };

    const listing = listings[listingIdx];
    const users = getStorage('vads_users', []);
    const buyerIdx = users.findIndex(u => u.id === currentUserId);
    const sellerIdx = users.findIndex(u => u.id === listing.sellerId);

    if (buyerIdx === -1) return { success: false, message: "Buyer profile not found." };
    if (users[buyerIdx].balance < listing.totalPrice) {
      return { success: false, message: `Insufficient balance. You need ₹${listing.totalPrice} to buy this data package.` };
    }

    // Process trade
    const totalPrice = listing.totalPrice;
    const adminCommission = parseFloat((totalPrice * 0.10).toFixed(2)); // 10% platform survival fee
    const sellerNetEarnings = parseFloat((totalPrice - adminCommission).toFixed(2));

    // Deduct from buyer
    users[buyerIdx].balance = parseFloat((users[buyerIdx].balance - totalPrice).toFixed(2));
    users[buyerIdx].dataBoughtMB += listing.amountMB;

    // Credit seller if exists
    if (sellerIdx !== -1) {
      users[sellerIdx].balance = parseFloat((users[sellerIdx].balance + sellerNetEarnings).toFixed(2));
      users[sellerIdx].dataSoldMB += listing.amountMB;
    }

    // Mark listing sold
    listings[listingIdx].status = 'Sold';
    setStorage('vads_data_listings', listings);
    setStorage('vads_users', users);

    // Record ledger entries
    const buyerLedger = getStorage('vads_ledger_' + currentUserId, []);
    buyerLedger.unshift({
      id: 'tx_' + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      type: 'Data Purchase',
      description: `Bought ${listing.amountMB}MB Data from ${listing.sellerName}`,
      amount: -totalPrice,
      status: 'Completed',
    });
    setStorage('vads_ledger_' + currentUserId, buyerLedger);

    if (sellerIdx !== -1) {
      const sellerLedger = getStorage('vads_ledger_' + listing.sellerId, []);
      sellerLedger.unshift({
        id: 'tx_' + Math.random().toString(36).substr(2, 9),
        date: new Date().toLocaleString(),
        type: 'Data Sale Earnings',
        description: `Sold ${listing.amountMB}MB Data (Net after 10% platform fee)`,
        amount: sellerNetEarnings,
        status: 'Completed',
      });
      setStorage('vads_ledger_' + listing.sellerId, sellerLedger);
    }

    // Log admin survival earnings
    const adminStats = getStorage('vads_admin_stats', { totalCommissionEarned: 0, totalDonations: 0 });
    adminStats.totalCommissionEarned = parseFloat((adminStats.totalCommissionEarned + adminCommission).toFixed(2));
    setStorage('vads_admin_stats', adminStats);

    return { success: true, updatedUser: users[buyerIdx] };
  },

  // Record UPI Donation
  recordDonation(amount, utrTransactionId) {
    if (IS_SERVER) return { success: false, message: "Server error" };
    const currentUserId = getStorage('vads_current_user', null);
    
    const donations = getStorage('vads_donations', []);
    const newDonation = {
      id: 'don_' + Math.random().toString(36).substr(2, 9),
      userId: currentUserId || 'guest',
      amount: parseFloat(amount),
      utrTransactionId: utrTransactionId,
      date: new Date().toLocaleString(),
      status: 'Verified'
    };

    donations.unshift(newDonation);
    setStorage('vads_donations', donations);

    const adminStats = getStorage('vads_admin_stats', { totalCommissionEarned: 0, totalDonations: 0 });
    adminStats.totalDonations = parseFloat((adminStats.totalDonations + parseFloat(amount)).toFixed(2));
    setStorage('vads_admin_stats', adminStats);

    return { success: true, donation: newDonation };
  },

  // Subscriptions Upgrade
  upgradeSubscription(planId, planName, price) {
    if (IS_SERVER) return { success: false, message: "Server error" };
    const currentUserId = getStorage('vads_current_user', null);
    if (!currentUserId) return { success: false, message: "Not logged in" };

    const users = getStorage('vads_users', []);
    const userIdx = users.findIndex(u => u.id === currentUserId);
    if (userIdx === -1) return { success: false, message: "User not found" };

    if (users[userIdx].balance < price) {
      return { success: false, message: `Insufficient balance. Upgrade requires ₹${price}.` };
    }

    users[userIdx].balance = parseFloat((users[userIdx].balance - price).toFixed(2));
    users[userIdx].subscriptionPlan = planName;
    setStorage('vads_users', users);

    const ledger = getStorage('vads_ledger_' + currentUserId, []);
    ledger.unshift({
      id: 'tx_' + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      type: 'Subscription Upgrade',
      description: `Activated ${planName}`,
      amount: -price,
      status: 'Completed',
    });
    setStorage('vads_ledger_' + currentUserId, ledger);

    return { success: true, updatedUser: users[userIdx] };
  },

  // Withdrawals
  requestWithdrawal(amount, method, details) {
    if (IS_SERVER) return { success: false, message: "Server error" };
    
    const currentUserId = getStorage('vads_current_user', null);
    if (!currentUserId) return { success: false, message: "Not logged in" };
    
    const users = getStorage('vads_users', []);
    const userIdx = users.findIndex(u => u.id === currentUserId);
    if (userIdx === -1) return { success: false, message: "User not found" };
    
    if (users[userIdx].balance < amount) {
      return { success: false, message: "Insufficient balance." };
    }
    
    users[userIdx].balance = parseFloat((users[userIdx].balance - amount).toFixed(2));
    setStorage('vads_users', users);
    
    const ledger = getStorage('vads_ledger_' + currentUserId, []);
    const withdrawalTx = {
      id: 'wd_' + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      type: 'Withdrawal',
      description: `Withdrawal via ${method.toUpperCase()} (${details.upiId || details.accountNo})`,
      amount: -amount,
      status: 'Pending',
      details: details,
    };
    
    ledger.unshift(withdrawalTx);
    setStorage('vads_ledger_' + currentUserId, ledger);
    
    return { success: true, tx: withdrawalTx, updatedUser: users[userIdx] };
  },
  
  getTransactions() {
    if (IS_SERVER) return [];
    const currentUserId = getStorage('vads_current_user', null);
    if (!currentUserId) return [];
    return getStorage('vads_ledger_' + currentUserId, []);
  },

  getAdminStats() {
    if (IS_SERVER) return { totalCommissionEarned: 0, totalDonations: 0 };
    return getStorage('vads_admin_stats', { totalCommissionEarned: 0, totalDonations: 0 });
  },
  
  saveContactMessage(name, email, subject, message) {
    if (IS_SERVER) return;
    const contacts = getStorage('vads_contacts', []);
    contacts.push({
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleString()
    });
    setStorage('vads_contacts', contacts);
  }
};
