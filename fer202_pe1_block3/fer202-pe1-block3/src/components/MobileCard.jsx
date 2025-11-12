import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext'; // ĐÚNG
import { Heart, HeartFill } from 'react-bootstrap-icons';

const MobileCard = ({ mobile }) => {
  const { addToCart } = useCart();
  const { favourites, toggleFavourite } = useFavourite();

  const isFav = favourites.includes(mobile.id);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={mobile.image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{mobile.name}</Card.Title>
        <Card.Text>${mobile.price}</Card.Text>
        <div className="mt-auto d-flex gap-1">
          <Link to={`/mobiles/${mobile.id}`} className="btn btn-info btn-sm me-1">
             View Details
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => addToCart(mobile)}
            disabled={mobile.stock === 0}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => toggleFavourite(mobile.id)}
          >
            {isFav ? <HeartFill /> : <Heart />}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MobileCard;