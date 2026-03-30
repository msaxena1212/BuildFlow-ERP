import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team.html',
  styleUrls: ['./team.css']
})
export class TeamManagement implements OnInit {
  stats = [
    { label: 'Total Members', value: 42, icon: 'group', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Invites', value: 8, icon: 'pending_actions', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Now', value: 15, icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-50' }
  ];

  members = [
    {
      name: 'David Miller',
      email: 'david.m@buildflow.co',
      role: 'Admin',
      roleClass: 'bg-blue-600 text-white',
      status: 'Active',
      statusDot: 'bg-green-500',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPAONKTFXfNFAFRRCG77D7RtfG2-5qauZoyBKNC1x0SRt2H8iJPvCXp7AM1P89q3l7Qq_WyVlxe-FCeO2w_TrrsWe3ipppdbXy4eAZ7Hkh2lrwVptC5XQPxN9HBETRqIpg4-uNcEjsntXscqTil-e0AN3GQuq9mZVq9ZMIAM6L4OvALlJ4xFyyfFpm60RTggfLM-l5B3BFZHl1L_LR2HS8xHl6Qmm8Xp6A7xkIfXh7bvDiIFsG7NNYD4lN-9MWVG_ASp6Rtje5zuGq'
    },
    {
      name: 'Sarah Chen',
      email: 'sarah.c@buildflow.co',
      role: 'Editor',
      roleClass: 'bg-amber-500 text-white',
      status: 'Active',
      statusDot: 'bg-green-500',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy6kguFDpbdu22RXyzkZYEhqX6zZEB61_rkYQakGSdDaKyicjFqwYwX-xV5AeD4JAF9upktLl2kbkNOl3sxreIDp_iEcEWUdbCVjEz9nEXXpojx3wKwjlZF92kfgLYHm5oSnZe9N6e1e2YfXckf7J2h87fMzxNpkEyhzpr3Xf1vGcvdgdN7DSMD0iPxAN7SB3qZK_Q68q__M_ytxq4yEtFU89urVWQwwb00q9zAV-1Fegc3uv9XKviFvE0GKZzh7pIyTXBVUF2Pjd0'
    },
    {
      name: 'Marcus Thorne',
      email: 'm.thorne@partner-arch.com',
      role: 'Viewer',
      roleClass: 'bg-slate-500 text-white',
      status: 'Pending',
      statusDot: 'bg-amber-500',
      avatar: 'https://initials.io/avatar/MT/256'
    },
    {
      name: 'Alex Rivera',
      email: 'alex.r@buildflow.co',
      role: 'Editor',
      roleClass: 'bg-amber-500 text-white',
      status: 'Active',
      statusDot: 'bg-green-500',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuSRaxFRCZy5vtgs6eC3Fe6saNDnVqmuBCukTiTi6g-KMe1GwjExT-Sj7VfBuya_ow8JFfPpvP_g7sThX9xzpHfrbJyEB0A7kLzwyGg4m9s1Q-25ALOvAxBABZOZ2p0C7VpAod1OGtD7j7t_-oVAlzrFAihlg7_2ExJNupLJ8jIEgTLPQfHD97lZprD6_HuvRbQ11jQuOYvyuNr4TtQowrt2fogOlQvyylnZOU35zXoCzNgw6f1uxAF3onOI99DKHDn8n1wkK7WIN0'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
