import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.html',
  styleUrls: ['./team.css']
})
export class TeamManagement implements OnInit {
  selectedMember = 'All Members';
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;

  showAddModal = false;
  showEditModal = false;
  editingMember: any = null;
  newMember: any = { name: '', email: '', role: 'Editor', status: 'Active' };

  stats = [
    { label: 'Total Members', value: 42, icon: 'group', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Invites', value: 8, icon: 'pending_actions', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Now', value: 15, icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-50' }
  ];

  members: any[] = [
    { name: 'David Miller', email: 'david.m@buildflow.co', role: 'Admin', roleClass: 'bg-blue-600 text-white', status: 'Active', statusDot: 'bg-green-500', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPAONKTFXfNFAFRRCG77D7RtfG2-5qauZoyBKNC1x0SRt2H8iJPvCXp7AM1P89q3l7Qq_WyVlxe-FCeO2w_TrrsWe3ipppdbXy4eAZ7Hkh2lrwVptC5XQPxN9HBETRqIpg4-uNcEjsntXscqTil-e0AN3GQuq9mZVq9ZMIAM6L4OvALlJ4xFyyfFpm60RTggfLM-l5B3BFZHl1L_LR2HS8xHl6Qmm8Xp6A7xkIfXh7bvDiIFsG7NNYD4lN-9MWVG_ASp6Rtje5zuGq' },
    { name: 'Sarah Chen', email: 'sarah.c@buildflow.co', role: 'Editor', roleClass: 'bg-amber-500 text-white', status: 'Active', statusDot: 'bg-green-500', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy6kguFDpbdu22RXyzkZYEhqX6zZEB61_rkYQakGSdDaKyicjFqwYwX-xV5AeD4JAF9upktLl2kbkNOl3sxreIDp_iEcEWUdbCVjEz9nEXXpojx3wKwjlZF92kfgLYHm5oSnZe9N6e1e2YfXckf7J2h87fMzxNpkEyhzpr3Xf1vGcvdgdN7DSMD0iPxAN7SB3qZK_Q68q__M_ytxq4yEtFU89urVWQwwb00q9zAV-1Fegc3uv9XKviFvE0GKZzh7pIyTXBVUF2Pjd0' },
    { name: 'Marcus Thorne', email: 'm.thorne@partner-arch.com', role: 'Viewer', roleClass: 'bg-slate-500 text-white', status: 'Pending', statusDot: 'bg-amber-500', avatar: '' },
    { name: 'Alex Rivera', email: 'alex.r@buildflow.co', role: 'Editor', roleClass: 'bg-amber-500 text-white', status: 'Active', statusDot: 'bg-green-500', avatar: '' },
    { name: 'Elena Rossi', email: 'e.rossi@buildflow.co', role: 'Admin', roleClass: 'bg-blue-600 text-white', status: 'Active', statusDot: 'bg-green-500', avatar: '' },
    { name: 'Michael Park', email: 'm.park@buildflow.co', role: 'Viewer', roleClass: 'bg-slate-500 text-white', status: 'Active', statusDot: 'bg-green-500', avatar: '' },
    { name: 'James Wilson', email: 'j.wilson@buildflow.co', role: 'Admin', roleClass: 'bg-blue-600 text-white', status: 'Active', statusDot: 'bg-green-500', avatar: '' }
  ];

  roleOptions = ['Admin', 'Editor', 'Viewer'];

  constructor() {}
  ngOnInit(): void {}

  get roleClass() {
    const map: any = { 'Admin': 'bg-blue-600 text-white', 'Editor': 'bg-amber-500 text-white', 'Viewer': 'bg-slate-500 text-white' };
    return map;
  }

  get searchedMembers() {
    return this.members.filter(m =>
      m.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.searchedMembers.length / this.pageSize);
  }

  get paginatedMembers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.searchedMembers.slice(start, start + this.pageSize);
  }

  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  openAddModal() {
    this.newMember = { name: '', email: '', role: 'Editor', status: 'Active' };
    this.showAddModal = true;
  }

  addMember() {
    if (!this.newMember.name || !this.newMember.email) return;
    const roleClassMap: any = { 'Admin': 'bg-blue-600 text-white', 'Editor': 'bg-amber-500 text-white', 'Viewer': 'bg-slate-500 text-white' };
    this.members.push({
      ...this.newMember,
      roleClass: roleClassMap[this.newMember.role],
      statusDot: this.newMember.status === 'Active' ? 'bg-green-500' : 'bg-amber-500',
      avatar: ''
    });
    this.showAddModal = false;
  }

  openEditModal(member: any) {
    this.editingMember = { ...member };
    this.showEditModal = true;
  }

  saveEdit() {
    const idx = this.members.findIndex(m => m.email === this.editingMember.email);
    if (idx >= 0) {
      const roleClassMap: any = { 'Admin': 'bg-blue-600 text-white', 'Editor': 'bg-amber-500 text-white', 'Viewer': 'bg-slate-500 text-white' };
      this.editingMember.roleClass = roleClassMap[this.editingMember.role];
      this.editingMember.statusDot = this.editingMember.status === 'Active' ? 'bg-green-500' : 'bg-amber-500';
      this.members[idx] = { ...this.editingMember };
    }
    this.showEditModal = false;
  }

  deleteMember(member: any) {
    if (confirm(`Remove ${member.name} from the team?`)) {
      this.members = this.members.filter(m => m.email !== member.email);
    }
  }

  get team() {
    return [{ name: 'All Members' }, ...this.members.map(m => ({ name: m.name }))];
  }
}

