export default interface OrderRequestBody {
    email: string;
    full_name: string;
    full_address: string;
    images_urls: string[];
    frame_color: string;
    user_id: string;
}
