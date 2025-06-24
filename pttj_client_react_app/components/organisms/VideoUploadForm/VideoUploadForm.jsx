import React, { useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import InputField from "../../atoms/textFields/InputField.jsx";
import { InputTextarea } from "primereact/inputtextarea";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import { videoType, videoCategory } from "../../../constants/formData";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";
import {useDispatch, useSelector} from "react-redux";
import "./VideoUploadForm.css";
import { useFormik } from "formik";
import { fetchPresignedUrl, fetchPresignedThumbnailUrl, uploadVideoAction } from "../../../redux/index.js";
import { Toast } from "primereact/toast";
import { useEffect } from "react";

{/*
  Upload Video in S3 and the required data associated with it
*/}

export default function VideoUploadForm(channel) {

  const [videoTime, setVideoTime] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const [completeVideo, setCompleteVideo] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [completeThumbnail, setCompleteThumbnail] = useState(true);
  const videoResponse = useSelector(state => state.preSignedVideoUrl);
  const thumbnailResponse = useSelector(state => state.preSignedThumbnailUrl);
  const [videoFile, setVideoFile] = useState(undefined);
  const [thumbnailFile, setThumbnailFile] = useState(undefined);
  const [disableKarma, setDisableKarma] = useState(true);
  const toast = useRef(null);
  const dispatch = useDispatch(); 
  const userId = useSelector(state=> state.user.userInfo.id);
 

  const [formData, setFormData] = useState({
    user: userId,
    channel: channel.channel,
    thumbnail_url: "",
    video_url: "",
    title: "",
    description: "",
    duration: videoTime,
    video_type: null,
    video_category: null,
    karma_points: 0
  })

  const formik = useFormik({

    initialValues: formData,
    //validating the input feilds
    validate : (values) => {
      const errors = {};
      if(!completeVideo){
        errors.video_url = "Video must be uploaded";
      }
      if(!completeThumbnail){
        errors.thumbnail_url = "Thumbnail must be uploaded";
      }
      if (!values.title) {
        errors.title = "Title is required!";
      }
      if (!values.video_category) {
        errors.video_category = "Video Category is required!";
      }
      if (!values.description) {
        errors.description = "Description is required!";
      }
      if (!values.video_type) {
        errors.video_type = "Video type is required!";
      }
      return errors;
    },

    onSubmit: (formData)=>{
      setFormData({ ...formData, loading: true });
      let payload= videoResponse.video;
      payload.duration= videoTime;
      payload.videoTitle = formData.title;
      payload.videoDescription= formData.description;
      payload.videoKarmaPoints=formData.karma_points;
      payload.thumbnailUrl= thumbnailResponse.expectedThumbnailUrl;
      payload.videoType= formData.video_type.name;
      payload.category = formData.video_category.name;
      dispatch(uploadVideoAction(payload))
      setFormData({...formData, loading: false});
      toast.current.show({severity:"success", summary: "Video Uploaded", detail:"", life: 3000});
    }
  })

  useEffect(()=>{
    if(formik.values.video_type?.name === "PUBLIC"){
      formik.values.karma_points = 0;
      setDisableKarma(true);
    }
    else if(formik.values.video_type?.name === "PREMIUM") setDisableKarma(false);
  },[formik.values.video_type])

  //The below functions are used in displaying the errors

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const onVideoUpload = () => {
    setVideoLoading(true);
    axios.put(videoResponse.presignedVideoUrl, videoFile, {
      headers: {
        "Content-Type": videoFile.type
      }
    }).then(() =>{
      setVideoLoading(false);
      setCompleteVideo(true);
      toast.current.show({severity:"success", summary: "Video Uploaded", detail:"", life: 3000});
    }).catch(()=>{
      setVideoLoading(false);
      toast.current.show({severity:"error", summary: "Video Not Uploaded", detail:"", life: 3000});
    })
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
      toast.current.show({severity:"success", summary: "Thumbnail Uploaded", detail:"", life: 3000});
    }).catch(()=>{
      setThumbnailLoading(false);
      toast.current.show({severity:"error", summary: "Thumbnail Not Uploaded", detail:"", life: 3000});
    })
  }

  const chooseOptions = { icon: "pi pi-fw pi-images", iconOnly: true, className: "custom-choose-btn p-button-outlined" };
  const chooseVideoOptions = { icon: "pi pi-fw pi-video", iconOnly: true, className: "custom-choose-btn p-button-outlined" };
  const uploadOptions = { icon: "pi pi-fw pi-cloud-upload", iconOnly: true, className: "custom-upload-btn p-button-success p-button-outlined" };
  const cancelOptions = { icon: "pi pi-fw pi-times", iconOnly: true, className: "custom-cancel-btn p-button-danger p-button-outlined" };

  function getTime(fileObject) {
    // get the file object
    const url = URL.createObjectURL(fileObject);
    // create a hidden video element 
    const video = document.createElement("video");
    // set the file object URL as the src of the video element
    video.src = url;
    let data={
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    // get video/audio duration when it's available
    video.addEventListener("loadedmetadata", () => {
      let d = Math.round(video.duration);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      setVideoTime ({
        hours: h,
        minutes: m,
        seconds: s
      });
    });
    return data;
  }

  const videoTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <span className="videoFile flex flex-column text-left ml-3">
            {file.name? file.name: null}
          </span>
        </div>
        <span className="upload-size">{props.formatSize} </span>
        {isLoading(videoLoading,completeVideo)}
      </div>
    )
  }

  const onVideoSelect = (e) => {   
    setVideoFile(e.files[0]);
    let data = {
      "channelId": channel.channel,
      "duration": getTime(e.files[0]),
      "fileName": e.files[0].name,
      "userId": userId
    }
    dispatch(fetchPresignedUrl(data))

  }

  const onThumbnailSelect= (e)=>{
    setThumbnailFile(e.files[0]);
    dispatch(fetchPresignedThumbnailUrl(1,e.files[0].name ))
  }

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

  function isLoading(loading, complete){
    return (loading? (<i className="pi pi-spin pi-spinner" style={{"color": "blue"}} />) : (complete && <i className="pi pi-check" style={{"color": "green"}}></i>) );
  }

  return (
    <div className="flex align-items-center justify-content-center h-100hv mt-5">
      <Tooltip target=".custom-choose-btn" content="Choose" position="top" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="top" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="top" />
      <Toast ref={toast} />

      <div className="video-form surface-card p-4 shadow-2 border-round w-full lg:w-8 m-8 md:w-8" >
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Video upload form</div>
        </div>
        <div className="input-field">
          <div className="input-field-first md:w-5">
            <div data-testid="video-upload-input" className="video-item">
              <FileUpload name="video-upload" itemTemplate={videoTemplate} chooseOptions={chooseVideoOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                accept="video/*" onSelect={onVideoSelect} customUpload uploadHandler={onVideoUpload} maxFileSize={100000000} onError={getFormErrorMessage("video_url")}
                emptyTemplate={<p className="m-0">Upload Video</p>} />
              {getFormErrorMessage("video_url")}
            </div>
            <div data-testid="thumbnail-upload-input" className="thumbnail-item">
              <FileUpload name="video-thumbnail" itemTemplate={thumbnailTemplate} chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                accept="image/*" onSelect={onThumbnailSelect} customUpload uploadHandler={onThumbnailUpload} maxFileSize={1000000}
                emptyTemplate={<p className="m-0">
                  <ul>
                    <li>Image should be in 16:9 aspect ratio</li>
                    <li>Preferable image size is 320px X 180px</li>
                    <li>Image size should not exceed MB</li>
                  </ul>
                </p>} />
              {getFormErrorMessage("thumbnail_url")}
            </div>
          </div>
          
          <div className="input-field-second md:w-5">
            <div className="video-type-item">
              <Dropdown id="video_type" name="video_type" type="text" className="mb-2 w-full" value={formik.values.video_type}  onChange={formik.handleChange} required={true} options={videoType} optionLabel="name" placeholder="Select a video type" />
              {getFormErrorMessage("video_type")}
            </div>
            <div className="video-category-item">
              <Dropdown id="video_category" name="video_category" type="text" className="mb-2 w-full" value={formik.values.video_category}  onChange={formik.handleChange} required={true} options={videoCategory} optionLabel="name" placeholder="Select a video category" />
              {getFormErrorMessage("video_category")}
            </div>
            <div data-testid="video-title-input" className="title-item">
              <InputField id="title" type="text" className="mb-2 w-full"  onChange={formik.handleChange} required={true} label="Video Title" />
              {getFormErrorMessage("title")}
            </div>
            <div data-testid="karmapoint-input" className="karmapoint-item">
              <InputField data-testid="karma-points-input" value={formik.values.karma_points} disabled={disableKarma} id="karma_points" type="number" min={0} className="mb-2 w-full"  onChange={formik.handleChange} required={false} label="Karma Point" />
            </div>
            <div data-testid="description-input" className="description-item mt-4">
              <label htmlFor="description">Description <span>(less than 100 characters)</span></label>
              <InputTextarea data-testid="description-input" maxLength={100} id="description" type="textarea" className="mb-2 w-full" rows={5} cols={30} autoResize  onChange={formik.handleChange} required={true} label="Description in less than 100 letters" />
              {getFormErrorMessage("description")}
            </div>
            <div>
              <CustomButton id="continue" label="Submit" className="mb-2 w-full" onClickHandler={formik.submitForm}>
                {
                  formData.loading && (<div className="spinner-border " role="status" />)
                }
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}