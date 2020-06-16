export default {
  loading: false,
  search: null,
  menus: [
    { title: 'Dasbor', icon: 'mdi-view-dashboard', link: '/dasbor', access: ["Super Admin"] },
    { title: 'Perangkat', icon: 'mdi-toolbox', link: '/perangkat', access: ["Super Admin", "Teknisi", "Admin Gudang"] },
    { title: 'Permintaan', icon: 'mdi-clipboard-list', link: '/permintaan', access: ["Super Admin", "Teknisi", "Admin Gudang", "Team Leader"] },
    { title: 'Tim', icon: 'mdi-account-group', link: '/tim', access: ["Super Admin", "Teknisi", "Team Leader"] },
    { title: 'Laporan', icon: 'mdi-file', link: '/about', access: ["Super Admin"] },
  ],
  notifications: [],
  user: [],
}