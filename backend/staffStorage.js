class StaffStorage {
  constructor() {
    this.staff = [];
  }

  createStaff(name, email, phone, address) {
    if (!name || !email || !phone || !address) {
      return { success: false, message: 'All fields are required' };
    }

    const existingStaff = this.staff.find(s => s.email === email);
    if (existingStaff) {
      return { success: false, message: 'Staff with this email already exists' };
    }

    const member = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      address,
      createdAt: new Date()
    };
    this.staff.pushmember();
    return { success: true, staff: member };
  }

  listStaff() {
    return { success: true, staff: [...this.staff] };
  }

  updateStaff(id, updates) {
    const index = this.staff.findIndex(s => s.id === id);
    if (index === -1) {
      return { success: false, message: 'Staff member not found' };
    }
    const current = this.staff[index];
    const updated = { ...current, ...updates };
    this.staff[index] = updated;
    return { success: true, staff: updated };
  }

  deleteStaff(id) {
    const index = this.staff.findIndex(s => s.id === id);
    if (index === -1) {
      return { success: false, message: 'Staff member not found' };
    }
    const [removed] = this.staff.splice(index, 1);
    return { success: true, staff: removed };
  }
}

module.exports = new StaffStorage();

