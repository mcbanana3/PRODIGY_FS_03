import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className="bg-white shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl rounded-lg">
      <Link to={`/products/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <Card.Body>
          <Card.Title className="text-2xl font-bold mb-2 text-gray-800 px-4 py-2">
            {product.name}
          </Card.Title>
          <Card.Text className="text-gray-600 mb-4 px-4 font-semibold font-mono text-lg">
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Link>
      <Row>
        <Col xs={6}>
          <Button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white py-4 px-20 rounded hover:bg-blue-700 w-full"
          >
            Add to Cart
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            //onClick={() => addToCart(product)}
            className="bg-red-500 text-white py-4 px-20 rounded hover:bg-red-700 w-full"
          >
            Raise Ticket
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCard;
