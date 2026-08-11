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
      password, // Plain text for mock demo
      balance: 100.00, // Starter bonus of ₹100!
      adsWatched: 0,
      dataSharedMB: 0,
      joinedDate: new Date().toLocaleDateString(),
    };
    
    users.push(newUser);
    setStorage('vads_users', users);
    
    // Log the user in automatically
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
  
  // Update stats
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
      users[userIdx].dataSharedMB = parseFloat((users[userIdx].dataSharedMB + amount * 10).toFixed(2)); // 10MB per unit
    }
    
    setStorage('vads_users', users);
    
    // Save transaction log
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
    
    // Deduct balance
    users[userIdx].balance = parseFloat((users[userIdx].balance - amount).toFixed(2));
    setStorage('vads_users', users);
    
    // Record withdrawal transaction
    const ledger = getStorage('vads_ledger_' + currentUserId, []);
    const withdrawalTx = {
      id: 'wd_' + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
      type: 'Withdrawal',
      description: `Withdrawal via ${method.toUpperCase()} (${details.upiId || details.accountNo})`,
      amount: -amount,
      status: 'Pending', // Will display as Pending, making it feel real!
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
