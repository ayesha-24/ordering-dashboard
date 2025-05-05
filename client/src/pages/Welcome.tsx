import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import catPic from "../assets/cat.jpg";
import "./Welcome.css";

interface customerData {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

function Welcome() {
  const [data, setData] = useState<customerData>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comms/your-next-delivery/${id}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;
  return (
    <div className="overall">
      {data.freeGift && <div className="free-gift">Free gift</div>}
      <div className="main-container">
        <div className="cat-pic">
          <img src={catPic} alt="cat looking at sky" />
        </div>
        <div className="content">
          <h2 className="title">{data.title}</h2>
          <div className="message">{data.message}</div>
          <div className="total">Total price: £{data.totalPrice.toFixed(2)}</div>
          <div className="button-container">
            <button className="details-button">See Details</button>
            <button className="delivery-button">Edit Delivery</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
