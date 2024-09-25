import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const phoneNumber = "+92345678900";
  const email = "Basit@gmail.com";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Hide the Header component when screen width is <= 768 pixels
  if (windowWidth <= 768) {
    return null;
  }

  return (
    <Navbar position="reletive" bg="dark" variant="dark" expand="lg" style={{ minHeight: '15px', padding: '0.5rem 0' }}>
      <Container>
        {/* Left side with contact information */}
        <Nav className="me-auto">
          <div className="d-flex align-items-center">
            <Nav.Link className="text-white" href={`tel:${phoneNumber}`}>
              <FaPhoneAlt />
            </Nav.Link>
            <div className="text-white">{phoneNumber}</div>
          </div>
          <div className="d-flex align-items-center">
            <Nav.Link className="text-white" href={`mailto:${email}`}>
              <FaEnvelope />
            </Nav.Link>
            <div className="text-white">{email}</div>
          </div>
        </Nav>

        {/* Centered heading */}
        <Navbar.Brand className="text-center mx-auto" style={{ fontSize: '0.8rem' }}>
          Enjoy Free Shipping All Over Pakistan
        </Navbar.Brand>

        {/* Right side with social media icons */}
        <Nav className="text-white">
  follow us
</Nav>

        <Nav>
          <Nav.Link href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </Nav.Link>
          <Nav.Link href="https://www.tiktok.com/example" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </Nav.Link>
          <Nav.Link href="https://www.youtube.com/example" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </Nav.Link>
          <Nav.Link href="https://wa.me/92345678900" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
