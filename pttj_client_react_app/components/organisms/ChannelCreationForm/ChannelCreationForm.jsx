import React,{useState,useRef} from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import InputField from "../../atoms/textFields/InputField.jsx";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import { channelTag } from "../../../constants/formData";
import { channelapi } from "../../../constants/apiConstants";
import "./ChannelCreationForm.css";
import { FileUpload } from "primereact/fileupload";
import { useDispatch, useSelector } from "react-redux";
import {fetchPresignedThumbnailUrl } from "../../../redux/index.js";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";

{
  /*
  This component ChannelCreationForm is registering the user as a channel.
  The user will be able to fill the form for 5 time only. After the form will be disabled..
  They will not able to enter any value.
  */
}
export default function ChannelCreationForm(){
  const user = useSelector(state=>state.user.userInfo);
  const [isLimitReach,setIsLimitReach] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const[errorMsg, setErrorMsg] = useState("");
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [completeThumbnail, setCompleteThumbnail] = useState(true);
  const thumbnailResponse = useSelector(state => state.preSignedThumbnailUrl);
  const [thumbnailFile, setThumbnailFile] = useState(undefined);
  const dispatch = useDispatch();

  const toast = useRef(null);

  const[formData,setFormData]=useState({
    channelName:"",
    description:"",
    karmaPoint:0,
    channelTag:"",
    loading:false
  })

  function handle(e){
    const newData={...formData};
    newData[e.target.id]=e.target.value;
    setFormData(newData);
  }

  function submit(){
    const errorList = validate(formData);
    if(Object.keys(errorList).length!==0){
      setFormErrors(errorList);
      toast.current.show({severity:"error", summary: "Channel is not created, fill all details", detail:"", life: 3000});
      return;
    }
    const payload = {
      "channelCreator": {
        "userId": user.id,
      },
      "channelName": formData.channelName,
      "channelTag": formData.channelTag.name,
      "description": formData.description,
      "emailId": user.email,
      "followersCount": 0,
      "karmaPoints": formData.karmaPoint,
      "subscribersCount": 0,
      "channelLogo":thumbnailResponse.expectedThumbnailUrl,
    }

    setFormData({...formData,loading:true});
    axios.post(channelapi,payload).then(() => {
      setFormData({...formData,loading:false});
      setFormData({userid:""});
      toast.current.show({severity:"success", summary: "Channel is created", detail:"", life: 3000});
    }).catch((err)=>{
      setFormData({...formData,loading:false});
      if(err.response.status===400){
        setIsLimitReach(true);
        setErrorMsg(err.response.data);
      }
    })
  }

  //validating the input feilds
  const validate = (values) => {
    const errors = {};
    if (!values.channelName) {
      errors.channelName = "Channel name is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.karmaPoint) {
      errors.karmaPoint = "Karmapoint is required!";
    } 
    if (!values.channelTag) {
      errors.channelTag = "Channeltag is required!";
    }
    if(!completeThumbnail){
      errors.thumbnail_url = "Thumbnail must be uploaded";
    }
    return errors;
  };


  const thumbnailTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "80%" }}>
          <img alt={file.name} role="presentation" src={file.objectURL} style={{ width: "80%"}} />
        </div>
        <span className="videoFile flex flex-column text-left" style={{ width: "50%" }}>
          {file.name}
        </span>
        <span className="upload-size">{props.formatSize} </span>
        {isLoading(thumbnailLoading,completeThumbnail)}
      </div>
    )
  }

  const onThumbnailSelect= (e)=>{
    setThumbnailFile(e.files[0]);
    dispatch(fetchPresignedThumbnailUrl(1,e.files[0].name ))
  }

  function isLoading(loading, complete){
    return (loading? (<i className="pi pi-spin pi-spinner" style={{"color": "blue"}} />) : (complete && <i className="pi pi-check" style={{"color": "green"}}></i>) );
  }

  const onThumbnailUpload = () => {
    setThumbnailLoading(true);
    axios.put(thumbnailResponse.preSignedUrl, thumbnailFile, {
      headers: {
        "Content-Type": thumbnailFile.type
      }
    }).then(() =>{
      setThumbnailLoading(false);
      setCompleteThumbnail(true);
      toast.current.show({severity:"success", summary: "Logo Uploaded", detail:"", life: 3000});
    }).catch(()=>{
      setThumbnailLoading(false);
      toast.current.show({severity:"error", summary: "Logo Not Uploaded", detail:"", life: 3000});
    })
  }

 
  const chooseOptions = { icon: "pi pi-fw pi-images", iconOnly: true, className: "custom-choose-btn p-button-outlined" };
  const uploadOptions = { icon: "pi pi-fw pi-cloud-upload", iconOnly: true, className: "custom-upload-btn p-button-success p-button-outlined" };
  const cancelOptions = { icon: "pi pi-fw pi-times", iconOnly: true, className: "custom-cancel-btn p-button-danger p-button-outlined" };



  return(
    <div className="flex align-items-center justify-content-center">
      <Tooltip target=".custom-choose-btn" content="Choose" position="top" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="top" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="top" />
      <Toast ref={toast} />
      <div className="surface-card p-4 shadow-2 border-round w-6  m-5" data-testid="formtest">
        <div className="text-center mb-3">
          <div className="text-900 text-2xl font-medium mb-3 formtitle">Channel creation form</div>
          {isLimitReach ? (<span className="limitexceeded-item">{errorMsg}</span>):(<span className="text-900">Enter details</span>) }
        </div>
        <div className="inputfeild-item">
          <div data-testid="channelname-input" className="clannelname-item">
            <InputField id="channelName"  type="text" className = "mb-2 w-full" onChange={(e)=>handle(e)} required={true} label="Channel Name"/>
            <p>{formErrors.channelName}</p>
          </div>
          <div data-testid="karmapoint-input" className="karmapoint-item">
            <InputField data-testid="karmapoint-input" id="karmaPoint"  type="number" className = "mb-2 w-full" onChange={(e)=>handle(e)} required={true} label="Set Karma Point"/>
            <p>{formErrors.karmaPoint}</p>
          </div>
          <div className="channeltag-item">
            <Dropdown id="channelTag" name="channelTag" type="text"  className = "mb-4 w-full" value={formData.channelTag} onChange={(e)=>handle(e)} required={true} options={channelTag} optionLabel="name" placeholder="Select a Channel tag"/>
          </div>
          <div data-testid="description-input" className="description-items">
            <InputField data-testid="description-input" id="description"  type="text" className = "mb-2 w-full" onChange={(e)=>handle(e)} required={true} label="Description"/>
            <p>{formErrors.description}</p>
          </div>
          <div data-testid="thumbnail-upload-input" className="thumbnail-item">
            <FileUpload name="video-thumbnail" itemTemplate={thumbnailTemplate} chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
              accept="image/*" onSelect={onThumbnailSelect} customUpload uploadHandler={onThumbnailUpload} maxFileSize={1000000}
              emptyTemplate={<p className="m-0">
                <ul>
                  <li>Image should be in 1:1 aspect ratio</li>
                  <li>Preferable image size is 180px X 180px</li>
                  <li>Image size should not exceed 1 MB</li>
                </ul>
              </p>} />
            <p>{formErrors.thumbnail_url}</p>
          </div>
        </div>
        <div>
          <CustomButton id="continue" label="Submit" className="mb-2 w-full" onClickHandler={()=> submit()} disabled={isLimitReach}>
            {
              formData.loading && (<div className="spinner-border " role="status"/>)
            }
          </CustomButton>
        </div>
      </div>
    </div>
  );
}