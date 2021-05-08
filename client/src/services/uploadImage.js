import apiService from "./index"
import endpoint from "../config/endpoint"

const uploadImage = (imageBase64) => {
  return apiService.post(endpoint.UPLOAD_IMAGE, {
    raw_data: imageBase64,
    configurations: [
      {
        parameter: "OutputCroppedImage",
        value: "false",
      },
      {
        parameter: "ConfidenceThreshold",
        value: "0.1",
      },
      {
        parameter: "OutputVisualizedImage",
        value: "true",
      },
    ],
  })
}

export default uploadImage
