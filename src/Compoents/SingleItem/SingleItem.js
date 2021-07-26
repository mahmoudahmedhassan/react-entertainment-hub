import {React} from "react";
import "./singleItem.css";
import { img_300, unavailable } from "../../config";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import ContentModal from "../Modal/Modal"

function SingleItem({ title, poster, vote, data, move_type, id }) {
   return (
     
    <ContentModal id={id} media_type={move_type}>

       <div className="single_item" >
        <span className="vote">{vote}</span>
        <div className="poster">
          <Image src={poster ? `${img_300}/${poster}` : unavailable} />
          <span className="vote">{vote}</span>
        </div>
        <div className="details">
          <p className="title">{title}</p>
          <span className="move_type">
            {move_type}
            <span className="data">{data}</span>
          </span>
        </div>
      </div>
      
     </ContentModal>
  );
}

export default SingleItem;
