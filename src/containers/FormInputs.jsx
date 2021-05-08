import { useState, useRef, useCallback } from "react"
import { Form, Button, Col, Row, Input } from "antd"
import {
  LoadingOutlined,
  PlusOutlined,
  CameraOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import Webcam from "react-webcam"
import uploadImage from "../services/uploadImage"

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

const getImageMime = (data) => {
  if (data.charAt(0) === "/") {
    return "image/jpeg"
  } else if (data.charAt(0) === "R") {
    return "image/gif"
  } else if (data.charAt(0) === "i") {
    return "image/png"
  }
}

const getObjectiveDetection = async (imageSrc) => {
  const result = await uploadImage(imageSrc.split(";base64,")[1])
  const rawData = result?.raw_data
  if (rawData) {
    const memeType = getImageMime(rawData)
    const image = `data:${memeType};base64,${rawData}`
    return image
  }
}

const RenderUploadImage = ({ setImage, isUploading, setIsUploading }) => {
  const onChange = (e) => {
    setIsUploading(true)
    getBase64(e.target.files[0], async (imageUrl) => {
      const image = await getObjectiveDetection(imageUrl)
      if (image) {
        setImage(image)
        setIsUploading(false)
      }
    })
  }
  return (
    <>
      <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
        <label for="upload" className="ant-upload flex-col">
          {isUploading ? (
            <LoadingOutlined className="text-base" />
          ) : (
            <PlusOutlined className="text-base" />
          )}
          <div style={{ marginTop: 8 }}>Upload</div>
          <input
            type="file"
            id="upload"
            className="input-upload"
            onChange={onChange}
          />
        </label>
      </div>
    </>
  )
}

const RenderWebcam = ({ setImage, setTakeAPhoto, takeAPhoto }) => {
  const webcamRef = useRef(null)
  const [isTaking, setIsTaking] = useState(false)

  const handleCapturePhoto = useCallback(async () => {
    setIsTaking(true)
    const imageSrc = webcamRef.current.getScreenshot()
    const image = await getObjectiveDetection(imageSrc)
    setImage(image)
    setIsTaking(false)
  }, [webcamRef])

  const handleCancel = () => {
    setIsTaking(false)
  }

  return (
    <>
      {!takeAPhoto ? 
      <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
          <div
            className="ant-upload flex-col"
            onClick={() => setTakeAPhoto(true)}
          >
            <CameraOutlined className="text-base" />
            <div style={{ marginTop: 8 }}>Take a photo</div>
          </div>
        {isTaking && <LoadingOutlined className="text-base" />}
      </div>
      : <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <div className="flex justify-center p-2">
            <Button onClick={handleCancel} className="flex justify-center">
              Cancel
            </Button>
            <Button
              onClick={handleCapturePhoto}
              className="flex justify-center flex-col-reverse"
              type="primary"
            >
              Capture <CameraOutlined className="text-base" />
            </Button>
          </div>
        </div>
        }
    </>
  )
}

const FormInputs = (props) => {
  const { onFinishFailed, submitForm } = props
  const [image, setImage] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [takeAPhoto, setTakeAPhoto] = useState(false)
  const removeImage = () => {
    setImage(undefined)
    setTakeAPhoto(false)
  }
  return (
    <>
      <Form
        layout="vertical"
        onFinish={submitForm}
        onFinishFailed={onFinishFailed}
      >
        <Row className="justify-center text-center">
          <Form.Item
            name="image"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            {!image ? (
              <>
                {!takeAPhoto && (
                  <RenderUploadImage
                    setImage={setImage}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                  />
                )}
                {!isUploading && (
                  <RenderWebcam
                    setImage={setImage}
                    takeAPhoto={takeAPhoto}
                    setTakeAPhoto={setTakeAPhoto}
                  />
                )}
              </>
            ) : (
              <div className="relative border-dashed border-2 border-gray-600 rounded-2xl">
                <img
                  src={image}
                  alt="avatar"
                  width={200}
                  className="rounded-2xl"
                />
                <CloseOutlined
                  onClick={removeImage}
                  style={{ top: "-8px", right: "-8px" }}
                  className="cursor-pointer absolute hover:bg-gray-400"
                />
              </div>
            )}
          </Form.Item>
        </Row>
          <Row>
            <Col span={24}>          
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
            </Col>
          </Row>
          <Row >
          <Col span={24}>   
            <Form.Item
              name="contacts"
              label="Contacts"
              rules={[{ required: true, message: "Please enter url" }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
            </Col>
          </Row>
        <Row>
        <Col span={24}>   
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter url description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
            </Col>
        </Row>
        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default FormInputs
