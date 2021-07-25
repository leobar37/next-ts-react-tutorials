const baseUrl = "https://jsonplaceholder.typicode.com";
const loremImage = "https://picsum.photos/500/300";
import axios from "axios";
import { Ipost } from "models/Post";

export class PlaceHolderApi {
  static async posts() {
    return (await axios.get<Ipost[]>(`${baseUrl}/posts`)).data.map((post) => ({
      ...post,
      image: loremImage,
    }));
  }
  static async postById(id: number) {
    const post = await (await axios.get<Ipost>(`${baseUrl}/posts/${id}`)).data;

    return { ...post, image: loremImage };
  }
}
