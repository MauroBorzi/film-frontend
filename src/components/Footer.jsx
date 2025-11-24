const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-4">
      <div className="container text-center">
        <small>&copy; {new Date().getFullYear()} Film App. Tutti i diritti riservati.</small>
      </div>
    </footer>
  );
};

export default Footer;
