import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/config";

const storage = getStorage()

export default async function UploadImage(img, id, temporary) {

    const imageRef = ref(storage, (temporary ? "temporaryImages/" : "posts/") + id)

    await uploadBytes(imageRef, img).then((snapshot) => {
    })

    const url = await getDownloadURL(imageRef).then((url) => {
        return url
    })
    
    return url
}