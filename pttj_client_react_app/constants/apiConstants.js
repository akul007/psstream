const header ="https://";
const ipAddress="ymnokrmtd4.execute-api.us-east-1.amazonaws.com/api/";
const portUserService="users";
const portUploadService="uploads";
const portNotificationService="notifications";
const portAdminService="admins";
const portSubscriptionService="subscriptions"
const portSearchService="search";
const portLogger="3005";

export const domain =header+ipAddress+portUserService;
export const domainSearch =header+ipAddress+portSearchService;
export const uploadDomain = header+ipAddress+portUploadService;
export const notificationdomain = header+ipAddress+portNotificationService;
export const subscriptionDomain = header+ipAddress+portSubscriptionService;
export const adminDomain = header+ipAddress+portAdminService;
export const loggerDomain = header+ipAddress+portLogger;
 
 
export const lockAccountUrl = domain+"/user/v1.0/lock/user/";
export const userDetailsUrl=domain+"/user/v1.0/";
export const signUrl = domain+"/api/auth/signin";
export const registerUrl = domain+"/user/v1.0";
export const passwordResetURL = domain+"/user/v1.0/update/password";
export const otpUrl = domain+"/user/v1.0/otp/";
export const getNotification = domain+"/user/v1.0/notification";
export const channelapi = domain+"/channel/v1.0";
export const channelLandingApi = domain + "/channel/v1.0/";
export const videoApi = domain+"/videos/v1.0";
export const gradeursApi = domain+"/grandeurs/v1.0/"
export const usersByLocationApi = domain+"/reports/v1.0/users/countries";
export const videosByLocationApi = domain+"/reports/v1.0/videos/countries";
export const channelVideoApi = domain + "/videos/v1.0/findAllFor/channel/";
export const allChannelCategories = domain+"/channel/v1.0/categories/all";
export const getCategoryCount = domain+"/channel/v1.0/category/";
export const captchaApi = domain+"/api/auth/captcha/";
export const follow = domain+"/followers/v1.0";
export const subscribe = domain+"/subscribers/v1.0" ;
export const weeklySubscribersUrl = domain + "/subscribers/v1.0/monthlySubscribersWeekWise/";
export const dailySubscribersUrl = domain + "/subscribers/v1.0/weeklySubscribersDayWise/";
export const weeklyViewsUrl = domain + "/views/v1.0/monthlyViewsWeekWise/";
export const dailyViewsUrl = domain + "/views/v1.0/weeklyViewsDayWise/";
export const videoHistoryUrl = domain+"/history/v1.0/user/";
export const followingChannelGraphUrl = domain+"/channels/v1.0/follow/history/userid/";
export const followingChannelCountUrl = domain+"/User/v1.0/followingChannelCount/";
export const ssoApi = domain+ "/api/auth/sso";
export const seeNotification = notificationdomain+"/notifications/v1.0/seen";
export const history = domain+ "/history/v1.0/add";
 
export const presignedVideo = uploadDomain+ "/upload/v1.0/video/url";
export const presignedThumbnail = uploadDomain+ "/upload/v1.0";
export const uploadVideo = uploadDomain+ "/upload/v1.0/";
 
export const subscribedUrl = subscriptionDomain + "/subscriptions/v1.0/subscribe";
 
export const findLockedUsers = adminDomain+"/admins/v1.0/find/locked";
export const unlockUsers = adminDomain+"/admins/v1.0/unlock/user/";
export const findToBeUpgradedUsers = adminDomain+"/admins/v1.0/find/to-upgrade";
export const upgradingUser = adminDomain+"/admins/v1.0/upgrade/user/";
export const findToBeBlocked =adminDomain+"/admins/v1.0/find/blocked-users";
export const suspendingUser =adminDomain+"/admins/v1.0/suspend/user/";
export const findVideoById = domain+"/videos/v1.0/";
export const unpublishedVideoApi=uploadDomain+ "/upload/v1.0/draft";
export const markVideoAsArchived = uploadDomain + "/upload/v1.0/archived/";
export const markVideoPublishedapi = uploadDomain + "/upload/v1.0/publish/";
export const markVideoRejectedapi =  uploadDomain + "/upload/v1.0/reject/";
export const likeDislikeResponseUrl = domain + "/responses/v1.0";
export const fetchCommentsApi = domain+"/comments/v1.0/all/";
export const reportCommentApi = domain+"/comments/v1.0/report/";
export const addCommentApi = domain+"/comments/v1.0";

export const videoViewedApi = domain + "/views/v1.0/";
export const reportedCommentsApi=domain+"/comments/v1.0/flagged";
export const deleteReportedCommentApi = domain+"/comments/v1.0/comment/";

