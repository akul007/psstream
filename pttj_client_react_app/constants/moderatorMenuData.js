import { logoutUser } from "./userMenuItems";
export const moderatorItems = [
  {
    label:"Home",
    icon:"pi pi-fw pi-home",
    command: () => { window.location.href = "/moderator" }
  },
  {
    label:"Profile",
    icon:"pi pi-fw pi-user",
    command:()=>{window.location.href="/ViewUserDetails"}
  },   
  {
    label:"Offensive Comments",
    icon:"pi pi-fw pi-comments",
    url:"/offensiveComments"
  },
    
  {
    label:"Logout",
    icon:"pi pi-fw pi-sign-out",
    command:()=>{
      logoutUser()
    }
  }
];