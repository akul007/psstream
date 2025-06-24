import React from "react";
import "./Footer.css";
import { useSelector} from "react-redux";

/* In footer Five social handles are rendering in which we are fetching content from the CMS
  for example: instagram handle, we are storing the image of logo and text in CMS and we are rendering that 
  into Footer.
*/

const Footer = () => {
  const data = useSelector(state => {
    return state.labels.all;
  })

  var labels_array = [data?.items];
  labels_array[0] && labels_array[0].sort(function (a, b) {

    return new Date(a.sys.createdAt).getTime() - new Date(b.sys.createdAt).getTime()

  });

  var labels_ordered_data = labels_array[0];
  var media_array = [data?.includes && data?.includes?.Asset];
  media_array[0] && media_array[0].sort(function (a, b) {

    return new Date(a.sys.createdAt).getTime() - new Date(b.sys.createdAt).getTime()

  });

  var media_ordered_data = media_array[0];

  return (
    <ul className="footer w-full" data-testid="footer">
      <li className="mr-1">
        <a href="www.facebook.com">
          <img data-testid="facebookIcon" src={data?.includes && media_ordered_data[0]?.fields?.file?.url } alt="facebook logo"></img>
          <span data-testid="facebookText" >{data?.items && labels_ordered_data[1]?.fields?.buttonText?.content[0]?.content[0]?.value}</span>
        </a>
        
      </li>
      <li>
        <a href = "www.twitter.com">
          <img data-testid="twitterIcon" src={data?.includes && media_ordered_data[2]?.fields?.file?.url} alt="twitter logo"></img>
          <span data-testid="twitterText" >{data?.items && labels_ordered_data[3]?.fields?.buttonText?.content[0]?.content[0]?.value}</span>
        </a>
              
      </li>
      <li>
        <a href = "www.linkedin.com">
          <img data-testid="linkedIn" src={data?.includes && media_ordered_data[3]?.fields?.file?.url} alt="linkedIn logo"></img>
          <span data-testid="linkedInText">{data?.items && labels_ordered_data[4]?.fields?.buttonText?.content[0]?.content[0]?.value}</span>
        </a>
        
      </li>
      <li>
        <a href="www.instagram.com">
          <img data-testid="instagram" src={data?.includes && media_ordered_data[4]?.fields?.file?.url} alt="instagram logo"></img>
          <span data-testid="instagramText" >{data?.items && labels_ordered_data[5]?.fields?.buttonText?.content[0]?.content[0]?.value}</span>
        </a>        
       
      </li>
      <li className="mr-4">
        <a href = "#html">
          <img data-testid="copyrightIcon" src={data?.includes && media_ordered_data[5]?.fields?.file?.url} alt="copyright logo"></img>
          <span data-testid="copyrightText" >{data?.items &&labels_ordered_data[6]?.fields?.buttonText?.content[0]?.content[0]?.value}</span>
        </a>
             
      </li>
    </ul>
  )
}
export default Footer;