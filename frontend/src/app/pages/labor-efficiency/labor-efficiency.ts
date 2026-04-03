import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-labor-efficiency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './labor-efficiency.html',
  styleUrls: ['./labor-efficiency.css']
})
export class LaborEfficiency implements OnInit {
  team = [
    { name: 'All Members' },
    { name: 'Sarah Jenkins' },
    { name: 'Mark Thompson' }
  ];
  selectedMember = 'All Members';

  contractors = [
    { name: 'Apex Concrete Solutions', personnel: 12, efficiency: 94.8, tasks: '28/30', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfGGCdUe8xfkR9yXzgVibDJjqB4GMs5H9sHqZOiLEhewQk1KAFCdSwAV-pjonjSog_907IsMGuA3Xl48EVpXenMONqdnHSKVkUpTjtnCqhw7aKS3Wb1JzcNYALG2FW2aCExHIxZ9_vVr7ItmDEtev-g5rlCMSeR3onFG55egOz7t5BtbEm3WmqoW2B-qGB6dkhdYUEdkNG2SMEGmzPyQQnt4MTrqk_lK7IXZyZtNBjMC5XpwN84Fk6TBr9nyq5agIdfXdy_lxRZepa' },
    { name: 'Vanguard Electrical', personnel: 8, efficiency: 88.2, tasks: '15/17', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjZUEAAaayP_P5xTmog9TMmo9VEmQnJeC1OtYoxOgjqZveHg24LtXHJEoiSVMkGa6YZlt-5woRIjA0vklSLugtCnRH9ALFN9Em6Gp2jNCyb_Xz5aO5PEtMZhlAruvrMXrKibO64O4N0GBDx-oJjbD5C9OK8U-C5DYWNxI1VV4SNWOnp8SOGHtsx4lVNYv47148qaTiJDnBzhSiqGLIVbtUtfkQAAVTLgl_qygqS0r44FIHgyug5gk418l1uK-F6KeghH13lLDwRIjS' },
    { name: 'Horizon Steelworks', personnel: 24, efficiency: 76.5, tasks: '42/55', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbaknLWnXup9P__CArLmzADSnktqSRmRxR__1ZsxrPnxJr9EF89Jl7DR9wLdJkWD-2RooG8S31pUCaBOV4UpPAqHJ_WDGdy2Rt7bbYcE0JH9joLHZQYYpFdJGvsKTDmyEjWfL9YNyBJFFHMKfa7G451JHGAKUXp3Gx3b96rafJL4XhiNZqwXzweVRi82KJrzrp3loSMhGqqEFHVjtioYZUDTqQ1N76FQ7Fek0infioZQYKC9Z8_bP7uudI4eqqbK2EcNJDdfldzOZk' }
  ];

  shiftActivity = [
    { name: 'Sarah Jenkins', role: 'Foreman', status: 'On Site', statusClass: 'bg-green-100 text-green-700', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAyOvDxwm7IY0fGzIcQewafXbHLkhV-OUeDRgpe-ymlTiSF9hWPY5xwBf-2prAqKdk9IcvsKvxTko5295kb7C7PYVsBgmb3T34K9pNFtGtJe89fMaS9GJ_8EjbgAxjAnY6Zm1m1Zw7sE2he8Oi2cJrVb6qMCuHA6g-_aA0cl19DhNAsXu41XLTSob64u0jvX1TDdqkvRc-gdbpX9OsXR1e3DVpAX0AknzrS7cwF9FPuxoMlyvVopoOqU3Y7xwR0OlwYFxh5RBNaWkr', activities: [{ label: 'Site Supervision: North Wing', left: '10%', width: '60%', type: 'primary' }, { label: 'Safety Audit', left: '75%', width: '15%', type: 'secondary' }] },
    { name: 'Mark Thompson', role: 'Specialist', status: 'Active', statusClass: 'bg-blue-100 text-blue-700', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvmrDmdNuYaE5vTixXe6B6Wbv3m1nAaRGc5AeHwtiGjCNtTkdqJt9_thcbj1ZTdTZzag-PHoimyOwQO-Vt9i1fHGa5hBC6XudSDWNKFcdtksoSSOKHlB79jV_dagoeD4b3vfmR_Bsh83DuEKlVupf5xcxS4MMW8a97mPzfu6gEuMVHsF1KdGw7q3xZYIemN0C8ANuiM4AAK9Q5krlxO6bnYXlmTEc04Fx6DJArq8ABEhFBOzFNsqzpEv5lj_YDyQGf9wughldNujAP', activities: [{ label: 'HVAC Installation & Testing', left: '5%', width: '80%', type: 'solid' }] }
  ];

  heatmap = Array(3).fill(0).map(() => Array(7).fill(0).map(() => Math.floor(Math.random() * 5)));

  financialMetrics = {
    earnedValue: 845000,
    actualCost: 912000,
    cpi: 0.93
  };

  profitabilityLeaks = [
    { zone: 'North Wing - Level 4', contractor: 'Vanguard Electrical', delta: -4200, trend: 'increasing', resolution: 'Investigate overtime logs' },
    { zone: 'East Plaza - Civil', contractor: 'Apex Concrete Solutions', delta: -1850, trend: 'stable', resolution: 'Material delay incurred holding costs' }
  ];

  constructor() {}

  ngOnInit(): void {}

  get filteredShiftActivity() {
    if (this.selectedMember === 'All Members') return this.shiftActivity;
    return this.shiftActivity.filter(w => w.name === this.selectedMember);
  }
}
