import { logoutUser } from "./userMenuItems";
export const adminitems = [
  {
    label:"Home",
    icon:"pi pi-fw pi-home",
    command: () => { window.location.href = "/admin" }
  },
  {
    label:"Profile",
    icon:"pi pi-fw pi-user",
    command:()=>{window.location.href="/ViewUserDetails"}
  }, 
  {
    label:"Moderator Requests",
    icon:"pi pi-fw pi-user-plus", 
    command: () => { window.location.href = "/upgradeUsers" }

  },
  {
    label:"Suspend Users",
    icon:"pi pi-fw pi-ban",
    command: () => { window.location.href = "/suspendingUsers" }
  },
  {
    label:"Unlock Users",
    icon:"pi pi-fw pi-unlock",
    command: () => { window.location.href = "/unlockUsers" }
  },
  {
    label:"Reports",
    icon:"pi pi-fw pi-chart-bar",
    items:[
      {
        label:"Users By Location",
        icon:"pi pi-fw pi-users",
        command: () => { window.location.href = "/usersbylocations" }
      },  
      {
        label:"Videos By Location",
        icon:"pi pi-fw pi-video",
        command: () => { window.location.href = "/videosbylocations" }
      },
      {
        label:"Channels By Category",
        icon:"pi pi-fw pi-video",
        command: () => { window.location.href = "/categorychannelcount" }
      },
      {
        label:"Premium Videos Per Channel",
        icon:"pi pi-fw pi-dollar",
        command: () => { window.location.href = "/premiumvideoscountperchannel" }
      },
      {
        label:"Suspended Users",
        icon:"pi pi-fw pi-ban",
        command: () => { window.location.href = "/suspendedaccounts" }
          
      },
    ]
  }
  ,
  {
    label:"Logout",
    icon:"pi pi-fw pi-sign-out",
    command:()=>{
      logoutUser()
    }}
  
];
