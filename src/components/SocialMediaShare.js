import React from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

export default function SocialMediaShare({title}) {
  return (
    <div className="share">
      <FacebookShareButton url={window.location.href} title={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={window.location.href} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <TelegramShareButton url={window.location.href} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </div>
  );
}
