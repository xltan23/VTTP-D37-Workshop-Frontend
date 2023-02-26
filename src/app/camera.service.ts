import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UploadResult } from "./models";

@Injectable()
export class CameraService {

    imageData = ""

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    // Post Form Data to BACKEND
    // Return UploadResult (Upload Result takes in JsonObject response from server)
    upload(form:any, image:Blob): Promise<UploadResult> {
        // Ensure the set values: title, comment, imageFile are all labelled the same for server controller @RequestPart
        const formData = new FormData()
        formData.set("title", form["title"])
        formData.set("comment", form["comment"])
        formData.set("imageFile", image)
        return firstValueFrom(this.http.post<UploadResult>('https://webcam-production.up.railway.app/upload', formData))
    }
}