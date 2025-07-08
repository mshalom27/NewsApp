import { ID, ImageGravity } from "appwrite"
import { appwriteConfig, storage } from "./config"
import { Permission, Role } from "appwrite"


export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file, 
      [
    Permission.read(Role.any())
     ]
    )

    console.log("Uploaded file ID:", uploadedFile.$id) // ✅ DEBUG LINE


    return uploadedFile
  } catch (error) {
    console.log(error)
  }
}

export function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    )

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    console.log(error)
  }
}
