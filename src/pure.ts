import axios from "axios";
import {IBlizzardAsset} from "blizzard-types";

export async function getMedia(data: { media: { key: { href: string } } }, token: string): Promise<IBlizzardAsset[]> {
    const tmp = await axios.get(`${data.media.key.href}&access_token=${token}`);
    return tmp.data.assets;
}
