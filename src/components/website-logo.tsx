import LogoWhite from "@/assets/images/logo_white.png";
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

const WebsiteLogo: FC<{
  props?: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}> = (props) => {
  return <img src={LogoWhite} {...props.props}></img>;
};

export default WebsiteLogo;
