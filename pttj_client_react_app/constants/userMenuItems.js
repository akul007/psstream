export const logoutUser = () =>{
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("reduxState");
  sessionStorage.removeItem("moderatorCheck");
  window.location.href="/"
}
export const items = [
  {
    label:"Home",
    icon:"pi pi-fw pi-home",
    command:()=>{window.location.href="/"}
  }, 
  {
    label:"Create channel",
    icon:"pi pi-fw pi-plus",
    command:()=>{window.location.href="/createChannel"}
  },
  //channels
  {
    label:"My Channels",
    icon:"pi pi-fw pi-stop",
    command:()=>{window.location.href="/ChannelOwnerList"}
  },
  {
    label:"Profile",
    icon:"pi pi-fw pi-user",
    // command: () => { window.location.href = "../components/molecules/ViewUserDetails/"
    items:[
      {
        label:"View Profile",
        icon:"pi pi-fw pi-user",
        command:()=>{window.location.href="/ViewUserDetails"}
      },
      //edit profile
      {
        label:"Edit Profile",
        icon:"pi pi-fw pi-pencil",
        command:()=>{window.location.href="/EditUserDetails"}
      }
    ]
  },

  {
    label:"History",
    icon:"pi pi-fw pi-history",
    url: "/history"
  },
  {
    label:"Logout",
    icon:"pi pi-fw pi-sign-out",
    command:()=>{
      logoutUser()
    }}
  
];